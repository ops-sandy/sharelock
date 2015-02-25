<img src="https://raw.githubusercontent.com/auth0/sharelock/master/public/share/facebook-1200-630.png" />

Sharelock: securely share data
===

Sharelock is an open source web service created by [Auth0](https://auth0.com) and hosted *pro publico bono* at https://sharelock.io. It lets you simply and securely share secret information with people you trust. You can also host your own version of Sharelock. The server and the apps are all open source.

## Apps

* Web: 
  * App: <https://sharelock.io/new> 
  * Source Code: <https://github.com/auth0/sharelock>
* Mac OS: 
  * App: <https://cdn.auth0.com/sharelock-osx/Sharelock-1.dmg>
  * Source Code: <https://github.com/auth0/sharelock-osx>
* Android App
  * App: <https://play.google.com/store/apps/details?id=com.auth0.sharelock&hl=en>
  * Source Code: <https://github.com/auth0/sharelock-android>

## Host your own Sharelock server

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

The https://sharelock.io service Auth0 provides controls signing and encryption keys that protect your secret data. If you want to be in control of singing and encryption keys, you must host your own version of the Sharelock service. The apps have support to change the endpoint you hit

![](https://www.dropbox.com/s/7y0d6u5kmdz01ew/Screenshot%202015-02-25%2017.17.40.png?dl=1)

## Motivation

We created this tool out of our own needs. We are constantly exchanging data and we take security very seriously. We don't feel confortable exchanging secret data through chat or e-mail, so we created sharelock. The idea is simple, the server encrypts and sign the secret data and gives you back a URL that is scoped to the people you shared it to. Then whoever gets that URL, in order to decrypt that content, first need to login. That's where we use Auth0. If the identity is verified (either e-mail, domain or twitter account), then the secret data is decrypted and shown. Since certain browsers have URL length limitations, there is a max of data you can share of 500 chars

## Feedback

At [Auth0](https://auth0.com), we welcome feedback and collaboration. You know where to file issues and how to submit pull requests. You can contact us [here](https://auth0.com/support). 

This project is licensed under MIT.
