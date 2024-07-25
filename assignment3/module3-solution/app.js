(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiBasePath", "https://coursera-jhu-default-rtdb.firebaseio.com")
    .directive("foundItems", FoundItems);

  function FoundItems() {
    var ddo = {
      templateUrl: "items.html",
      scope: {
        items: "<",
        onRemove: "&",
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "list",
      bindToController: true,
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.searchTerm = "";
    menu.found = [];
    menu.error = "";

    menu.getMatchedMenuItems = function () {
      menu.found = [];
      if (menu.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise
          .then(function (response) {
            menu.found = response;
            if (menu.found.length === 0) {
              menu.error = "Nothing found";
            } else {
              menu.error = "";
            }
          })
          .catch(function (error) {
            console.log("Something went terribly wrong.");
          });
      } else {
        menu.error = "Please enter a search term";
      }
    };

    menu.removeItem = function (index) {
      menu.found.splice(index, 1);
      if (menu.found.length == 0) {
        menu.error = "Nothing found";
      }
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json",
      }).then(function (result) {
        // process result and only keep items that match
        var items = result.data.menu_items;
        var foundItems = [];
        searchTerm = searchTerm.toLowerCase();
        for (var index = 0; index < items.length; index++) {
          if (
            items[index].description &&
            items[index].description.toLowerCase().indexOf(searchTerm) !== -1
          ) {
            foundItems.push(items[index]);
          }
        }

        // return processed items
        return foundItems;
      });
    };
  }
})();
