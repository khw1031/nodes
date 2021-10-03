const fs = require("fs");

// fs.writeFileSync("nodes.txt", "My name is kim");

try {
  fs.appendFileSync("nodes.txt", "Hello world!");
} catch (err) {
  console.error(err);
}
