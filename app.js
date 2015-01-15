var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , logger = require('./logger')
    , crypto = require('crypto')
    , base64url = require('base64url');

var keys = {};

var strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    logger.warn(profile, 'user logged in');
    logger.warn({ jwt: extraParams }, 'extra params');
    return done(null, profile);
});

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(function (req, res, next) {
    req.start_time = Date.now();
    res.on('finish', function () {
        var meta = {
            code: res.statusCode,
            time: new Date(),
            duration: Date.now() - req.start_time,
            path: req.path,
            method: req.method
        };
        if (res.statusCode >= 400)
            logger.warn(meta, res.statusCode);
        else
            logger.info(meta, res.statusCode);
    });
    next();
});

if (process.env.FORCE_HTTPS === '1') {
    logger.info('turning on HTTPS enforcement');
    app.use(function (req, res, next) {
        if (req.protocol === 'https' || req.headers['x-arr-ssl'])
            next();
        else
            return res.redirect('https://' + req.host + req.url);
    });
}

app.use(cookieParser());
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/callback',
    passport.authenticate('auth0', { failureRedirect: '/unauthorized' }),
    function (req, res, next) {
        if (!req.user)
            res.send(403);
        else {
            var url = req.session.bookmark || '/';
            delete req.session.bookmark;
            res.redirect(url);
        }
    }
);

app.get('/about', function (req, res, next) {
    res.render('about');
});

app.get('/logout',
    function (req, res, next) {
        req.session.destroy();
        res.redirect(req.query.r || '/');
    });

app.get('/', function (req, res, next) {
    res.redirect('/new');
});

app.get('/new', function (req, res, next) {
    res.render('new');
});

app.get(/^\/(\w{1,10})\/(.+)$/,
    ensure_authenticated(),
    v1_get());

app.post('/create',
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    current_create());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function ensure_authenticated() {
    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            req.session.bookmark = req.originalUrl;
            passport.authenticate('auth0', { failureRedirect: '/unauthorized' })(req, res, next);
        }
        else
            next();
    };
}

function current_create() {

    // current signature, encryption keys, and version
    var current_keys = ensure_key(process.env.CURRENT_KEY);
    var version_prefix = '/' + process.env.CURRENT_KEY + '/';

    return function (req, res, next) {
        if (!req.body)
            return res.status(400).send('Missing payload.');
        if (typeof req.body.d !== 'string' || req.body.d.length === 0)
            return res.status(400).send('Missing data to secure. Use `d` parameter.');
        if (req.body.d.length > 500)
            return res.status(400).send('Data too large. Max 500 characters.');
        if (typeof req.body.a !== 'string' || req.body.a.length === 0)
            return res.status(400).send('Missing ACLs. Use `a` parameter.');
        if (req.body.a.length > 200)
            return res.status(400).send('ACLs too long. Max 200 characters.');

        var resource = {
            d: req.body.d,
            a: []
        };

        var tokens = req.body.a.split(/[\ \n\,\r]/);
        for (var i in tokens) {
            var token = tokens[i];

            var match = token.match(/^\@([^\.]+)$/);
            if (match) {
                // twitter
                resource.a.push({
                    k: 't',
                    v: match[1]
                });
                continue;
            }
            
            match = token.match(/^\@([^\.]+\..+)$/);
            if (match) {
                // email domain
                resource.a.push({
                    k: 'd',
                    v: token
                });
                continue;
            }

            match = token.match(/^[^\@]+\@[^\.]+\..+$/);
            if (match) {
                // email
                resource.a.push({
                    k: 'e',
                    v: token
                });
                continue;
            }

            return res.status(400).send('I don\'t understand what `' + token + '` means. You can say `@johnexample` for Twitter handle, `john@example.com` for e-mail address, or `@example.com` for e-mail domain.');
        }

        if (resource.a.length === 0)
            return res.status(400).send('At least one person allowed to access the secret must be specified.');

        var plaintext = JSON.stringify(resource);
        var iv = crypto.randomBytes(16);
        var cipher = crypto.createCipheriv('aes-256-ctr', current_keys.encryption_key, iv);
        var encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
        var signature = crypto.createHmac('sha256', current_keys.signature_key).update(encrypted).update(iv).digest('base64');
        resource =
            base64url.fromBase64(signature)
            + '.' + base64url.fromBase64(encrypted.toString('base64'))
            + '.' + base64url.fromBase64(iv.toString('base64'));

        var split_resource = version_prefix;
        for (var i = 0; i < resource.length; i++) {
            split_resource += resource[i];
            if (((i + 1) % 50) === 0)
                split_resource += '/';
        }

        res.status(200).send(split_resource);
    };
}

