<img src="https://raw.githubusercontent.com/auth0/sharelock/master/public/share/facebook-1200-630.png?cached" />

Sharelock: securely share data
===

Sharelock is an open source web service hosted at https://sharelock.io. It lets you simply and securely share secret information with people you trust. You can also host your own version of Sharelock since the server and the apps are all open source.

## Apps

* Web: 
  * App: <https://sharelock.io/new> 
  * Source Code: <https://github.com/auth0/sharelock>
* Mac OS: 
  * App: <https://cdn.auth0.com/sharelock-osx/Sharelock-latest.dmg>
  * Source Code: <https://github.com/auth0/sharelock-osx>
* Android App
  * App: <https://play.google.com/store/apps/details?id=com.auth0.sharelock&hl=en>
  * Source Code: <https://github.com/auth0/sharelock-android>

## Host your own Sharelock server

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fauth0%2Fsharelock)

The https://sharelock.io service controls signing and encryption keys that protect your secret data. If you want to be in control of singing and encryption keys, you must host your own version of the Sharelock service. The apps have support to change the endpoint you hit

![](https://www.dropbox.com/s/7y0d6u5kmdz01ew/Screenshot%202015-02-25%2017.17.40.png?dl=1)

Read more about [how it works](https://github.com/auth0/sharelock/wiki#how-it-works) and things like [key rotation](https://github.com/auth0/sharelock/wiki#key-management).

## Security

* Urls are ephemeral, they are **NOT stored anywhere** (neither your secrets). The content you share lives encrypted in the URL.
* The **decrypted content** can ONLY be accessed by the people that you shared shared the data with by means of **login and email verification** (as opposed to, let's say, Dropbox links which can be accessed by anyone who has the link).
* Secrets are signed with **HMAC SHA256** and encrypted with **AES 256 CTR** using keys that live on the Sharelock server
* We host sharelock.io public pro bono but we are not in the business of holding your secret content, that's why we built this OSS. If you want to have your own signing key and encryption key you can do that by deploying your own Sharelock instance to [Heroku](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fauth0%2Fsharelock) in seconds (or any other hosting that provides nodejs support)

## Motivation

Our story is simple. We created Sharelock because we wanted a way to share secret data securely. We’re constantly exchanging bits of confidential information and, because we take security very seriously, we didn’t feel comfortable sharing that information through normal channels like email or chat.
So, Sharelock was born. It provides you with a simple and secure way to share secrets with people you know.

## Feedback

At [Auth0](https://auth0.com), we welcome feedback and collaboration. You know where to file issues and how to submit pull requests. You can contact us [here](https://auth0.com/support). 

This project is licensed under MIT.
