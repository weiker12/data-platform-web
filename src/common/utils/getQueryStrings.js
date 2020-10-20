export default function getQueryStrings() {
  let data = {};
  let parameter =
    window.location.search.length > 0 ? window.location.search.substring(1) : 0;
  if (parameter != 0) {
    let arg = parameter.split('&');
    for (let i = 0; i < arg.length; i++) {
      let name = decodeURIComponent(arg[i].split('=')[0]);
      let value = decodeURIComponent(arg[i].split('=')[1]);
      data[name] = value;
    }
  } else {
    data = null;
  }
  return data;
}
