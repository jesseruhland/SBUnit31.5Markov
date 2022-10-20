const { MarkovMachine } = require("./markov");

describe("MarkovMachine class tests", function () {
  let mm;
  beforeAll(function () {
    mm = new MarkovMachine("the cat in the hat");
  });
  test("new MarkovMachine() should create an instance of MarkovMachine", function () {
    expect(mm).toBeInstanceOf(MarkovMachine);
  });
  test("MarkovMachine should create an array of words", function () {
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });
  test("MarkovMachine should create possible chains", function () {
    // let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [null],
    });
  });
  test("MarkovMachine.makeText should create random text not longer than input wordcount", function () {
    const str = mm.makeText(5);
    const strArr = str.split(" ");

    expect(strArr.length).toBeLessThanOrEqual(5);
    expect(typeof str).toEqual("string");
  });
});
