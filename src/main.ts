import './style.css';
import { createLoadingScreen, animateLoadingBar } from './loadingscreen.ts';
import { getValidWordAndDefinition } from './dependencies/api.ts';
import { createWordPage } from './dependencies/wordoftheday.ts';
import { getCachedWord, saveWord } from './dependencies/cache.ts';

const app = document.getElementById('app')!;

// Create loading screen
const loadingScreen = createLoadingScreen();
document.body.appendChild(loadingScreen);

// Grab progress bar
const progressFill = loadingScreen.querySelector('.progress-fill') as HTMLElement;

const cached = getCachedWord();

async function run() {
  try {
    let word: string;
    let definition: string;

    if (cached) {
      word = cached.word;
      definition = cached.definition;
    } else {
      const { word, definition } = await getValidWordAndDefinition();

      saveWord(word, definition);
    }

    animateLoadingBar(progressFill, 3000, () => {
      loadingScreen.classList.add("fade-out");

      setTimeout(() => {
        loadingScreen.remove();
        app.appendChild(createWordPage(word, definition));
      }, 300);
    });

  } catch (e) {
    loadingScreen.remove();
    app.innerHTML = `<p>Failed to load word</p>`;
  }
}

run();