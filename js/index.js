const inventoryBox = document.getElementById("inventory-box");
const inventory = document.getElementById("inventory");

inventoryBox.addEventListener("click", () => {
  inventory.classList.toggle("display-flex");
});
