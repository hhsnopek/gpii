require.config(
  paths:
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore'
    Backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone'
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery'
  shim:
    underscore:
      exports: '_'
    Backbone:
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
)

require [
  'jquery',
  'Backbone',
], ($, Backbone) ->
