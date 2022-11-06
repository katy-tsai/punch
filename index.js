const dayjs = require("dayjs");
const { promises: fs } = require("fs");
const path = require("path");
// const notifier = require("node-notifier");
// const remote = require("electron").remote;

const today_time = document.querySelector("#today_time");
const file_path = path.join(
  process.env.HOME,
  "Library",
  "Application Support",
  "Punch",
  "punchTime.txt"
);

//寫當下日期
let now = dayjs().format("YYYY-MM-DD HH:mm:ss") + "\r\n";
function groupBy(list, keyGetter) {
  return list.reduce((pre, cur) => {
    const key = keyGetter(cur);
    let collection = pre[key];

    if (!collection) {
      collection = [cur];
    } else {
      collection = [...collection, cur];
    }
    return { ...pre, [key]: collection };
  }, {});
}
const getPunchInTime = async () => {
  await fs.appendFile(file_path, now);
  let data = await fs.readFile(file_path, "utf8");
  let punchTimes = data?.split("\r\n") || [];
  punchTimes = punchTimes.filter(Boolean);
  console.log("punchTims=>", punchTimes);
  //取得今天最早日期
  let punchMaps = groupBy(punchTimes, (d) => dayjs(d).format("YYYY-MM-DD"));
  let todayPunchs = punchMaps[dayjs().format("YYYY-MM-DD")];
  todayPunchs = todayPunchs.sort();
  let [punch] = todayPunchs;
  console.log("punch=>", punch);
  console.log("today_time", today_time);

  today_time.innerHTML = punch;

  return punch;
};
// fs.appendFile("punchTime.txt", now, (err) => {
//   if (err) {
//     console.log("write err", err);
//   } else {
//     let data = fs.readFileSync("punchTime.txt", "utf8");
//     console.log("data=>", data);
//   }
// });
getPunchInTime();
