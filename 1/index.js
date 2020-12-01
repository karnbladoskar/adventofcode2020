var fs = require("fs");
var readline = require("readline");

function readLocalTxt(path) {
  return new Promise((res, rej) => {
    try {
      let filestream = fs.createReadStream(path);
      let rl = readline.createInterface(filestream);

      let input = [];
      rl.on("line", (line) => {
        let intline = parseInt(line);
        input.push(intline);
      }).on("close", () => {
        res(input);
      });
    } catch (error) {
      rej(error);
    }
  });
}

readLocalTxt("./data.txt").then((res) => {
  console.log(res);
});
