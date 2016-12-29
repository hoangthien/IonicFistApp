angular.module('app.controllers')
.controller("demoCtrl", function($ionicPlatform, $scope, $cordovaSQLite, $ionicPopup, $timeout) {
    // Load dữ liệu khi chạy ứng dụng
    $ionicPlatform.ready(function() {
        $scope.show();
    });
    $scope.product = {name: '', info: ''};
    //Thêm
    $scope.add = function(product) {
        if((product.name != null && product.name != '') && (product.info != null && product.info != '') && (product.name != undefined)) {
            var query = "INSERT INTO fruit(name,info)VALUES(?,?)";
            $cordovaSQLite.execute(db, query, [product.name, product.info]);
            $scope.product.name = null;
            $scope.product.info = null;
            $scope.show();
            // Hiển thị popup
            var myPopup = $ionicPopup.show({
                title: 'Thêm thành công'
            });
            // Tắt pupup sau 500 mi li giây
            $timeout(function() {
                myPopup.close();
            }, 500);
        }
        else {
            var myPopup = $ionicPopup.show({
                title: 'Nhập thiếu thông tin, vui lòng nhập đầy đủ!!!'
            });
            $timeout(function() {
                myPopup.close();
            }, 1000);
        }
    }
    // Xóa dữ liệu trong bảng
    $scope.del = function(product) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Cảnh báo',
            template: 'Bạn có muốn xóa dữ liệu?'
        });
        confirmPopup.then(function(res) {
            if(res) {
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
        });
    }
    // Chỉnh sửa
    $scope.edit = function(product) {
        $scope.showPopup();
    }
    // Hiển thị dữ liệu
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

    $scope.showPopup = function() {
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="product.name">',
            title: 'Chỉnh sửa thông tin',
            scope: $scope,
            inputPlaceholder: 'Your password',
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.product.name) {
                            e.preventDefault();
                        } else {
                            return $scope.product.name;
                        }
                    }
                },
                { text: 'Help' },
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
    };
})