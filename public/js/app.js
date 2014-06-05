var app = angular.module("GagApp", ["ngRoute"]);

app.globalScope = {};

function GagController ($scope, $http, $location, $routeParams, $rootScope) {
	var gagId = $routeParams.gagId || 1;
	function lazyLoadGags() {
		$rootScope.hasMore && loadGags($http, $routeParams.category, $routeParams.pageId, function(resp) {
			console.log(resp);
			if(resp.data) {
				$scope.gags = resp.data;
				$scope.nextPageId = resp.paging.next;
				$scope.totalGags = resp.data.length;
				$scope.currentGag = $scope.gags[gagId - 1];
				$rootScope.hasMore = false;
			}
		});
	}

	lazyLoadGags();

	$scope.showGag = function (direction) {	
		var gagId = (!isNaN($routeParams.gagId)) ? $routeParams.gagId : 1;
		if(direction) {
			switch(direction) {
				case 'next':
					gagId++;
					break;
				case 'prev':
					gagId--;
			}
			console.log(gagId);
			$scope.currentGag = $scope.gags[gagId - 1];
			if(gagId > $scope.totalGags - 1) {
				lazyLoadGags();
			}
		}
	}

	// $scope.nextGag = ($routeParams.gagId < $rootScope.totalGags) ? 
}

function loadGags(http, category, pageId, callback) {
	http.get("/gag/" + category + "/" + pageId).success(callback);
} 

function InitController ($location) {
	$location.path("/gag/hot/0/1");
}
function MasterController ($scope, $http, $location, $rootScope) {
	$rootScope.hasMore = true;
	$scope.loadGagCategory = function (categoryName) {
		$location.path("/gag/" + categoryName + "/0/1");
	}
}

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {template: "<div></div>", controller: InitController})
		.when("/gag/:category/:pageId/:gagId", {templateUrl: "/views/gag.html", controller: GagController})
		.otherwise({redirectTo: "/"});
}]);