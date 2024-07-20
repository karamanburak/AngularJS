(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    let list = this;

    list.items = ShoppingListCheckOffService.getToBuyItems();

    list.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }
  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    let boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    let service = this;

    let toBuyItems = [
      { item_name: "Cookies", item_quantity: 2 },
      { item_name: "Chips", item_quantity: 4 },
      { item_name: "Cracker", item_quantity: 6 },
      { item_name: "Biscuit", item_quantity: 8 },
      { item_name: "Chocolate", item_quantity: 10 },
    ];

    let boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.buyItem = function (itemIndex) {
      let item = toBuyItems.splice(itemIndex, 1)[0];
      boughtItems.push(item);
    };
  }
})();
