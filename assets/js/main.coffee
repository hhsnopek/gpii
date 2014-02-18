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

  ###
  # Views
  ###
  class LoginView extends Backbone.View
    events:
      'click #login': 'displayLogin'
      'click button#loginButton': 'login'

    render: () ->
      console.log 'LoginView rendered'
      $('#login').toggle()

    displayLogin: () ->
      console.log 'displayLogin triggered'
      $('#login').toggle()

    login: () ->
      console.log 'loggin in...'
      url = 'localhost:3000'
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

  class SignupView extends Backbone.View
    events:
      'click #signupSubmit': "signup"

    signup: () ->
      console.log 'submitting form'

  class SupportView extends Backbone.View
    events:
      'click #support': "support"

    render: () ->
      console.log 'SupportView rendered'
      $('#support').toggle()


  ###
  # Models
  ###
  class AccountModel extends Backbone.Model
    defaults:
      "username": ""
      "password": ""
      "email": ""
      "phone": ""
      "address": ""
      "city": ""
      "state": ""
      "zip": ""

  class OrderModel extends Backbone.Model
    defaults:
      "account": ""
      "part": ""
      "qty": ""
      "cost": ""


  ###
  # Collections
  ###

  class OrdersCollection extends Backbone.Collection
    initialize: () ->
      console.log 'OrdersCollection created'

  ###
  # Router
  ###
  class Router extends Backbone.Router

    routes:
      "": "home"
      "login": "login"
      "signup": "signup"
      "support": "support"

    login: () ->
      new LoginView().render()

    signup: () ->
      new SignupView().render()

    support: () ->
      new SupportView().render()




  passwordCheck = () ->
    pass = $('#newPass').val()
    confirmPass = $('#confirmPass').val()
    unless pass == confirmPass $("#passwordMatch").html "Passwords match."
    else $("#passwordMatch").html "Passwords do not match!"

  formSubmit = () ->
    console.log 'form submitted'

  console.log 'main loaded'

  login_view = new LoginView()
  router = new Router()
  Backbone.history.start()
  console.log 'history started'
