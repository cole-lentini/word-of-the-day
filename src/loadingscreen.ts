export function createLoadingScreen(): HTMLElement {
  const overlay = document.createElement("div");
  overlay.id = "loading-screen";

  const container = document.createElement("div");
  container.className = "loader-container";

  // Loading text
  const text = document.createElement("div");
  text.className = "loading-text";
  text.textContent = "Loading word of the day";

  // Progress bar
  const barOuter = document.createElement("div");
  barOuter.className = "progress-bar";

  const barInner = document.createElement("div");
  barInner.className = "progress-fill";

  barOuter.appendChild(barInner);

  container.appendChild(text);
  container.appendChild(barOuter);
  overlay.appendChild(container);

  return overlay;
}

// Helper to animate progress
export function animateLoadingBar(
  bar: HTMLElement,
  duration: number,
  onDone?: () => void
) {
  let start: number | null = null;

  function step(t: number) {
    if (!start) start = t;

    const p = Math.min((t - start) / duration, 1);
    bar.style.width = `${p * 100}%`;

    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  }

  requestAnimationFrame(step);
}