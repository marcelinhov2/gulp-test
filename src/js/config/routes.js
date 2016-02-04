angular.module('routes', ['templates', 'ui.router', 'aboutController', 'contactController'])
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('index', {
				url:'/'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/templates/about.html',
				controller: 'aboutCtrl'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: '/templates/contact.html',
				controller: 'contactCtrl'
			});
		$urlRouterProvider.otherwise('/');
	});
