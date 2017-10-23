var app = angular.module('cartApp');

function cartService($http) {
    function getCartData(url){
        return $http.get(url);
    }
    
    return {
        getCartData : getCartData
    };
}

app.factory('cartService', cartService);