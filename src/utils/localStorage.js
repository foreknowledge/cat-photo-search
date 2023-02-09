const LOCAL_STORAGE_KEYWORDS = 'keywords';

export function saveKeywords(keywords) {
  localStorage.setItem(LOCAL_STORAGE_KEYWORDS, keywords);
}

export function loadKeywords() {
  return localStorage.getItem(LOCAL_STORAGE_KEYWORDS);
}
