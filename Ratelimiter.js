class Ratelimiter {
  constructor () {
    this.tracked = []

    setInterval(() => {
      for (const x in this.tracked) {
        if (this.tracked[x] > 0) this.tracked[x]--
      }
    }, 3000)
  }

  check (message) {
    if (!(message.author.id in this.tracked)) {
      this.tracked[message.author.id] = 0
    }
    this.tracked[message.author.id]++
    if (this.tracked[message.author.id] > 2) return this.tracked[message.author.id]
    return true
  }
}

module.exports = Ratelimiter
