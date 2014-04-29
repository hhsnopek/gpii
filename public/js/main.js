(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require.config({
    paths: {
      underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore',
      Backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
      jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery',
      Fuse: '//raw.githubusercontent.com/krisk/fuse/master/src/fuse.min'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      Backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      Fuse: {
        exports: 'Fuse'
      }
    }
  });

  require(['jquery', 'Backbone', 'Fuse'], function($, Backbone, Fuse) {
    var Router, aboutView, activeSearch, bigBang, display, formSubmit, fuzzySearch, homeView, itemSearch, productsView, supportView, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    activeSearch = false;
    /*
    # Views
    */

    homeView = (function(_super) {
      __extends(homeView, _super);

      function homeView() {
        _ref = homeView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      homeView.prototype.el = $('#home #searchContainer');

      homeView.prototype.events = {
        "click #searchButton": "search",
        "keyup #searchInput": "keyupInput",
        "keydown #searchInput": "keydownInput",
        "focus #searchInput": "focusInput",
        "focusout #searchInput": "focusoutInput"
      };

      homeView.prototype.render = function() {
        return display('#home');
      };

      homeView.prototype.search = function() {
        var input;
        input = JSON.stringify($('#searchInput').val());
        search_results.set({
          query: "" + input
        });
        return new productsView();
      };

      homeView.prototype.keyupInput = function() {
        $('#hint p').text("Search for \"" + ($('#searchInput').val()) + "\"");
        if ($('#searchInput').val() === "") {
          $('#hint').removeClass('active');
          return activeSearch = false;
        }
      };

      homeView.prototype.keydownInput = function() {
        if (activeSearch === false) {
          $('#hint').addClass('active');
          return activeSearch = true;
        }
      };

      homeView.prototype.focusInput = function() {
        if (activeSearch === true) {
          return $('#hint').addClass('active');
        }
      };

      homeView.prototype.focusoutInput = function() {
        return $('#hint').removeClass('active');
      };

      return homeView;

    })(Backbone.View);
    aboutView = (function(_super) {
      __extends(aboutView, _super);

      function aboutView() {
        _ref1 = aboutView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      aboutView.prototype.initialize = function() {
        return this.render();
      };

      aboutView.prototype.render = function() {
        return display('#about');
      };

      return aboutView;

    })(Backbone.View);
    supportView = (function(_super) {
      __extends(supportView, _super);

      function supportView() {
        _ref2 = supportView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      supportView.prototype.initialize = function() {
        return this.render();
      };

      supportView.prototype.render = function() {
        return display('#support');
      };

      return supportView;

    })(Backbone.View);
    productsView = (function(_super) {
      __extends(productsView, _super);

      function productsView() {
        _ref3 = productsView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      productsView.prototype.el = $('main #products');

      productsView.prototype.events = {
        "keyup #searchInput": "searchItems"
      };

      productsView.prototype.initialize = function() {
        return this.render();
      };

      productsView.prototype.render = function() {
        return display('#products');
      };

      productsView.prototype.searchItems = function() {
        var input, options, results;
        input = $('#products #searchBar #searchInput').val();
        console.log(input);
        options = {
          caseSensitive: false,
          includeScore: false,
          shouldSort: true,
          keys: ["Make", "Model", "Part", "Year", "ID"]
        };
        results = fuzzySearch("" + input, options);
        return console.log(results);
      };

      return productsView;

    })(Backbone.View);
    /*
    # Models
    */

    itemSearch = (function(_super) {
      __extends(itemSearch, _super);

      function itemSearch() {
        _ref4 = itemSearch.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      itemSearch.prototype.query = "";

      return itemSearch;

    })(Backbone.Model);
    /*
    # Router
    */

    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref5 = Router.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      Router.prototype.routes = {
        "": "home",
        "home": "home",
        "about": "about",
        "support": "support",
        "products": "products"
      };

      Router.prototype.home = function() {
        return new homeView().render();
      };

      Router.prototype.about = function() {
        return new aboutView();
      };

      Router.prototype.support = function() {
        return new supportView();
      };

      Router.prototype.products = function() {
        return new productsView();
      };

      return Router;

    })(Backbone.Router);
    /*
    # Miscellaneous functions
    */

    formSubmit = function() {
      return console.log('form submitted');
    };
    display = function(pagetodisplay) {
      var page, pages, _i, _len;
      pages = ['#home', '#products', '#about', '#support'];
      for (_i = 0, _len = pages.length; _i < _len; _i++) {
        page = pages[_i];
        $("" + page).css('display', 'none');
      }
      $("" + pagetodisplay).css('display', 'block');
      if (pagetodisplay !== '#home') {
        $('header nav').addClass('active');
        return $('body').css('background', '#eee');
      } else {
        $('header nav').removeClass('active');
        $('body').css('background', "url('/img/backgrounds/chevelle.jpg') no-repeat center center fixed");
        return $('body').css('background-size', "cover");
      }
    };
    fuzzySearch = function(query, options) {
      var fuse, items, result;
      items = window.data;
      console.log(items.dataroot.PartsTbl);
      fuse = new Fuse(items, options);
      return result = fuse.search("" + query);
    };
    /*
    # Initialize all at once, one success
    */

    bigBang = function() {
      var router;
      window.data = $.ajax({
        url: '/data/parts.json',
        datatype: 'json'
      }).done(function() {
        return console.log('parts.json successfully loaded');
      });
      router = new Router;
      window.search_results = new itemSearch();
      return Backbone.history.start();
    };
    bigBang();
    return console.log("main.coffee loaded");
  });

}).call(this);
