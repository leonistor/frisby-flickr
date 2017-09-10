requirejs.config({ // eslint-disable-line no-undef
  paths: { // fara .js la sfarsit!!
    'ramda': '/node_modules/ramda/dist/ramda.min',
    'jquery': '/node_modules/jquery/dist/jquery.min'
  }
})

require([
  'ramda',
  'jquery'
], function (_, $) {
  // Utils
  var Impure = {
    getJSON: _.curry(function (callback, url) {
      $.getJSON(url, callback)
    }),

    setHtml: _.curry(function (sel, html) {
      $(sel).html(html)
    })
  }

  var trace = _.curry(function (tag, x) { // eslint-disable-line no-unused-vars
    console.log(tag, x)
    return x
  })

  var img = function (url) {
    return $('<img />', {
      src: url
    })
  }

  // App
  var url = function (term) {
    return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
      term + '&format=json&jsoncallback=?'
  }

  var mediaUrl = _.compose(_.prop('m'), _.prop('media'))
  var mediaToImg = _.compose(img, mediaUrl)
  var images = _.compose(_.map(mediaToImg), _.prop('items'))
  var renderImages = _.compose(Impure.setHtml('body'), images)
  // var app = _.compose(Impure.getJSON(trace('response')), url)
  var app = _.compose(Impure.getJSON(renderImages), url)

  app('cats')
})
