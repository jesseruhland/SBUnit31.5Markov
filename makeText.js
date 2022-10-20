/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");
const argv = process.argv.slice(2);
const type = argv[0];
const path = argv[1];

function generateText(type, path) {
  if (type == "file") {
    readFromFile(path);
  } else if (type == "url") {
    readFromWeb(path);
  } else {
    console.log(
      "Error, invalid file type indicated.  Please enter 'file' or 'url' before the file path."
    );
    process.exit(1);
  }
}

function readFromFile(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error: ", err);
      process.exit(1);
    } else {
      processData(data);
    }
  });
}

async function readFromWeb(path) {
  try {
    const resp = await axios.get(path);
    processData(resp.data);
  } catch (e) {
    console.log(`Error: ${e}`);
    process.exit(1);
  }
}

function processData(data) {
  let mm = new MarkovMachine(data);
  return mm.makeText();
}

generateText(type, path);
