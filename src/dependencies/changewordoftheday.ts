import { getValidWordAndDefinition } from './api.ts';
import { createWordPage } from './wordoftheday.ts';
import { saveWord } from './cache.ts';

export function createChangeWordButton(): HTMLElement {
  const changeWordButton = document.createElement("button");
  changeWordButton.className = "change-word-btn";
  changeWordButton.textContent = "CHANGE WORD";

    changeWordButton.addEventListener("click", e => {
        if (e.target === changeWordButton) {
            changeWord();
        }
    });

  return changeWordButton;
}

async function changeWord() {
    const app = document.getElementById('app')!;

    try {
        const { word, definition } = await getValidWordAndDefinition();

        saveWord(word, definition);
    
        if (app) {
            while (app.firstChild) {
                app.removeChild(app.firstChild);
            }
        }

        app.appendChild(createWordPage(word, definition));
    
      } catch (e) {
        app.innerHTML = `<p>Failed to load word</p>`;
      }
}