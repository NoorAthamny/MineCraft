const inventoryBox = document.getElementById("inventory-box");
const inventory = document.getElementById("inventory");
const roles = document.getElementById("roles");
const roleSec = document.getElementById("roleSec");

inventoryBox.addEventListener("click", () => {
  inventory.classList.toggle("display-flex");
});
