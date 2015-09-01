var ac = angular.module('autocomplete', []);
ac.controller('Load', ['$scope', '$http',
function($scope, $http) {
	$scope.data = ["lucio", "nunez"];
	$scope.customer = {
		name : 'Naomi',
		address : '1600 Amphitheatre'
	};
}]);
ac.directive('qndAutocomplete', ['$http',
function($http) {
	return {
		replace : true,
		transclude : "element",
		templateUrl : "templates/autocomplete.html",
		scope : {
			src : "@url"
		},
		link : function(scope, element, attrs, ctrl, transclude) {

			console.debug(transclude());
			transclude(function(clone) {
				var pTag = angular.element(clone);
				console.debug(pTag);

			});

			element.on('focus', function() {
				element.addClass('focus');
				console.debug("focuuu");
			});
			element.on('blur', function(event) {
				console.debug(elem);
			});
			element.on('keyup', function(event) {
				element.addClass("active");
				scope.items = [];
				$http.get(scope.src).success(function(data) {
					var filtered = [];
					for (var i = 0; i < data.length; i++) {
						if (data[i].name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
							filtered.push(data[i]);
						}
					}
					scope.items = filtered;
				});
			});
		}
	};
}]);
