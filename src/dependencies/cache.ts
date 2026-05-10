function getTodayKey(): string {
  return new Date().toISOString().split("T")[0]; // "2026-01-24"
}

export function getCachedWord() {
  const key = getTodayKey();
  const stored = localStorage.getItem("wordOfTheDay");

  if (!stored) return null;

  const data = JSON.parse(stored);

  if (data.date !== key) return null;

  return data;
}

export function saveWord(word: string, definition: string) {
  const key = getTodayKey();

  localStorage.setItem(
    "wordOfTheDay",
    JSON.stringify({
      date: key,
      word,
      definition
    })
  );
}