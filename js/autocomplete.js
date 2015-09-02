var ac = angular.module('autocomplete', []);
ac.directive('qndAutocomplete', ['$http',
function($http) {
	return {
		replace : true,
		transclude : "element",
		templateUrl : "templates/autocomplete.html",
		scope : {
			src : "@url"		},
		link : function(scope, element, attrs, ctrl, transclude) {
			scope.addToSelectedTags = function(tag) {
				element.find("input").val(tag);
			};
			element.find("input").on('focus', function() {
				element.addClass('qnd-focus');
			});
			element.find("input").on('blur', function(event) {
				setTimeout(function() {
					element.removeClass('qnd-focus');
				}, 500);
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
