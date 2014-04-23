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
  activeSearch = false

  ###
  # NOTE: Add url for testing
  ###

  console.log 'main.coffee loading...\n'

  # event listeners
  $('#searchInput').keydown( () ->
    if activeSearch is false
      $('#hint').addClass('active')
      activeSearch = true
  )
  
  $('#searchInput').keyup(() ->
    $('#hint p').text("Search for \"#{$(this).val()}\"")
    if $(this).val() is ""
      $('#hint').removeClass('active')
      activeSearch = false
  )

  $('#searchInput').focus( () ->
    if activeSearch is true
      $('#hint').addClass('active')
  )
  
  $('#searchInput').focusout( () ->
    $('#hint').removeClass('active')
  )


  ###
  # Views
  ###

  class searchView extends Backbone.View
    el: $('#search')

    events:
      'click #searchButton': 'search'
    ###
    search: () ->
      input = JSON.stringify($('#searchInput').val())
      console.log input
      url = ""

      $.ajax
        url += '/api/search/'
        type = 'GET'
        dataType 'Json'
        data: input
        success: (data) ->
          console.log 'Search request details: ' + data
          # todo: Navigate to DashboardView, display search parts under PartsView
    ###

  class SignupView extends Backbone.View
    el: $('#signupform')

    events:
      'click #signupSubmit': "signup"

    render: () ->
      console.log 'SignupView initialized...'
      $('#signupform').toggle()

    signup: () ->
      console.log 'submitting signup...'
      url = ''
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
          unless data.error navigate("dashboard", {trigger: true, replace: true}) else alert 'Sign up: ' + data.error


  class AboutView extends Backbone.View

  class SupportView extends Backbone.View
    render: () ->
      console.log 'SupportView initialized...'
      $('#support').toggle()


  class OrdersView extends Backbone.View
    render: () ->
      console.log 'OrdersView initialized...'


  class ProductsView extends Backbone.View
    render: () ->
      console.log 'ProductsView initialized...'


  ###
  # Models
  ###
  class AccountModel extends Backbone.Model
    defaults: () ->
      username: ""
      token: ""
      email: ""
      phone: ""
      address: ""
      city: ""
      state: ""
      zip: ""


  class OrderModel extends Backbone.Model
    defaults: () ->
      account: ""
      part: ""
      qty: ""
      cost: ""
      shipped: null
      paid: null

    toggle: () ->
      @save
        done: !@get("done")

  class SearchModel extends Backbone.Model
    defaults: () ->
      input: ""

  ###
  # Collections
  ###
  class OrdersCollection extends Backbone.Collection
    model: OrderModel

    done: () ->
      @where
        done: true

    shipped: () ->
      @where
        shipped: true

    payment: () ->
      @where
        paid: true

    comparator: 'order'


  class SearchCollection extends Backbone.Collection
    model: SearchModel


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

    home: () ->
      console.log '\nhome rendering...'
      new searchView()
      console.log 'home rendered\n'

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
      console.log '\ndashboard rendering...'
      new DashboardView().render()
      console.log 'dashboard rendered\n'


  ###
  # Miscellaneous functions
  ###
  # TODO: Move functions to proper views
  sessionToken = (username, password, confirmPass) ->
    if confirmPass == 'login' or password == confirmPass
      return username+password
      
    else
      return error

  formSubmit = () ->
    console.log 'form submitted'

  ###
  # Initialize all at once, one success
  ###
  bigBang = () ->
    console.log "Creating Views/Models/collections"
    router = new Router
    orders = new OrdersCollection
    search_history = new SearchCollection
    Backbone.history.start()
    console.log 'history started'
    console.log 'Created Views/Models/Collections'

  bigBang()
  console.log "\nmain.coffee loaded\n"
