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

// PART 1:
// readLocalTxt("./data.txt").then((res) => {
//   let Y = 2020;
//   let rest = 0;

//   res.forEach((el, idx) => {
//     rest = Y - el;
//     let X = res.slice(idx);

//     if (X.includes(rest)) {
//       console.log(rest, el, rest * el);
//       return;
//     }
//   });
// });

// PART 2:
readLocalTxt("./data.txt").then((res) => {
  let Y = 2020;
  let rest = 0;

  res.forEach((el1, idx1) => {
    let X = res.slice(idx1);

    X.forEach((el2, idx2) => {
      //   console.log("INDEX 1: ", idx1, " INDEX 2: ", idx2);
      let Z = X.slice(idx2);

      rest = Y - el1 - el2;
      if (Z.includes(rest) && (el1 !== el2) !== rest) {
        console.log(rest, el1, el2, rest * el1 * el2);
        return;
      }
    });
  });
});
