    var app = angular.module('cartApp');

    function cartController($scope, cartService, $modal, $log,$http) {
        var discountPercentage = 0;
        $scope.DiscountPercentageList = [
            { itemCount : 3, percentage : 5 } , { itemCount : 6 , percentage : 10 } , { itemCount:10, percentage:25 }
        ];
        cartService.getCartData('mock/cart.json').then(function(response) {
            $scope.CartList = angular.fromJson(JSON.stringify(response.data.productsInCart));
            console.log($scope.CartList);
                $scope.RecalculateCart();               
            });
        
        $scope.RecalculateCart = function(){
                $scope.CalculateDiscount();
                $scope.CalculateCartTotal();
                $scope.ApplyDiscount();  
        };
        
         $scope.open = function (selectedItem) {
            $modal.open({
                templateUrl: 'modalPopup.html', // loads the template
                backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
                windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
                controller: function ($scope, $uibModalInstance, curItem) {
                    $scope.curItem = curItem;
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    curItem: function () {
                        return selectedItem ;
                    }
                }
            });//end of modal.open
        };
        $scope.EditItem = function(curItem) {
            $scope.open(curItem);
        };
        
        $scope.CalculateDiscount = function(){
            discountPercentage = 0;
            $scope.DiscountPercentageList.forEach(function(item){
                if($scope.CartList.length >= item.itemCount) {
                    discountPercentage = item.percentage;
                }
            });
        }; 
        
        $scope.CalculateCartTotal = function(){
          var total = 0;
          $scope.CartList.forEach(function(item){
              total = total + parseFloat(item.p_price);
          }); 
          $scope.SubTotal = total;
        };
        
        $scope.ApplyDiscount = function() {
            $scope.DiscountAmount = ($scope.SubTotal * discountPercentage) / 100;
            $scope.EstimatedSubTotal = $scope.SubTotal - $scope.DiscountAmount;
        };
        
        $scope.RemoveCartItem = function(item) {
            $scope.CartList.splice($scope.CartList.indexOf(item),1);
            $scope.RecalculateCart();
        };
        
    }

    app.controller('cartController' , ['$scope' , 'cartService' , '$uibModal', '$log','$http' , cartController]);