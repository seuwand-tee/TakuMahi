"use strict";

class User {

    constructorUser(username, idNumber, role, firstName, lastName, emailAddress) {
        // only set the fields if we have a valid product
        if (username) {
            this.username = username;
            this.idNumber = idNumber;
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
        }
    }

}

/** class Unavailability {

    constructor() {
        this.items = new Array();
    }

    reconstruct(sessionData) {
        for (let item of sessionData.items) {
            this.addItem(Object.assign(new SaleItem(), item));
        }
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item);
    }

    setCustomer(customer) {
        this.customer = customer;
    }

    getTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.getItemTotal();
        }
        return total;
    }

}
**/// create a new module, and load the other pluggable modules
var module = angular.module('TakuMahi', ['ngResource', 'ngStorage']);

module.factory('productAPI', function ($resource) {
    return $resource('/api/products/:id');
});

module.factory('categoryAPI', function ($resource) {
    return $resource('/api/categories/:category');
});

module.factory('signInAPI', function ($resource) {
   return $resource('/api/customer/:username');
});

module.factory('registerAPI', function ($resource) {
   return $resource('/api/register');
});
module.factory('salesAPI', function ($resource){
	return $resource ('/api/sales');
});

module.factory('cart', function ($sessionStorage) {
    let cart = new ShoppingCart();

    // is the cart in the session storage?
    if ($sessionStorage.cart) {

        // reconstruct the cart from the session data
        cart.reconstruct($sessionStorage.cart);
    }

    return cart;
});

module.controller('ProductController', function (productAPI, categoryAPI) {
	// load the products
	this.products = productAPI.query();
	// load the categories
	this.categories = categoryAPI.query();

	// click handler for the category filter buttons
	this.selectCategory = function (selectedCat) {
		this.products = categoryAPI.query({"category": selectedCat});
	};
	this.showAll = function () {
		this.products = productAPI.query();
	};
});

module.controller('CustomerController', function (registerAPI, signInAPI, $window, $sessionStorage) {

	// alias 'this' so that we can access it inside callback functions
	let ctrl = this;

	this.signInMessage = "Please sign in to continue.";

	this.registerCustomer = function (customer) {
		registerAPI.save(null, customer,

			// success callback
			function () {
				$window.location = 'signin.html';
			},

			// error callback
			function (error) {
				console.log(error);
			}
		);

	};


	this.signIn = function (username, password) {

		// get customer from web service
		signInAPI.get({'username': username},
			// success callback
			function (customer) {
				// also store the retrieved customer
				$sessionStorage.customer = customer;

				// redirect to home
				$window.location = '.';
			},
			// fail callback
			function () {
				ctrl.signInMessage = 'Sign in failed. Please try again.';
			}
		);
	};
	this.checkSignIn = function () {
   // has the customer been added to the session?
   if ($sessionStorage.customer) {
      this.signedIn = true;
      this.welcome = "Welcome " + $sessionStorage.customer.firstname;
    } else {
      this.signedIn = false;
    }
};

this.signOut = function (){
	$sessionStorage.$reset();
};

});


module.controller('ShoppingCartController', function (cart, $sessionStorage, $window, salesAPI) {
	this.items = cart.getItems();
	this.total = cart.getTotal();
	this.selectedProduct = $sessionStorage.selectedProduct;

	this.buy = function(product){
		 $sessionStorage.selectedProduct = product;
		 $window.location = "quantity.html";
	};

	this.addToCart = function(quantity){
		let item = new SaleItem(this.selectedProduct, quantity);
		cart.addItem(item);
		$sessionStorage.cart = cart;
		$window.location = "shoppingcart.html";
	};

	this.checkoutCart = function (){
		cart.setCustomer($sessionStorage.customer);
		salesAPI.save(cart);
		delete $sessionStorage.cart;
		$window.location = "thankyou.html";
	};
});
