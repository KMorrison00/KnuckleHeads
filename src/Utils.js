
export function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

export function random() {
  return Array.from(Array(8), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
};