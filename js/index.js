const inventoryBox = document.getElementById("inventory-box");
const inventoryItems = document.getElementById("inventory");
const roles = document.getElementById("roles");
const roleSec = document.getElementById("roleSec");

inventoryBox.addEventListener("click", () => {
  inventoryItems.classList.toggle("display-flex");
});

let selectedTool = "";
let selectedInventoryBlock = "";
let inventory = { grass: 0, dirt: 0, stone: 0, leaves: 0, wood: 0 };

const initialWorld = [
  ["", "leaves", "leaves", "leaves", ""],
  ["leaves", "leaves", "leaves", "", ""],
  ["leaves", "leaves", "leaves", "", ""],
  ["leaves", "leaves", "leaves", "", ""],
  //raw num 1
  ["", "leaves", "wood", "leaves", ""],
  ["leaves", "wood", "leaves", "", ""],
  ["leaves", "wood", "leaves", "", ""],
  ["leaves", "wood", "leaves", "", ""],
  //raw num 2
  ["", "", "wood", "", ""],
  ["", "wood", "", "", ""],
  ["", "wood", "", "", ""],
  ["", "wood", "", "", ""],
  //raw num 3
  ["grass", "grass", "grass", "grass", "grass"],
  ["grass", "grass", "grass", "grass", "grass"],
  ["grass", "grass", "grass", "grass", "grass"],
  ["grass", "grass", "grass", "grass", "grass"],
  //raw num 4
  ["stone", "stone", "stone", "stone", "stone"],
  ["stone", "stone", "stone", "stone", "stone"],
  ["stone", "stone", "stone", "stone", "stone"],
  ["stone", "stone", "stone", "stone", "stone"],
  //raw num 5
  ["dirt", "dirt", "dirt", "dirt", "dirt"],
  ["dirt", "dirt", "dirt", "dirt", "dirt"],
  ["dirt", "dirt", "dirt", "dirt", "dirt"],
  ["dirt", "dirt", "dirt", "dirt", "dirt"],
  //raw num 6
];

const grid = document.querySelector(".grid");

//  grid
function generateGrid(world) {
  grid.innerHTML = ""; // Clear grid
  world.forEach((row) => {
    row.forEach((block) => {
      const blockElement = document.createElement("div");
      blockElement.classList.add("cell");
      if (block !== "empty") {
        blockElement.classList.add(`${block}box`);
        blockElement.dataset.type = block;
      } else {
        blockElement.dataset.type = "empty";
      }
      grid.appendChild(blockElement);
    });
  });
}

generateGrid(initialWorld);

//tools

const axe = document.getElementById("axe");
const shovel = document.getElementById("shovel");
const pickaxe = document.getElementById("pickaxe");

axe.addEventListener("click", () => {
  selectedTool = "axe";
  axe.classList.add("picked");
  shovel.classList.remove("picked");
  pickaxe.classList.remove("picked");
});

shovel.addEventListener("click", () => {
  selectedTool = "shovel";
  shovel.classList.add("picked");
  axe.classList.remove("picked");
  pickaxe.classList.remove("picked");
});

pickaxe.addEventListener("click", () => {
  selectedTool = "pickaxe";
  pickaxe.classList.add("picked");
  axe.classList.remove("picked");
  shovel.classList.remove("picked");
});

// Inventory block selection

const invImgs = document.querySelectorAll(".inventory img").forEach((item) => {
  item.addEventListener("click", (e) => {
    selectedInventoryBlock = e.target.className;
  });
});

// block remove and inventory update
function removeBlock(block) {
  const blockType = block.dataset.type;
  if (
    (selectedTool === "axe" && blockType === "wood") ||
    (selectedTool === "axe" && blockType === "leaves") ||
    (selectedTool === "shovel" && blockType === "dirt") ||
    (selectedTool === "shovel" && blockType === "grass") ||
    (selectedTool === "pickaxe" && blockType === "stone")
  ) {
    block.className = "cell";
    block.dataset.type = "empty";
    addToInventory(blockType);
  }
}

// remove from grid
grid.addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) {
    if (e.target.dataset.type !== "empty") {
      removeBlock(e.target);
    } else if (selectedInventoryBlock) {
      placeBlock(e.target);
    }
  }
});

// add block to inventory
function addToInventory(blockType) {
  inventory[blockType]++;
  updateInventoryDisplay();
}

function placeBlock(cell) {
  if (inventory[selectedInventoryBlock] > 0) {
    cell.classList.add(`${selectedInventoryBlock}box`);
    cell.dataset.type = selectedInventoryBlock;
    inventory[selectedInventoryBlock]--;
    updateInventoryDisplay();
  }
}

// Update inventory display (counters)
function updateInventoryDisplay() {
  document.getElementById("grassCounter").textContent = inventory.grass;
  document.getElementById("dirtCounter").textContent = inventory.dirt;
  document.getElementById("stoneCounter").textContent = inventory.stone;
  document.getElementById("woodCounter").textContent = inventory.wood;
  document.getElementById("leavesCounter").textContent = inventory.leaves;
}

// Reset
document.getElementById("reset").addEventListener("click", () => {
  generateGrid(initialWorld);
  inventory = { grass: 0, dirt: 0, stone: 0, wood: 0, leaves: 0 };
  updateInventoryDisplay();
  selectedTool = "";
  selectedInventoryBlock = "";
});
