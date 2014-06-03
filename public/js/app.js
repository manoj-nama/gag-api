var app = angular.module("GagApp", ["ngRoute"]);

function GagController ($scope, $http, $location, $routeParams) {
	$http.get("/gag/" + $routeParams.category + "/" + $routeParams.pageId).success(function(resp) {
		console.log(resp);
		if(resp.data) {
			$scope.gags = resp.data;
			$scope.nextPageId = resp.paging.next;
		}
	});
}

function MasterController ($location) {
	$location.path("/gag/hot/0");
}

app.config(["$routeProvider", function ($routeProvider) {
	$routeProvider
		.when("/", {template: "<div></div>", controller: MasterController})
		.when("/gag/:category/:pageId", {templateUrl: "/views/gag.html", controller: GagController})
		.otherwise({redirectTo: "/"});
}]);