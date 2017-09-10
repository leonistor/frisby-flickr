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
  var trace = _.curry(function (tag, x) {
    console.log(tag, x)
    return x
  })

  // app
  console.log('go planet!')
})
