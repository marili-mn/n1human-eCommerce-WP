import { N1Navbar } from './components/N1Navbar.js';
import { N1Footer } from './components/N1Footer.js';

// Slow down the background video for a more subtle experience
function initVideo() {
  const video = document.querySelector('.section-a video');
  if (video) {
    video.playbackRate = 0.420; // Perfect pace for the brand's aesthetic
  }
}

// Count Up Animation Logic
function countUp() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const c = +counter.innerText;
      const increment = target / 200;

      if (c < target) {
        counter.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initVideo();
  countUp();
});
