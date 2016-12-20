class Ratelimiter {
  constructor () {
    this.tracked = [];

    setInterval(() => {
      for (const x in this.tracked) {
        if (this.tracked[x] > 0) this.tracked[x]--;
      }
    }, 1e3);
  }

  check (message) {
    if (!(message.author.id in this.tracked)) {
      this.tracked[message.author.id] = 0;
    }
    this.tracked[message.author.id]++;
    if (this.tracked[message.author.id] > 5) return this.tracked[message.author.id];
    return true;
  }
}

module.exports = Ratelimiter;
