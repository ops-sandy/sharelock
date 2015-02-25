$(document).ready(function () {
  $('.download-app-mac').click(function (ev) {
    trackEvent('click:download-app-mac', 'button:click', 'sharelock');
  });
  $('.download-app-android').click(function (ev) {
    trackEvent('click:download-app-android', 'button:click', 'sharelock');
  });
  $('.download-app-heroku').click(function (ev) {
    trackEvent('click:download-app-heroku', 'button:click', 'sharelock');
  });
  $('.download-source-osx').click(function (ev) {
    trackEvent('click:download-source-osx', 'button:click', 'sharelock');
  });
  $('.download-source-android').click(function (ev) {
    trackEvent('click:download-source-android', 'button:click', 'sharelock');
  });
  $('.download-source-web').click(function (ev) {
    trackEvent('click:download-source-web', 'button:click', 'sharelock');
  });

  function trackEvent(action, category, label) {
    if (null == ga || 'function' !== typeof ga) return;
    // console.log(arguments);
    ga('send', 'event', category, action, label)
  }
});

