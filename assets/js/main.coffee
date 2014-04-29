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
  class HomeView extends Backbone.View

    el: $('#home #searchContainer')

    events:
      'click #searchButton': 'search'
      'keyup #searchInput': 'keyupInput'
      'keydown #searchInput': 'keydownInput'
      'focus #searchInput': 'focusInput'
      'focusout #searchInput': 'focusoutInput'

    render: ->
      display('#home')

    search: ->
      input = JSON.stringify($('#searchInput').val())
      search_results.set(query: input)
      new ProductsView()

    keyupInput: ->
      $('#hint p').text("Search for \"#{$('#searchInput').val()}\"")
      if $('#searchInput').val() is ''
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


  class AboutView extends Backbone.View
    initialize: ->
      @render()

    render: ->
      display('#about')


  class SupportView extends Backbone.View
    initialize: ->
      @render()

    render: ->
      display('#support')


  class ProductsView extends Backbone.View
    el: $('main #products')

    events:
      'keyup #searchInput': 'searchItems'

    initialize: ->
      @render()

    render: ->
      display('#products')

    searchItems: ->
      input = $('#products #searchBar #searchInput').val()
      console.log input
      results = fuse.search(input)
      console.log results


  ###
  # Models
  ###

  class ItemSearch extends Backbone.Model
    query: ''

  ###
  # Router
  ###
  class Router extends Backbone.Router

    routes:
      '': 'home'
      home: 'home'
      about: 'about'
      support: 'support'
      products: 'products'

    home: ->
      new HomeView().render()

    about: ->
      new AboutView()

    support: ->
      new SupportView()

    products: ->
      new ProductsView()

  ###
  # Miscellaneous functions
  ###
  formSubmit = () ->
    console.log 'form submitted'


  display = (pagetodisplay) ->
    pages = ['#home', '#products', '#about', '#support']
    for page in pages
      $(page).css('display', 'none')

    $(pagetodisplay).css('display', 'block')
    unless pagetodisplay is '#home'
      $('header nav').addClass('active')
      $('body').css('background', '#eee')
    else
      $('header nav').removeClass('active')
      $('body').css('background', "url('/img/backgrounds/chevelle.jpg') no-repeat center center fixed")
      $('body').css('background-size', 'cover')

  ###
  # Initialize all at once, one success
  ###
  bigBang = () ->
    $.ajax(
      url: '/data/parts.json'
      datatype: 'json'
    ).done((data) ->
      console.log 'parts.json successfully loaded'
      data = data.dataroot.PartsTbl # remove the shitty wrapper thing
      window.fuse = new Fuse(
        data,
        caseSensitive: false,
        includeScore: false,
        shouldSort: true,
        keys: ['Make', 'Model', 'Part', 'Year', 'ID']
      )
      window.data = data # just stick it there, cause yolo
    )

    router = new Router
    window.search_results = new ItemSearch()
    Backbone.history.start()

  bigBang()
  console.log 'main.coffee loaded'
