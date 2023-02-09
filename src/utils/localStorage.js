export function saveLocalStorage(key, keywords) {
  localStorage.setItem(key, keywords);
}

export function loadLocalStorage(key) {
  return localStorage.getItem(key);
}
