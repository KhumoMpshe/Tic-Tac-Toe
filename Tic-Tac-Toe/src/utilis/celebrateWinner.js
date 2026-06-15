import confetti from "canvas-confetti";

export function celebrateWinner() {
  const colors = ["#ff6b9d", "#6ecf6e", "#ffd93d", "#6bcbff", "#c084fc"];

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.55 },
    colors,
  });

  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.65 },
      colors,
    });

    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.65 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
