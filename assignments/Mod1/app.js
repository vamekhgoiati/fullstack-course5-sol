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
      const text = $scope.lunch.trim();
      $scope.message = setMessage(text);
      const color = getColor($scope.message);
      $scope.textColor = color;
      $scope.backgroundColor = 'solid 1px ' + color;
    }

    function setMessage(text) {
      const textArray = text.split(',').filter(c => c.trim());
      if (!textArray.length) {
        return 'Please enter data first';
      }
      return textArray.length <= 3 ? 'Enjoy!' : 'Too much!';
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
