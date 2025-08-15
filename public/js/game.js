document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const levelsContainer = document.querySelector(".levels_container");
  const gameContainer = document.querySelector(".game-container");
  const cellsContainer = document.querySelector(".cells_container");
  const attemptsDisplay = document.getElementById("attempts");
  const matchesDisplay = document.getElementById("matches");

  let attempts = 0;
  let matchesFound = 0;
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let totalPairs = 0;
  let cards = [];

  // Difficulty levels configuration
  const levels = {
    easy: 4,
    normal: 8,
    hard: 16,
  };

  // Start game
  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);

  function startGame() {
    const selectedLevel = document.querySelector(
      'input[name="level"]:checked'
    ).value;
    totalPairs = levels[selectedLevel];

    // Setup game
    setupGame(totalPairs);

    // Show game container
    levelsContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    // Reset stats
    attempts = 0;
    matchesFound = 0;
    updateStats();
  }

  function resetGame() {
    // Clear the board
    cellsContainer.innerHTML = "";

    // Reset game state
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    attempts = 0;
    matchesFound = 0;
    updateStats();

    // Show level selection
    gameContainer.classList.add("hidden");
    levelsContainer.classList.remove("hidden");
  }

  function setupGame(pairs) {
    // Create an array with pairs of numbers
    let numbers = [];
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }

    // Shuffle the numbers
    numbers = shuffleArray(numbers);

    // Create cards
    cellsContainer.innerHTML = "";
    cards = [];

    // Calculate grid size based on difficulty
    let gridSize;
    if (pairs === 4) gridSize = "grid-template-columns: repeat(4, 1fr)";
    else if (pairs === 8) gridSize = "grid-template-columns: repeat(4, 1fr)";
    else gridSize = "grid-template-columns: repeat(8, 1fr)";

    cellsContainer.style = gridSize;

    // Create card elements
    numbers.forEach((number, index) => {
      const card = document.createElement("div");
      card.classList.add("cell");
      card.dataset.number = number;
      card.dataset.index = index;
      card.addEventListener("click", flipCard);
      cellsContainer.appendChild(card);
      cards.push(card);
    });
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.number;

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;
    attempts++;
    updateStats();

    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.number === secondCard.dataset.number;

    if (isMatch) {
      disableCards();
      matchesFound++;
      updateStats();

      if (matchesFound === totalPairs) {
        setTimeout(() => {
          alert(`Congratulations! You won in ${attempts} attempts!`);
        }, 500);
      }
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  function updateStats() {
    attemptsDisplay.textContent = attempts;
    matchesDisplay.textContent = matchesFound;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
