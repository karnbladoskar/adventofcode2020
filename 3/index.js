var fs = require("fs");
var readline = require("readline");

function readLocalTxt(path) {
  return new Promise((res, rej) => {
    try {
      let filestream = fs.createReadStream(path);
      let rl = readline.createInterface(filestream);

      let input = [];
      rl.on("line", (line) => {
        let chars = line.split("");
        input.push(chars);
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
//   let HORZ_STEP = 1;
//   let MAX_X = res[0].length - 1;

//   let IDX_X = 1;

//   let ctr = 0;
//   let SKIP_NEXT_ROW = false;
//   res.forEach((row, idx) => {
//     if (idx === 0) return;

//     if (SKIP_NEXT_ROW) {
//       SKIP_NEXT_ROW = false;
//       return;
//     }
//     if (row[IDX_X] === "#") {
//       ctr++;
//     }
//     IDX_X += HORZ_STEP;
//     if (IDX_X > MAX_X) {
//       IDX_X = IDX_X - MAX_X - 1;
//       // console.log("IDX", IDX_X);
//       // SKIP_NEXT_ROW = true;
//     }
//   });
//   console.log(ctr);
// });

// PART 2:
readLocalTxt("./data.txt").then((res) => {
  let MAX_X = res[0].length - 1;

  let CTR = 1;
  [
    { X: 1, Y: 1 },
    { X: 3, Y: 1 },
    { X: 5, Y: 1 },
    { X: 7, Y: 1 },
    { X: 1, Y: 2 },
  ].forEach(({ X, Y }) => {
    let IDX_X = X;

    let ctr = 0;
    res.forEach((row, idx) => {
      if (idx % Y === 0) {
        if (idx === 0) return;

        if (row[IDX_X] === "#") {
          ctr++;
        }
        IDX_X += X;
        if (IDX_X > MAX_X) {
          IDX_X = IDX_X - MAX_X - 1;
        }
      }
    });

    CTR *= ctr;
  });
  console.log(CTR);
});
