import Game from "./components/Game.js";

document.addEventListener("DOMContentLoaded", () => {
  const levelsContainer = document.querySelector(".levels_container");
  const cellsContainer = document.querySelector(".cells_container");

  document.querySelector("#easy").addEventListener("click", () => {
    new Game(cellsContainer, 4);
  });

  document.querySelector("#normal").addEventListener("click", () => {
    new Game(cellsContainer, 8);
  });

  document.querySelector("#hard").addEventListener("click", () => {
    new Game(cellsContainer, 16);
  });
});
