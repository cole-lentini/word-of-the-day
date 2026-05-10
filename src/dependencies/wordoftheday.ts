import { createChangeWordButton } from "./changewordoftheday";

export function createWordPage(word: string, definition: string): HTMLElement {
  const container = document.createElement("div");
  container.className = "word-page";

  const label = document.createElement("div");
  label.className = "word-label";
  label.textContent = "Your word of the day is...";

  const wordEl = document.createElement("div");
  wordEl.className = "word-text";
  wordEl.textContent = word;

  const defEl = document.createElement("div");
  defEl.className = "word-definition";
  defEl.textContent = definition;

  const changeWordButton = createChangeWordButton();

  container.appendChild(label);
  container.appendChild(wordEl);
  container.appendChild(defEl);
  container.appendChild(changeWordButton);

  return container;
}