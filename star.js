const { exec } = require('node:child_process');

const { randomPosition } = require("./random-position");

class BlinkingStar {
  #position
  #lifetime
  constructor(position, lifetime) {
    this.#position = position;
    this.#lifetime = lifetime;
  }

  getX() {
    return this.#position.column;
  }

  getY() {
    return this.#position.row;
  }

  update() {
    this.#lifetime--;
  }

  isAlive() {
    return this.#lifetime >= 0;
  }

  getState() {
    if (this.#lifetime <= 4) return "٭";
    if (this.#lifetime <= 8) return "✶";
    return "✸";
  }
}

const hideCursor = () => process.stdout.write('\u001B[?25l');

const playSound = (soundName) => exec(`afplay ./resources/sound/${soundName}`);

const playChimesSound = () => {
  exec('afplay ./resources/sound/chimes-7035.mp3');
}

const playChirpingSound = () => {
  exec('afplay ./resources/sound/chirping.wav');
}


const repeatWithDelay = (delay, callback) => {
  callback();
  setInterval(callback, delay);
}

const main = function () {
  repeatWithDelay(20000, () => playSound('chimes.mp3'));
  repeatWithDelay(61000, () => playSound('chirping.wav'));
  setTimeout(() => repeatWithDelay(10000, () => playSound('dog-bark.wav')), 5000);
  setTimeout(() => repeatWithDelay(10000, () => playSound('shooting-star.wav')), 6000)

  windowRow = process.stdout.rows;
  windowColumn = process.stdout.columns;

  let stars = [];
  hideCursor();
  setInterval(() => {
    console.clear();
    const starLocation = randomPosition(Math.floor(windowRow / 1), windowColumn);
    stars.push(new BlinkingStar(starLocation, Math.floor(Math.random() * 20)));
    const deadStars = stars.filter(star => !star.isAlive());
    deadStars.forEach(star => {
      process.stdout.cursorTo(star.getX(), star.getY());
      process.stdout.write(" ");
    })

    stars = stars.filter(star => star.isAlive());

    stars.forEach(star => {
      process.stdout.cursorTo(star.getX(), star.getY());
      process.stdout.write(star.getState());
      star.update();
    })
  }, 100)
};

main();

