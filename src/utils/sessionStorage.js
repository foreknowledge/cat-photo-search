export function saveSessionStorage(key, keywords) {
  sessionStorage.setItem(key, keywords);
}

export function loadSessionStorage(key) {
  return sessionStorage.getItem(key);
}
