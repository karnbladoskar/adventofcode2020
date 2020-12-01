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
  let Y = 2020;
  let rest = 0;

  res.forEach((el, idx) => {
    rest = Y - el;
    let X = res.slice(idx);

    if (X.includes(rest)) {
      console.log(rest, el, rest * el);
      return;
    }
  });
});
