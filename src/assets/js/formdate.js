export function format(shijianchuo) {
  let time = new Date(shijianchuo * 1000);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function add0(m) {
  return m < 10 ? '0' + m : m
}
