(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .constant('BaseURL', 'https://davids-restaurant.herokuapp.com')
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'ctrl',
      bindToController: true
    }

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var ctrl = this;

    ctrl.isEmpty = function () {
      return (ctrl.foundItems && ctrl.foundItems.length === 0);
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.narrowItDown = function() {
      ctrl.found = null;
      if (ctrl.searchTerm.trim() === '') {
        ctrl.found = [];
      }
      else {
        ctrl.nothingFound = false;
        MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(
          function(result) {
            ctrl.found = result;
          }
        );
      }
    }

    ctrl.removeItem = function(index) {
      ctrl.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'BaseURL']
  function MenuSearchService($http, BaseURL) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: (BaseURL + '/menu_items.json')
      }).then(
        function(result) {
          var foundItems = [];
          result.data.menu_items
            .filter(item => item.description.indexOf(searchTerm) !== -1)
            .forEach(item => foundItems.push(item));

          return foundItems;
        }
      )
    }
  }
})();
