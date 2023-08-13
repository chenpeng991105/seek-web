// 格式化时间戳
export const formatTimestamp = (timestamp) => {
	const date = new Date(parseInt(timestamp));
	const Year = date.getFullYear();
	const Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	const Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
	const Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
	const Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	const Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	const GMT =  Year + '-' + Moth + '-' + Day + '   '+ Hour +':'+ Minute  + ':' + Sechond;
	return GMT;
}

// 获取当前设备类型
export const getDeviceType = () => {
	const { platform } = uni.getSystemInfoSync();
	const platformMap = {
		android: 1,
		iod: 2,
		windows: 3,
		mac: 4
	};
	return platformMap[platform] || 5;
}

// 仿微信时间描述
export function getWxTimeMemo(date) {
  var pointParams = parseTimeAllParams(date)
  var anchorParams = parseTimeAllParams(new Date())
  var anchorTimestamp = anchorParams.timestamp
  var pointTimestamp = pointParams.timestamp
  var anchorYear = anchorParams.y
  var pointYear = pointParams.y

  // 仿微信消息时间描述 按条件顺序进行判定，满足条件即返回
  // 今天 / 昨天 [凌晨（0-5）/ 上午 （6-11） / 下午 （12 - 23）] 6:00
  // 7天内 星期几 星期一
  // 今年 x月xx号
  // 更早 xxxx年 x月xx日
  var condition = [
    { timestamp: anchorTimestamp + 3600 * 1000 * 12, format: '{h}:{i}' }, // 今天下午
    { timestamp: anchorTimestamp + 3600 * 1000 * 6, format: '{h}:{i}' }, // 今天上午
    { timestamp: anchorTimestamp, format: '{h}:{i}' }, // 今天凌晨
    { timestamp: anchorTimestamp - 3600 * 1000 * 12, format: '昨天 {h}:{i}' }, // 昨天下午
    { timestamp: anchorTimestamp - 3600 * 1000 * 18, format: '昨天 {h}:{i}' }, // 昨天上午
    { timestamp: anchorTimestamp - 3600 * 1000 * 24, format: '昨天 {h}:{i}' }, // 昨天凌晨
    { timestamp: anchorTimestamp - 3600 * 1000 * 24 * 6, format: '星期{a} {h}:{i}' }, // 7天内
    { timestamp: pointYear - anchorYear === 0, format: '{m}月{d}日 {h}:{i}' }, // 今年(为0时表示今年)
    { timestamp: pointYear - anchorYear < 0, format: '{y}年{m}月{d}日 {h}:{i}' } // 更早
  ]
  for (var i = 0; i < condition.length; i++) {
    if (typeof condition[i].timestamp === 'number') {
      if (pointTimestamp >= condition[i].timestamp) {
        return parseTimeAllParams(pointParams.time, condition[i].format).strTime
      }
    } else {
      if (condition[i].timestamp) {
        return parseTimeAllParams(pointParams.time, condition[i].format).strTime
      }
    }
  }
  return parseTimeAllParams(pointParams.time, '{y}年{m}月{d}日').strTime
}

function parseTimeAllParams(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return {
    strTime: time_str, ...formatObj, a: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()], timestamp: date.getTime(), time: date
  }
}

// 格式化秒显示(1100 -> 18:20)
export const formatSecond = (second) => {
	const m = Math.floor(second / 60);
	let s = second - m * 60;
	s = s < 10 ? '0' + s : s;
	return `${m}:${s}s`;
};
