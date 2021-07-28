export default function (num) {
  let val = String(Math.round(num * 100) / 100);
  let decimalpos = val.indexOf('.');
  if (decimalpos === -1) {
    decimalpos = val.length;
    val += '.';
  }

  while (val.length <= decimalpos + 2) {
    val += '0';
  }

  return val;
}
