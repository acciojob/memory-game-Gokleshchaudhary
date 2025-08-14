export default class Game {
  constructor(container, pairs) {
    this.container = container;
    this.pairsCount = pairs;
    this.tiles = [];
    this.flipped = [];
    this.matchedPairs = 0;
    this.attempts = 0;
    this.render();
  }

  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  render() {
    const numbers = [];
    for (let i = 1; i <= this.pairsCount; i++) {
      numbers.push(i, i);
    }
    const shuffled = this.shuffle(numbers);
    this.container.innerHTML = "";
    shuffled.forEach((num) => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.value = num;
      tile.textContent = "?";
      tile.addEventListener("click", () => this.flipTile(tile));
      this.container.appendChild(tile);
    });
  }

  flipTile(tile) {
    if (this.flipped.length === 2 || tile.classList.contains("matched")) return;
    tile.textContent = tile.dataset.value;
    this.flipped.push(tile);

    if (this.flipped.length === 2) {
      this.attempts++;
      const [first, second] = this.flipped;
      if (first.dataset.value === second.dataset.value) {
        first.classList.add("matched");
        second.classList.add("matched");
        this.matchedPairs++;
        if (this.matchedPairs === this.pairsCount) {
          setTimeout(
            () => alert(`🎉 You won in ${this.attempts} attempts!`),
            300
          );
        }
      } else {
        setTimeout(() => {
          first.textContent = "?";
          second.textContent = "?";
        }, 800);
      }
      this.flipped = [];
    }
  }
}
