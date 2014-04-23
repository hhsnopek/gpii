(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require.config({
    paths: {
      underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore',
      Backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone',
      jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      Backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  require(['jquery', 'Backbone'], function($, Backbone) {
    var AboutView, AccountModel, OrderModel, OrdersCollection, OrdersView, ProductsView, Router, SearchCollection, SearchModel, SignupView, SupportView, activeSearch, bigBang, formSubmit, searchView, sessionToken, _ref, _ref1, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    activeSearch = false;
    /*
    # NOTE: Add url for testing
    */

    console.log('main.coffee loading...\n');
    $('#searchInput').keydown(function() {
      if (activeSearch === false) {
        $('#hint').addClass('active');
        return activeSearch = true;
      }
    });
    $('#searchInput').keyup(function() {
      $('#hint p').text("Search for \"" + ($(this).val()) + "\"");
      if ($(this).val() === "") {
        $('#hint').removeClass('active');
        return activeSearch = false;
      }
    });
    $('#searchInput').focus(function() {
      if (activeSearch === true) {
        return $('#hint').addClass('active');
      }
    });
    $('#searchInput').focusout(function() {
      return $('#hint').removeClass('active');
    });
    /*
    # Views
    */

    searchView = (function(_super) {
      __extends(searchView, _super);

      function searchView() {
        _ref = searchView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      searchView.prototype.el = $('#search');

      searchView.prototype.events = {
        'click #searchButton': 'search'
      };

      /*
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
      */


      return searchView;

    })(Backbone.View);
    SignupView = (function(_super) {
      __extends(SignupView, _super);

      function SignupView() {
        _ref1 = SignupView.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      SignupView.prototype.el = $('#signupform');

      SignupView.prototype.events = {
        'click #signupSubmit': "signup"
      };

      SignupView.prototype.render = function() {
        console.log('SignupView initialized...');
        return $('#signupform').toggle();
      };

      SignupView.prototype.signup = function() {
        var formValues, newToken, url;
        console.log('submitting signup...');
        url = '';
        newToken = sessionToken($('#usernameForm').val(), $('#passwordForm').val(), $('#confirmpasswordForm').val());
        formValues = {
          username: $('#usernameForm').val(),
          token: newToken,
          phone: $('#phoneForm').val(),
          address: $('#addressForm').val(),
          city: $('#cityForm').val(),
          state: $('#stateForm').val(),
          zip: $('#zipForm').val()
        };
        return $.ajax({
          url: url,
          type: 'POST',
          dataType: 'Json',
          data: formValues,
          success: function(data) {
            console.log('Sign up request details: ' + data);
            $('#signupform').toggle();
            if (!data.error(navigate("dashboard", {
              trigger: true,
              replace: true
            }))) {

            } else {
              return alert('Sign up: ' + data.error);
            }
          }
        });
      };

      return SignupView;

    })(Backbone.View);
    AboutView = (function(_super) {
      __extends(AboutView, _super);

      function AboutView() {
        _ref2 = AboutView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      return AboutView;

    })(Backbone.View);
    SupportView = (function(_super) {
      __extends(SupportView, _super);

      function SupportView() {
        _ref3 = SupportView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      SupportView.prototype.render = function() {
        console.log('SupportView initialized...');
        return $('#support').toggle();
      };

      return SupportView;

    })(Backbone.View);
    OrdersView = (function(_super) {
      __extends(OrdersView, _super);

      function OrdersView() {
        _ref4 = OrdersView.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      OrdersView.prototype.render = function() {
        return console.log('OrdersView initialized...');
      };

      return OrdersView;

    })(Backbone.View);
    ProductsView = (function(_super) {
      __extends(ProductsView, _super);

      function ProductsView() {
        _ref5 = ProductsView.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      ProductsView.prototype.render = function() {
        return console.log('ProductsView initialized...');
      };

      return ProductsView;

    })(Backbone.View);
    /*
    # Models
    */

    AccountModel = (function(_super) {
      __extends(AccountModel, _super);

      function AccountModel() {
        _ref6 = AccountModel.__super__.constructor.apply(this, arguments);
        return _ref6;
      }

      AccountModel.prototype.defaults = function() {
        return {
          username: "",
          token: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: ""
        };
      };

      return AccountModel;

    })(Backbone.Model);
    OrderModel = (function(_super) {
      __extends(OrderModel, _super);

      function OrderModel() {
        _ref7 = OrderModel.__super__.constructor.apply(this, arguments);
        return _ref7;
      }

      OrderModel.prototype.defaults = function() {
        return {
          account: "",
          part: "",
          qty: "",
          cost: "",
          shipped: null,
          paid: null
        };
      };

      OrderModel.prototype.toggle = function() {
        return this.save({
          done: !this.get("done")
        });
      };

      return OrderModel;

    })(Backbone.Model);
    SearchModel = (function(_super) {
      __extends(SearchModel, _super);

      function SearchModel() {
        _ref8 = SearchModel.__super__.constructor.apply(this, arguments);
        return _ref8;
      }

      SearchModel.prototype.defaults = function() {
        return {
          input: ""
        };
      };

      return SearchModel;

    })(Backbone.Model);
    /*
    # Collections
    */

    OrdersCollection = (function(_super) {
      __extends(OrdersCollection, _super);

      function OrdersCollection() {
        _ref9 = OrdersCollection.__super__.constructor.apply(this, arguments);
        return _ref9;
      }

      OrdersCollection.prototype.model = OrderModel;

      OrdersCollection.prototype.done = function() {
        return this.where({
          done: true
        });
      };

      OrdersCollection.prototype.shipped = function() {
        return this.where({
          shipped: true
        });
      };

      OrdersCollection.prototype.payment = function() {
        return this.where({
          paid: true
        });
      };

      OrdersCollection.prototype.comparator = 'order';

      return OrdersCollection;

    })(Backbone.Collection);
    SearchCollection = (function(_super) {
      __extends(SearchCollection, _super);

      function SearchCollection() {
        _ref10 = SearchCollection.__super__.constructor.apply(this, arguments);
        return _ref10;
      }

      SearchCollection.prototype.model = SearchModel;

      return SearchCollection;

    })(Backbone.Collection);
    /*
    # Router
    */

    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref11 = Router.__super__.constructor.apply(this, arguments);
        return _ref11;
      }

      Router.prototype.routes = {
        "": "home",
        "login": "login",
        "signup": "signup",
        "support": "support",
        "dashboard": "dashboard"
      };

      Router.prototype.home = function() {
        console.log('\nhome rendering...');
        new searchView();
        return console.log('home rendered\n');
      };

      Router.prototype.login = function() {
        console.log('\nlogin rendering...');
        new LoginView().render();
        return console.log('login rendered\n');
      };

      Router.prototype.signup = function() {
        console.log('\nsignup rendering...');
        new SignupView().render();
        return console.log('signup rendered\n');
      };

      Router.prototype.support = function() {
        console.log('\nsupport rendering...');
        new SupportView().render();
        return console.log('support rendered\n');
      };

      Router.prototype.dashboard = function() {
        console.log('\ndashboard rendering...');
        new DashboardView().render();
        return console.log('dashboard rendered\n');
      };

      return Router;

    })(Backbone.Router);
    /*
    # Miscellaneous functions
    */

    sessionToken = function(username, password, confirmPass) {
      if (confirmPass === 'login' || password === confirmPass) {
        return username + password;
      } else {
        return error;
      }
    };
    formSubmit = function() {
      return console.log('form submitted');
    };
    /*
    # Initialize all at once, one success
    */

    bigBang = function() {
      var orders, router, search_history;
      console.log("Creating Views/Models/collections");
      router = new Router;
      orders = new OrdersCollection;
      search_history = new SearchCollection;
      Backbone.history.start();
      console.log('history started');
      return console.log('Created Views/Models/Collections');
    };
    bigBang();
    return console.log("\nmain.coffee loaded\n");
  });

}).call(this);
