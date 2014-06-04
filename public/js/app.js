var app = angular.module("GagApp", ["ngRoute"]);

app.globalScope = {};

function GagController ($scope, $http, $location, $routeParams, $rootScope) {
	loadGags($http, $routeParams.category, $routeParams.pageId, function(resp) {
		console.log(resp);
		if(resp.data) {
			$rootScope.gags = resp.data;
			$rootScope.nextPageId = resp.paging.next;
		}
	});
}

function loadGags(http, category, pageId, callback) {
	http.get("/gag/" + category + "/" + pageId).success(callback);
} 

function InitController ($location) {
	$location.path("/gag/hot/0");
}
function MasterController ($scope, $http, $location) {
	console.log("MasterController");
	$scope.loadGagCategory = function (categoryName) {
		$location.path("/gag/" + categoryName + "/0");
	}
}

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {template: "<div></div>", controller: InitController})
		.when("/gag/:category/:pageId", {templateUrl: "/views/gag.html", controller: GagController})
		.otherwise({redirectTo: "/"});
}]);