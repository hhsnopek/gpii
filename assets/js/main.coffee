require.config(
  paths:
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore'
    Backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone'
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery'
    Fuse: '//raw.githubusercontent.com/krisk/fuse/master/src/fuse.min'
  shim:
    underscore:
      exports: '_'
    Backbone:
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    Fuse:
      exports: 'Fuse'
)

require [
  'jquery',
  'Backbone',
  'Fuse',
], ($, Backbone, Fuse) ->
  activeSearch = false

  ###
  # Views
  ###
  class homeView extends Backbone.View

    el: $('#home #searchContainer')

    events:
      "click #searchButton": "search"
      "keyup #searchInput": "keyupInput"
      "keydown #searchInput": "keydownInput"
      "focus #searchInput": "focusInput"
      "focusout #searchInput": "focusoutInput"

    render: ->
      display('#home')

    search: ->
      input = JSON.stringify($('#searchInput').val())
      search_results.set({query: "#{input}"})
      new productsView()

    keyupInput: ->
      $('#hint p').text("Search for \"#{$('#searchInput').val()}\"")
      if $('#searchInput').val() is ""
        $('#hint').removeClass('active')
        activeSearch = false

    keydownInput: ->
      if activeSearch is false
        $('#hint').addClass('active')
        activeSearch = true 

    focusInput: ->
      if activeSearch is true
        $('#hint').addClass('active')

    focusoutInput: ->
      $('#hint').removeClass('active')


  class aboutView extends Backbone.View
    initialize: ->
      @render()

    render: ->
      display('#about')


  class supportView extends Backbone.View
    initialize: ->
      @render()

    render: ->
      display('#support')


  class productsView extends Backbone.View
    el: $('main #products')

    events:
      "keyup #searchInput": "searchItems"

    initialize: ->
      @render()

    render: ->
      display('#products')

    searchItems: ->
      input = $('#products #searchBar #searchInput').val()
      console.log input
      options = {
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        keys: [
          "Make"
          "Model"
          "Part"
          "Year"
          "ID"
        ]
      }
      results = fuzzySearch("#{input}", options)
      console.log results


  ###
  # Models
  ###

  class itemSearch extends Backbone.Model
    query: ""

  ###
  # Router
  ###
  class Router extends Backbone.Router

    routes:
      "": "home"
      "home": "home"
      "about": "about"
      "support": "support"
      "products": "products"

    home: ->
      new homeView().render()

    about: ->
      new aboutView()

    support: ->
      new supportView()

    products: ->
      new productsView()

  ###
  # Miscellaneous functions
  ###
  formSubmit = () ->
    console.log 'form submitted'


  display = (pagetodisplay) ->
    pages = ['#home', '#products', '#about', '#support']
    for page in pages
      $("#{page}").css('display', 'none')
    
    $("#{pagetodisplay}").css('display', 'block')
    unless pagetodisplay is '#home'
      $('header nav').addClass('active')
      $('body').css('background', '#eee')
    else
      $('header nav').removeClass('active')
      $('body').css('background', "url('/img/backgrounds/chevelle.jpg') no-repeat center center fixed")
      $('body').css('background-size', "cover")

  fuzzySearch = (query, options) ->
    items = window.data
    console.log items.dataroot.PartsTbl
    fuse = new Fuse(items, options)
    return result = fuse.search("#{query}")


  ###
  # Initialize all at once, one success
  ###
  bigBang = () ->
    window.data = $.ajax({
      url: '/data/parts.json'
      datatype: 'json'
    }).done( () ->
      console.log 'parts.json successfully loaded'
    )
    router = new Router
    window.search_results = new itemSearch()
    Backbone.history.start()

  bigBang()
  console.log "main.coffee loaded"
