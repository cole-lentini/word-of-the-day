import pluralize from 'pluralize';

export async function getRandomWord(retries = 3): Promise<string> {
  try {
    const res = await fetch(
      "https://random-words-api.kushcreates.com/api?language=en&firstletter=" + getRandomLetter()
    )

    if (!res.ok) throw new Error("bad response");

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("empty response");
    }

    return data[Math.floor(Math.random() * data.length)].word;

  } catch (err) {
    if (retries > 0) {
      return getRandomWord(retries - 1);
    }
    throw err
  }
}

export function getRandomLetter(): string {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[Math.floor(Math.random() * letters.length)];
}

export async function getDefinition(word: string): Promise<string> {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  )

  if (!res.ok) {
    throw new Error("Failed to fetch definition");
  }

  const data = await res.json();

  const definition = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;

  if (!definition) {
    throw new Error("No valid definition");
  }

  return definition;
}

export async function getValidWordAndDefinition(): Promise<{
  word: string
  definition: string
}> {

  const app = document.getElementById('app')!

  while (true) {
    try {
      let word = await getRandomWord();

      if (pluralize.isPlural(word)) {
        word = word.slice(0, -1);
      }

      const definition = await getDefinition(word);

      return { word, definition };

    } catch {
      // silently retry
      continue;
    }
  }
}