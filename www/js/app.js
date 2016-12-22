// Ionic Starter App
var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        db = window.openDatabase("sql.db", "1", "Demo", "2000");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS fruit(id integer primary key, name text, info text)");
    });
})

.controller("appCtrl", function($scope, $cordovaSQLite, $ionicPopup, $timeout) {
    $scope.add = function(product) {
        if((product.name != null && product.name != '') && (product.info != null && product.info != '')) {
            var query = "INSERT INTO fruit(name,info)VALUES(?,?)";
            $cordovaSQLite.execute(db, query, [product.name, product.info]);
            product.name = null;
            product.info = null;
            $scope.show();
            var myPopup = $ionicPopup.show({
                title: 'Thêm thành công'
            });
            $timeout(function() {
                myPopup.close();
            }, 500);
        }
        else {
            var myPopup = $ionicPopup.show({
                title: 'Nhập thông tin sai!!!'
            });
            $timeout(function() {
                myPopup.close();
            }, 500);
        }
    }
    $scope.del = function(product) {
        var query = "DELETE FROM fruit";
        $cordovaSQLite.execute(db, query);
        var myPopup = $ionicPopup.show({
            title: 'Xóa thành công!!!'
        });
        $timeout(function() {
            myPopup.close();
        }, 500);
        $scope.show();
    }
    $scope.show = function() {
        var query = "SELECT * FROM fruit ";
        $scope.array = [];
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.array.push(res.rows.item(i));
                }
            }
        }, function(err) {
            console.log(err);
        });
    }
})