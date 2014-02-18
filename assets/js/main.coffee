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

  console.log 'main.coffee loading...\n'

  ###
  # Views
  ###
  class LoginView extends Backbone.View
    events:
      'click #login': 'displayLogin'
      'click button#loginButton': 'login'

    render: () ->
      console.log 'LoginView initialized...'
      $('#login').toggle()    

    displayLogin: () ->
      console.log 'displayLogin triggered'
      $('#login').toggle()

    login: () ->
      console.log 'loggin in...'
      url = 'localhost:3000'
      pass = $('#newPass').val()
      confirmPass = $('#confirmPass').val()
      formValues =
        user: $('#loginUser').val(),
        token: sessionToken()

      $.ajax
        url: url
        type: 'POST'
        dataType: 'Json'
        data: formValues
        success: (data) ->
          console.log 'Login request details: ' + data
          unless data.error window.location.replace '#' else alert 'Login: ' + data.error


  class SignupView extends Backbone.View
    initialize: () ->
      console.log 'SignupView initialized...'
    events:
      'click #signupSubmit': "signup"

    render: () ->
      $('#signupform').toggle()

    signup: () ->
      console.log 'submitting signup...'
      url = 'localhost:3000'
      newToken = sessionToken($('#usernameForm').val(), $('#passwordForm').val(), $('#confirmpasswordForm').val())
      formValues =
        username: $('#usernameForm').val()
        token: newToken
        phone: $('#phoneForm').val()
        address: $('#addressForm').val()
        city: $('#cityForm').val()
        state: $('#stateForm').val()
        zip: $('#zipForm').val()

      $.ajax
        url: url
        type: 'POST'
        dataType: 'Json'
        data: formValues
        success: (data) ->
          console.log 'Sign up request details: ' + data
          $('#signupform').toggle()
          unless data.error window.location.replace '#' else alert 'Sign up: ' + data.error


  class SupportView extends Backbone.View
    render: () ->
      console.log 'SupportView initialized...'
      $('#support').toggle()


  class OrdersView extends Backbone.View
    render: () ->
      console.log 'OrdersView initialized...'

  ###
  # Models
  ###
  class AccountModel extends Backbone.Model
    defaults: () ->
      "username": ""
      "token": ""
      "email": ""
      "phone": ""
      "address": ""
      "city": ""
      "state": ""
      "zip": ""

  class OrderModel extends Backbone.Model
    defaults: () ->
      "account": ""
      "part": ""
      "qty": ""
      "cost": ""
      "shipped": null
      "paid": null


  ###
  # Collections
  ###
  class OrdersCollection extends Backbone.Collection
    model: OrderModel

    shipped: () ->
      @where
        shipped: true

    payment: () ->
      @where
        paid: true

    comparator: 'order'


  ###
  # Router
  ###
  class Router extends Backbone.Router

    routes:
      "": "home"
      "login": "login"
      "signup": "signup"
      "support": "support"
      "dashboard": "dashboard"

    login: () ->
      console.log '\nlogin rendering...'
      new LoginView().render()
      console.log 'login rendered\n'

    signup: () ->
      console.log '\nsignup rendering...'
      new SignupView().render()
      console.log 'signup rendered\n'

    support: () ->
      console.log '\nsupport rendering...'
      new SupportView().render()
      console.log 'support rendered\n'

    dashboard: () ->
      consle.log '\ndashboard rendering...'
      new DashboardView().render()
      console.log 'dashboard rendered\n'


  ###
  # Miscellaneous functions
  ###
  # TODO: Move functions to proper views
  sessionToken = (username, password, confirmPass) ->
    if confirmPass == '' or password == confirmPass
      return username+password
      
    else
      return error

  formSubmit = () ->
    console.log 'form submitted'

  ###
  # Initialize all at once, one success; respond
  ###
  bigBang = () ->
    console.log "Creating Views/Models/collections"
    router = new Router()
    Backbone.history.start()
    console.log 'history started'
    console.log 'Created Views/Models/Collections'

  bigBang()
  console.log "\nmain.coffee loaded\n"
