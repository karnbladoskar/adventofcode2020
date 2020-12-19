var fs = require("fs");
var readline = require("readline");

function readLocalTxt(path) {
  return new Promise((res, rej) => {
    try {
      let filestream = fs.createReadStream(path);
      let rl = readline.createInterface(filestream);

      let input = [];
      let tempRow = [];
      rl.on("line", (line) => {
        if (line.length > 0) {
          tempRow.push(line);
        } else {
          tempRow = tempRow.join(" ");
          let pattern = /(?<key>\w+)/;

          let keyList = [];
          tempRow.split(" ").forEach((el) => {
            let r = el.match(pattern).groups;
            keyList.push(r.key);
          });

          input.push(keyList);
          tempRow = [];
          keyList = [];
        }
      }).on("close", () => {
        res(input);
      });
    } catch (error) {
      rej(error);
    }
  });
}

readLocalTxt("./data.txt").then((res) => {
  let lookFor = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  let ctr = 0;
  res.forEach((el) => {
    const intersection = el.filter((element) => lookFor.includes(element));
    console.log(intersection);
    if (intersection.length === lookFor.length) {
      ctr += 1;
    }
  });
  console.log(ctr);
});
