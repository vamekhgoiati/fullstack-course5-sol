(function() {
  'use strict';
  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunch = '';
    $scope.message = '';
    $scope.textColor = '';
    $scope.checkLunch = function() {
      let text = $scope.lunch.trim();
      $scope.message = setMessage(text);
      let color = getColor($scope.message);
      $scope.textColor = color;
      $scope.backgroundColor = 'solid 1px ' + color;
    }

    function setMessage(text) {
      if (text === '') {
        return 'Please enter data first';
      }
      if (text.split(',').length <= 3) {
        return 'Enjoy!';
      }
      return 'Too much!';
    }

    function getColor(message) {
      let color = '';
      switch (message) {
        case 'Please enter data first':
          color = 'red';
          break;
        case 'Enjoy!':
        case 'Too much!':
          color = 'green';
          break;
      }
      return color;
    }
  };
})();
