(function() {
    var a = {}.hasOwnProperty,
        b = function(b, c) {
            function e() {
                this.constructor = b
            }
            for (var d in c) a.call(c, d) && (b[d] = c[d]);
            return e.prototype = c.prototype, b.prototype = new e, b.__super__ = c.prototype, b
        };
    require.config({
        paths: {
            underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore",
            Backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone",
            jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery"
        },
        shim: {
            underscore: {
                exports: "_"
            },
            Backbone: {
                deps: ["underscore", "jquery"],
                exports: "Backbone"
            }
        }
    }), require(["jquery", "Backbone"], function(a, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D;
        return console.log("main.coffee loading...\n"), q = function(c) {
            function d() {
                return s = d.__super__.constructor.apply(this, arguments), s
            }
            return b(d, c), d.prototype.el = a("#search"), d.prototype.events = {
                "click #searchButton": "search"
            }, d
        }(c.View), f = function(c) {
            function d() {
                return t = d.__super__.constructor.apply(this, arguments), t
            }
            return b(d, c), d.prototype.el = a("#login"), d.prototype.events = {
                "click button#loginButton": "login"
            }, d.prototype.render = function() {
                return console.log("LoginView initialized..."), a("#login").toggle()
            }, d.prototype.login = function() {
                var b, c, d;
                return console.log("loggin in..."), d = "localhost:3000", c = r(a("#loginUser").val(), a("#loginPass").val(), "login"), b = {
                    user: a("#loginUser").val(),
                    token: c
                }, a.ajax({
                    url: d,
                    type: "POST",
                    dataType: "Json",
                    data: b,
                    success: function(a) {
                        console.log("Login request details: " + a);
                        if ( !! a.error(window.location.replace("#"))) return alert("Login: " + a.error)
                    }
                })
            }, d
        }(c.View), m = function(c) {
            function d() {
                return w = d.__super__.constructor.apply(this, arguments), w
            }
            return b(d, c), d.prototype.el = a("#signupform"), d.prototype.events = {
                "click #signupSubmit": "signup"
            }, d.prototype.render = function() {
                return console.log("SignupView initialized..."), a("#signupform").toggle()
            }, d.prototype.signup = function() {
                var b, c, d;
                return console.log("submitting signup..."), d = "", c = r(a("#usernameForm").val(), a("#passwordForm").val(), a("#confirmpasswordForm").val()), b = {
                    username: a("#usernameForm").val(),
                    token: c,
                    phone: a("#phoneForm").val(),
                    address: a("#addressForm").val(),
                    city: a("#cityForm").val(),
                    state: a("#stateForm").val(),
                    zip: a("#zipForm").val()
                }, a.ajax({
                    url: d,
                    type: "POST",
                    dataType: "Json",
                    data: b,
                    success: function(b) {
                        console.log("Sign up request details: " + b), a("#signupform").toggle();
                        if ( !! b.error(navigate("dashboard", {
                            trigger: !0,
                            replace: !0
                        }))) return alert("Sign up: " + b.error)
                    }
                })
            }, d
        }(c.View), n = function(c) {
            function d() {
                return x = d.__super__.constructor.apply(this, arguments), x
            }
            return b(d, c), d.prototype.render = function() {
                return console.log("SupportView initialized..."), a("#support").toggle()
            }, d
        }(c.View), i = function(a) {
            function c() {
                return y = c.__super__.constructor.apply(this, arguments), y
            }
            return b(c, a), c.prototype.render = function() {
                return console.log("OrdersView initialized...")
            }, c
        }(c.View), e = function(a) {
            function c() {
                return z = c.__super__.constructor.apply(this, arguments), z
            }
            return b(c, a), c.prototype.render = function() {
                return console.log("DashboardView initialized...")
            }, c
        }(c.View), d = function(a) {
            function c() {
                return A = c.__super__.constructor.apply(this, arguments), A
            }
            return b(c, a), c.prototype.defaults = function() {
                return {
                    username: "",
                    token: "",
                    email: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    zip: ""
                }
            }, c
        }(c.Model), g = function(a) {
            function c() {
                return B = c.__super__.constructor.apply(this, arguments), B
            }
            return b(c, a), c.prototype.defaults = function() {
                return {
                    account: "",
                    part: "",
                    qty: "",
                    cost: "",
                    shipped: null,
                    paid: null
                }
            }, c.prototype.toggle = function() {
                return this.save({
                    done: !this.get("done")
                })
            }, c
        }(c.Model), l = function(a) {
            function c() {
                return C = c.__super__.constructor.apply(this, arguments), C
            }
            return b(c, a), c.prototype.defaults = function() {
                return {
                    input: ""
                }
            }, c
        }(c.Model), h = function(a) {
            function c() {
                return D = c.__super__.constructor.apply(this, arguments), D
            }
            return b(c, a), c.prototype.model = g, c.prototype.done = function() {
                return this.where({
                    done: !0
                })
            }, c.prototype.shipped = function() {
                return this.where({
                    shipped: !0
                })
            }, c.prototype.payment = function() {
                return this.where({
                    paid: !0
                })
            }, c.prototype.comparator = "order", c
        }(c.Collection), k = function(a) {
            function c() {
                return u = c.__super__.constructor.apply(this, arguments), u
            }
            return b(c, a), c.prototype.model = l, c
        }(c.Collection), j = function(a) {
            function c() {
                return v = c.__super__.constructor.apply(this, arguments), v
            }
            return b(c, a), c.prototype.routes = {
                "": "home",
                login: "login",
                signup: "signup",
                support: "support",
                dashboard: "dashboard"
            }, c.prototype.home = function() {
                return console.log("\nhome rendering..."), new q, console.log("home rendered\n")
            }, c.prototype.login = function() {
                return console.log("\nlogin rendering..."), (new f).render(), console.log("login rendered\n")
            }, c.prototype.signup = function() {
                return console.log("\nsignup rendering..."), (new m).render(), console.log("signup rendered\n")
            }, c.prototype.support = function() {
                return console.log("\nsupport rendering..."), (new n).render(), console.log("support rendered\n")
            }, c.prototype.dashboard = function() {
                return console.log("\ndashboard rendering..."), (new e).render(), console.log("dashboard rendered\n")
            }, c
        }(c.Router), r = function(a, b, c) {
            return c === "login" || b === c ? a + b : error
        }, p = function() {
            return console.log("form submitted")
        }, o = function() {
            var a, b, d;
            return console.log("Creating Views/Models/collections"), b = new j, a = new h, d = new k, c.history.start(), console.log("history started"), console.log("Created Views/Models/Collections")
        }, o(), console.log("\nmain.coffee loaded\n")
    })
}).call(this)
