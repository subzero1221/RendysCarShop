export function cleanQueryString(urlEncodedStr) {
  const decodedStr = decodeURIComponent(urlEncodedStr);

  const pairs = decodedStr.split("&");

  const cleanedPairs = pairs
    .map((pair) => {
      const [key, value] = pair.split("=");
      return key && value !== undefined ? `${key}=${value}` : null;
    })
    .filter(Boolean)
    .join("&");

  return cleanedPairs;
}
