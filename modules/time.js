/*
  输入miliseconds
  输出{
    hours: "05",
    minutes: "59",
    seconds: "47"
  }
*/
function durationFormat(miliseconds) {
  let totalSecs = Math.floor(miliseconds / 1000)

  let hourStr = "", minStr = "", secStr = ""
  let hour = Math.floor(totalSecs / 3600)
  let remainSecs = Math.floor(totalSecs % 3600)
  let min = Math.floor(remainSecs / 60)
  let sec = Math.floor(remainSecs % 60)

  hourStr = hour > 9 ? "" + hour : "0" + hour
  minStr = min > 9 ? "" + min : "0" + min
  secStr = sec > 9 ? "" + sec : "0" + sec
  
  return {
    hours: hourStr,
    minutes: minStr,
    seconds: secStr
  }
}

/*
  输入miliseconds
  输出"YYYY-MM-DD HH:ii:ss"
*/

function timeFormat(timeStamp) {
  let date = new Date(timeStamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
    D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ',
    h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':',
    // m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':',
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() + '' : date.getMinutes() + '',
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() + '' : date.getSeconds() + ''
    // return Y + M + D + h + m + s
    return M + D + h + m
}

function isToday(timeStamp) {
  return new Date(timeStamp).toDateString() === new Date().toDateString()
}

exports.durationFormat = durationFormat
exports.timeFormat = timeFormat
exports.isToday = isToday