export function queryParamGenerator(queryParamObj = {}) {
  const list = Object.keys(queryParamObj).map((key) => `${key}=${queryParamObj[key]}`);
  if (list.length) return `?${list.join('&')}`;
  return '';
}
export function AddQueryParamToUrl(url, queryParamObj) {
  return url + queryParamGenerator(queryParamObj);
}
