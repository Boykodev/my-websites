var app = angular.module('app', []);

app.factory("yoda", function ($http) {
	return {
		user: {},
		speaks: function () {
			var that = this;
			var input = that.user.input;
			if (typeof that.user.input === 'undefined') {
				input = 'You must enter text first!';
			}
			that.user.input = '';
			$http({
				url: 'https://yoda.p.mashape.com/yoda?',
				method: 'GET',
				headers: {"X-Mashape-Authorization": "OFnRuWJsY2TwdrEtByGzVfB4y7q37hJm"},
				params: {"sentence": input },
		}).success(function (data) {
				data = data.toLowerCase();
				that.user.output = data;
			})
		}
	}
})

app.controller('mainCtrl', function ($scope, yoda) {
	$scope.user = yoda.user;
	$scope.submit = function($scope) {
		yoda.speaks();
	}
})