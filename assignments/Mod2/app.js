(function() {
  'use strict';
  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyShoppingController", ToBuyShoppingController)
  .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService']
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getToBuyList();

    toBuyList.buyItem = function(itemIdx) {
      ShoppingListCheckOffService.buy(itemIdx);
    };
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService']
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtList();
  }


  function ShoppingListCheckOffService() {
      var service = this;
      var toBuyList = [
                        { name:'Cookies', quantity:10 },
                        { name:'Beer', quantity:10 },
                        { name:'Cake', quantity:1 },
                        { name:'Juice', quantity:5 },
                        { name:'Sausage', quantity:10 }
                      ];
      var boughtList = [];

      service.buy = function(itemIdx) {
        boughtList.push(toBuyList[itemIdx]);
        toBuyList.splice(itemIdx, 1);
      }

      service.getToBuyList = function() {
        return toBuyList;
      }

      service.getBoughtList = function() {
        return boughtList;
      }
  };
})()
