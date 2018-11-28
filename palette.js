class Palette {
  constructor(num) {
    for (let i = 1; i < num + 1; i++) {
      this[`hex${i}`] = this.randomColor();
    }
  }

  randomColor() {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += this.randomHex();
    }
    return color;
  }

  randomHex() {
    const hex = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']
    return hex[Math.floor(Math.random() * 16)]
  }
}

module.exports = Palette;
