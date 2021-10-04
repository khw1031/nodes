const fs = require("fs");
const path = require("path");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);

// fs.writeFileSync(path.join(__dirname, "1-json.json"), bookJSON);

// const dataBuffer = fs.readFileSync(path.join(__dirname, "1-json.json"));
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);

// console.log(data.title);

const dataBuffer = fs.readFileSync(path.join(__dirname, "1-json.json"));
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = "Kim";
data.age = "35";

const newDataJSON = JSON.stringify(data);

fs.writeFileSync(path.join(__dirname, "2-json.json"), newDataJSON);
