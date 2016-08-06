Router.configure({
	layoutTemplate: 'layout'
});


var OnBeforeActions = {
  loginRequired: function() {
    if(!Meteor.userId()) {
      Router.go("/");
    } else {
      this.next();
    }
  }
}

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['add_product', 'new_review']
});


Router.map(function(){
	this.route('home', {
		path: '/',
		template: 'home',
		data: function() {
      		templateData = {
        		products: Products.find({is_featured: '1'})
      		};
      		return templateData;
    	}
	});

	// Products
  this.route('products', {
    path: '/products',
    template: 'products',
    data: function() {
      	templateData = {
        	products: Products.find()
      	};
      	return templateData;
    }
  });
  	//Add product
  this.route('add_product', {
    path: '/add_product',
    template: 'add_product',
    data: function() {
      	templateData = {
        	categories: Categories.find()
      	};
      	return templateData;
    }
  });

    // Category Products
  this.route('category_products', {
    path: '/categories/:slug',
    template: 'category_products',
    data: function() {
      templateData = {
        category_products: Products.find({
          category: this.params.slug
        })
      };
      return templateData;
    }
  });


  // New Review
  this.route('new_review', {
    path: '/new-review/:_id',
    template: 'new_review',
    data: function() {
      return Products.findOne(this.params._id);
    }
  });

  // Product Page
  this.route('product', {
    path: '/products/:_id',
    template: 'product',
    data: function() {
      return Products.findOne(this.params._id);
    }
  });



});