function v1_get() {
    return function (req, res, next) {
        res.set('Cache-Control', 'no-cache');

        var request_keys;
        try {
            request_keys = ensure_key(req.params[0]);
        }
        catch (e) {
            return res.render('invalid', { details: 'For security reasons this sharelock is no longer supported.'});
        }

        var resource = req.params[1].replace(/\//g, '');
        var tokens = resource.split('.');
        if (tokens.length !== 3 || tokens[0].length === 0 || tokens[1].length === 0 || tokens[2].length === 0)
            return res.render('invalid', { details: 'The URL is malformed and cannot be processed.'});

        try {
            tokens[0] = base64url.toBase64(tokens[0]); // signature
            tokens[1] = new Buffer(base64url.toBase64(tokens[1]), 'base64'); // encrypted data
            tokens[2] = new Buffer(base64url.toBase64(tokens[2]), 'base64'); // iv
            var signature = crypto.createHmac('sha256', request_keys.signature_key).update(tokens[1]).update(tokens[2]).digest('base64');
            if (signature !== tokens[0])
                throw null;
        }
        catch (e) {
            return res.render('invalid', { details: 'Signature verification failed: the data could have been tampered with.'});
        }

        try {
            var cipher = crypto.createDecipheriv('aes-256-ctr', request_keys.encryption_key, tokens[2]);
            var plaintext = cipher.update(tokens[1], 'base64', 'utf8') + cipher.final('utf8');
            resource = JSON.parse(plaintext);
            if (!resource || typeof resource !== 'object' || typeof resource.d !== 'string'
                || !Array.isArray(resource.a))
                throw null;
        }
        catch (e) {
            return res.render('invalid', { details: 'Encrypted data is malformed.' });
        }

        var allowed;
        for (var i in resource.a) {
            var acl = resource.a[i];
            if (acl.k === 'e' || acl.k === 'd') {
                if (Array.isArray(req.user.emails)) {
                    for (var j in req.user.emails) {
                        var email = req.user.emails[j].value;
                        if (acl.k === 'e' && email === acl.v
                            || acl.k === 'd' && email.indexOf(acl.v, email.length - acl.v.length) !== -1) {
                            allowed = true;
                            break;
                        }
                    }
                }
            }
            else if (acl.k === 't' && req.user.provider === 'twitter' && req.user._json.screen_name === acl.v)
                allowed = true;

            if (allowed) break;
        }

        if (allowed)
            res.render('data', { data: resource.d });
        else
            res.render('not_authorized', { user: req.user, logout_url: '/logout?r=' + req.originalUrl });
    };
}

function ensure_key(key_name) {
    if (!keys[key_name]) {
        if (!process.env['SIGNATURE_KEY_' + key_name] || !process.env['ENCRYPTION_KEY_' + key_name])
            throw new Error('Cryptographic credentials are not available.');
        keys[key_name] = {
            signature_key: new Buffer(process.env['SIGNATURE_KEY_' + process.env.CURRENT_KEY], 'base64'),
            encryption_key: new Buffer(process.env['ENCRYPTION_KEY_' + process.env.CURRENT_KEY], 'base64')
        };
    }
    return keys[key_name];
}

module.exports = app;
