var myApp = angular.module("myModule", ['ngStorage']);
myApp.controller("myController", ['$scope', '$http', '$window', '$localStorage', function($scope, $http, $window, $localStorage) {

    $scope.comments = '';
    //localStorage.clear();
    var demo = localStorage.getItem('sum');
    $scope.sum = parseInt(demo) || 0;
    $scope.posts = '';
    $scope.users = '';
    $scope.voters = '';
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.q = '';
    $http.get("Comments.xml", {
        transformResponse: function(cnv) {
            var x2js = new X2JS();
            var aftCnv = x2js.xml_str2json(cnv);
            return aftCnv;
        }
    }).success(function(response) { $scope.comments = response.comments.row; });
    $http.get("Posts.xml", {
        transformResponse: function(cnv) {
            var x2js = new X2JS();
            var aftCnv = x2js.xml_str2json(cnv);
            return aftCnv;
        }
    }).success(function(response) {
        $scope.posts = response.posts.row;
        console.log($scope.posts);
    });
    $scope.numberOfPages = function() {
            return Math.ceil($scope.posts.length / $scope.pageSize);
        }
        // $http.get("Users.xml", {
        //     transformResponse: function(cnv) {
        //         var x2js = new X2JS();
        //         var aftCnv = x2js.xml_str2json(cnv);
        //         return aftCnv;
        //     }
        // }).success(function(response) { $scope.Users = response; });
        // $http.get("Votes.xml", {
        //     transformResponse: function(cnv) {
        //         var x2js = new X2JS();
        //         var aftCnv = x2js.xml_str2json(cnv);
        //         return aftCnv;
        //     }
        // }).success(function(response) { $scope.Votes = response; });
        // $http.get("Badges.xml", {
        //     transformResponse: function(cnv) {
        //         var x2js = new X2JS();
        //         var aftCnv = x2js.xml_str2json(cnv);
        //         return aftCnv;
        //     }
        // }).success(function(response) { $scope.Badges = response; });



    $scope.$storage = $localStorage.$default({
        x: 0
    });
    
    $scope.add = function(post) {
        $scope.sum = $scope.sum + 1;
        localStorage.setItem('sum',parseInt($scope.sum));
    }
    $scope.sub = function(post) {
        $scope.sum = $scope.sum - 1;
        localStorage.setItem('sum',parseInt($scope.sum));
    }


}]);

myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
