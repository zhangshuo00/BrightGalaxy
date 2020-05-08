const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth() +1
  const day = date.getDate()
  var time={year:year,month:month,day:day}

  // return year+' 年 '+month+' 月 '+day+' 日 '
  return time;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate
}
