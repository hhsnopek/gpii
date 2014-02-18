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

  console.log 'main loading'

  class LoginView extends Backbone.View
    initialize: () ->
      console.log 'initializing LoginView'

    events:
      'click #login': 'displayLogin'
      'click #loginButton': 'login'

    render: () ->
      $('#login').toggle()

    login: () ->
      url = 'localhost:3000'
      console.log 'loggin in...'
      formValues =
        user: $('#loginUser').val(),
        pass: $('#loginPass').val()

      $.ajax
        url: url
        type: 'POST'
        dataType: 'Json'
        data: formValues
        success: (data) ->
          console.log 'Login request details: ' + data
          unless data.error window.location.replace '#' else alert 'Login: ' + data.error

  class Router extends Backbone.Router

    routes:
      "": "home"
      "login": "login"

    login: () ->
      new LoginView().render()


  passwordCheck = () ->
    pass = $('#newPass').val()
    confirmPass = $('#confirmPass').val()
    unless pass == confirmPass $("#passwordMatch").html "Passwords match."
    else $("#passwordMatch").html "Passwords do not match!"

  formSubmit = () ->
    console.log 'form submitted'

  console.log 'main loaded'
