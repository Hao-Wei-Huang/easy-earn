export default function (num) {
  const val = String(num);
  const pos = val.indexOf('.');
  let integer = '';
  let decimal = '';
  if (pos !== -1) {
    integer = val.slice(0, pos);
    decimal = val.slice(pos);
  } else {
    integer = val;
  }
  return integer.replace(/(\d)(?=(\d{3})+$)/g, '$1,') + decimal;
}
