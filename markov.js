/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    this.chains = {};
    for (let word in this.words) {
      const nextIndex = parseInt(word) + 1;
      const followingWord = this.words[nextIndex];
      if (followingWord) {
        if (this.chains[this.words[word]]) {
          this.chains[this.words[word]].push(followingWord);
        } else {
          this.chains[this.words[word]] = [followingWord];
        }
      } else {
        this.chains[this.words[word]] = [null];
      }
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const start = Math.floor(Math.random() * this.words.length);
    let result = [];
    result.push(this.words[start]);

    for (let i = 0; i < numWords - 1; i++) {
      const choices = this.chains[result[i]];
      const nextIndex = Math.floor(Math.random() * choices.length);
      if (choices[nextIndex] != null) {
        result.push(choices[nextIndex]);
      } else {
        break;
      }
    }

    const finalStr = result.join(" ");

    console.log(finalStr);
    return finalStr;
  }
}

module.exports = { MarkovMachine };
