import Vue from 'vue';

Vue.filter('time', (value, type) => {
  if (value) {
    const time = new Date(parseInt(value, 10));

    const year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    if (type === 'full') {
      return (
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      );
    } else if (type === 'hms') {
      return hour + ':' + minute + ':' + second;
    } else {
      return year + '-' + month + '-' + date;
    }
  } else {
    return '';
  }
});
