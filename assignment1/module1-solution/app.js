(function () {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.input = "";
    $scope.message = "";

    $scope.checkIfTooMuch = function () {
      if ($scope.input.trim() === "") {
        $scope.message = "Please enter the meal first";
        return;
      }

      let array = $scope.input.split(",").filter((item) => item.trim() !== "");

      if (array.length === 0) {
        $scope.message = "Please enter the meal first";
      } else if (array.length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
      return;
    };
  }
})();
