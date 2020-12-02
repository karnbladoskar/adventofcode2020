var fs = require("fs");
var readline = require("readline");

function readLocalTxt(path) {
  return new Promise((res, rej) => {
    try {
      let filestream = fs.createReadStream(path);
      let rl = readline.createInterface(filestream);

      // prettier-ignore
      let pattern = /(?<min>\d+)-(?<max>\d+)\s(?<query>\w):\s(?<test>\w+)/
      let input = [];
      rl.on("line", (line) => {
        let res = line.match(pattern).groups;
        res.min = parseInt(res.min);
        res.max = parseInt(res.max);

        input.push(res);
      }).on("close", () => {
        res(input);
      });
    } catch (error) {
      rej(error);
    }
  });
}

// PART 1
// readLocalTxt("./data.txt").then((res) => {
//   let counter = 0;
//   res.forEach((el) => {
//     let testCount = el.test.split("").filter((x) => x == el.query).length;

//     if (testCount >= el.min && testCount <= el.max) {
//       counter += 1;
//     }
//   });
//   console.log(counter);
// });

// PART 2
readLocalTxt("./data.txt").then((res) => {
  let counter = 0;
  res.forEach((el) => {
    let testArray = el.test.split("");

    if (
      (testArray[el.min - 1] == el.query &&
        testArray[el.max - 1] != el.query) ||
      (testArray[el.min - 1] != el.query && testArray[el.max - 1] == el.query)
    ) {
      counter += 1;
    }
  });
  console.log(counter);
});
