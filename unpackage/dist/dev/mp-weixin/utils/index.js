"use strict";
const common_vendor = require("../common/vendor.js");
const formatTimestamp = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const Year = date.getFullYear();
  const Moth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const Day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const Hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const Minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const Sechond = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const GMT = Year + "-" + Moth + "-" + Day + "   " + Hour + ":" + Minute + ":" + Sechond;
  return GMT;
};
const getDeviceType = () => {
  const { platform } = common_vendor.index.getSystemInfoSync();
  const platformMap = {
    android: 1,
    iod: 2,
    windows: 3,
    mac: 4
  };
  return platformMap[platform] || 5;
};
function getWxTimeMemo(date) {
  var pointParams = parseTimeAllParams(date);
  var anchorParams = parseTimeAllParams(/* @__PURE__ */ new Date());
  var anchorTimestamp = anchorParams.timestamp;
  var pointTimestamp = pointParams.timestamp;
  var anchorYear = anchorParams.y;
  var pointYear = pointParams.y;
  var condition = [
    { timestamp: anchorTimestamp + 3600 * 1e3 * 12, format: "{h}:{i}" },
    // 今天下午
    { timestamp: anchorTimestamp + 3600 * 1e3 * 6, format: "{h}:{i}" },
    // 今天上午
    { timestamp: anchorTimestamp, format: "{h}:{i}" },
    // 今天凌晨
    { timestamp: anchorTimestamp - 3600 * 1e3 * 12, format: "昨天 {h}:{i}" },
    // 昨天下午
    { timestamp: anchorTimestamp - 3600 * 1e3 * 18, format: "昨天 {h}:{i}" },
    // 昨天上午
    { timestamp: anchorTimestamp - 3600 * 1e3 * 24, format: "昨天 {h}:{i}" },
    // 昨天凌晨
    { timestamp: anchorTimestamp - 3600 * 1e3 * 24 * 6, format: "星期{a} {h}:{i}" },
    // 7天内
    { timestamp: pointYear - anchorYear === 0, format: "{m}月{d}日 {h}:{i}" },
    // 今年(为0时表示今年)
    { timestamp: pointYear - anchorYear < 0, format: "{y}年{m}月{d}日 {h}:{i}" }
    // 更早
  ];
  for (var i = 0; i < condition.length; i++) {
    if (typeof condition[i].timestamp === "number") {
      if (pointTimestamp >= condition[i].timestamp) {
        return parseTimeAllParams(pointParams.time, condition[i].format).strTime;
      }
    } else {
      if (condition[i].timestamp) {
        return parseTimeAllParams(pointParams.time, condition[i].format).strTime;
      }
    }
  }
  return parseTimeAllParams(pointParams.time, "{y}年{m}月{d}日").strTime;
}
function parseTimeAllParams(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1e3;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return {
    strTime: time_str,
    ...formatObj,
    a: ["日", "一", "二", "三", "四", "五", "六"][date.getDay()],
    timestamp: date.getTime(),
    time: date
  };
}
const formatSecond = (second) => {
  const m = Math.floor(second / 60);
  let s = second - m * 60;
  s = s < 10 ? "0" + s : s;
  return `${m}:${s}s`;
};
exports.formatSecond = formatSecond;
exports.formatTimestamp = formatTimestamp;
exports.getDeviceType = getDeviceType;
exports.getWxTimeMemo = getWxTimeMemo;
