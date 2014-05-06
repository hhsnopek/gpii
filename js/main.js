(function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};require.config({paths:{underscore:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore",Backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone",jquery:"//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery",Fuse:"//raw.githubusercontent.com/krisk/fuse/master/src/fuse.min"},shim:{underscore:{exports:"_"},Backbone:{deps:["underscore","jquery"],exports:"Backbone"},Fuse:{exports:"Fuse"}}}),require(["jquery","Backbone","Fuse"],function(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z;return l=!1,g=function(c){function d(){return r=d.__super__.constructor.apply(this,arguments),r}return b(d,c),d.prototype.el=a("#home #searchContainer"),d.prototype.events={"click #searchButton":"search","keyup #searchInput":"keyupInput","keydown #searchInput":"keydownInput","focus #searchInput":"focusInput","focusout #searchInput":"focusoutInput"},d.prototype.render=function(){return n("#home")},d.prototype.search=function(){var b;return console.log("Clicked"),b=JSON.stringify(a("#searchInput").val()),window.search_results.set({query:b}),new h,window.router.navigate("products")},d.prototype.keyupInput=function(){a("#hint p").text('Search for "'+a("#searchInput").val()+'"');if(a("#searchInput").val()==="")return a("#hint").removeClass("active"),l=!1},d.prototype.keydownInput=function(){if(l===!1)return a("#hint").addClass("active"),l=!0},d.prototype.focusInput=function(){if(l===!0)return a("#hint").addClass("active")},d.prototype.focusoutInput=function(){return a("#hint").removeClass("active")},d}(c.View),e=function(a){function c(){return s=c.__super__.constructor.apply(this,arguments),s}return b(c,a),c.prototype.initialize=function(){return this.render()},c.prototype.render=function(){return n("#about")},c}(c.View),k=function(a){function c(){return t=c.__super__.constructor.apply(this,arguments),t}return b(c,a),c.prototype.initialize=function(){return this.render()},c.prototype.render=function(){return n("#support")},c}(c.View),f=function(a){function c(){return u=c.__super__.constructor.apply(this,arguments),u}return b(c,a),c.prototype.initialize=function(){return this.render()},c.prototype.render=function(){return n("#careers")},c}(c.View),o=function(a){function c(){return v=c.__super__.constructor.apply(this,arguments),v}return b(c,a),c.prototype.initialize=function(){return this.render()},c.prototype.render=function(){return n("#faq")},c}(c.View),q=function(a){function c(){return w=c.__super__.constructor.apply(this,arguments),w}return b(c,a),c.prototype.initialize=function(){return this.render()},c.prototype.render=function(){return n("#order")},c}(c.View),h=function(c){function e(){return x=e.__super__.constructor.apply(this,arguments),x}var d;return b(e,c),e.prototype.el=a("main #products"),e.prototype.events={"keyup #searchInput":"searchItems"},e.prototype.initialize=function(){var a,b;this.render();if(window.search_results.get("query")===!0)return a=window.fuse,b=a.search(window.search_results.get("query")),window.search_results.set({results:b}),d()},e.prototype.render=function(){return n("#products")},e.prototype.searchItems=function(){var b,c;return b=a("#products #searchBar #searchInput").val(),c=fuse.search(b),window.search_results.set({results:c}),d()},d=function(){var b,c,d,e,f;b=window.search_results.get("results"),a("#results").empty(),f=[];for(d=0,e=b.length;d<e;d++)c=b[d],f.push(a("#results").append("<table>          <tr class='item'>            <td id='id' class='name'>ID</td>            <td id='id'>"+c.ID+"</td>            <td id='make' class='name'>Make</td>            <td id='make'>"+c.Make+"</td>            <td id='model' class='name'>Model</td>            <td id='model'>"+c.Model+"</td>            <td id='year' class='name'>Year</td>            <td id='year'>"+c.Year+"</td>            <td id='part' class='name'>Part</td>            <td id='part'>"+c.Part+"</td>            <td id='price' class='name'>Price</td>            <td id='price'>"+c.Price+"</td>            <td id='quantity' class='name'>Quantity</td>            <td id='quantity'>"+c.Quantity+"</td>          </tr>          </table>"));return f},e}(c.View),j=function(a){function c(){return y=c.__super__.constructor.apply(this,arguments),y}return b(c,a),c.prototype.query="",c.prototype.results=[],c}(c.Model),i=function(a){function c(){return z=c.__super__.constructor.apply(this,arguments),z}return b(c,a),c.prototype.routes={"":"home",home:"home",about:"about",support:"support",products:"products",careers:"careers",order:"order",faq:"faq"},c.prototype.home=function(){return(new g).render()},c.prototype.about=function(){return new e},c.prototype.support=function(){return new k},c.prototype.products=function(){return new h},c.prototype.careers=function(){return new f},c.prototype.faq=function(){return new o},c.prototype.order=function(){return new q},c}(c.Router),p=function(){return console.log("form submitted")},n=function(b){var c,d,e,f;d=["#home","#products","#about","#support","#careers","#faq","#order"];for(e=0,f=d.length;e<f;e++)c=d[e],a(c).css("display","none");return a(b).css("display","block"),b!=="#home"?(a("header nav").addClass("active"),a("body").css("background","#eee")):(a("header nav").removeClass("active"),a("body").css("background","url('/img/backgrounds/chevelle.jpg') no-repeat center center fixed"),a("body").css("background-size","cover"))},m=function(){return a.ajax({url:"http://cscstudent.carrollu.edu/csc211/eschwant/data/parts.json",datatype:"json"}).done(function(a){return console.log("parts.json successfully loaded"),a=a.dataroot.PartsTbl,window.fuse=new d(a,{caseSensitive:!1,includeScore:!1,shouldSort:!0,threshold:.3,keys:["Make","Model","Part","Year","ID"]}),window.data=a}),window.router=new i,window.search_results=new j,c.history.start()},m(),console.log("main.coffee loaded")})}).call(this)