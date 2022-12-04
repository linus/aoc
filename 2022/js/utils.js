export function* chunkArray(array, chunkSize) {
  for (let i = 0, l = array.length; i < l; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      yield chunk;
  }
}
