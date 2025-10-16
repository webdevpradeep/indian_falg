// Get references to all the DOM elements we'll be working with
const hoistButton = document.getElementById('hoist-button');
const flag = document.getElementById('flag');
const message = document.getElementById('message');
const flowerContainer = document.getElementById('flower-container');
const guidance = document.getElementById('guidance');
const instructions = document.getElementById('instructions');

let isHoisted = false;

// Listen for a click on the hoist button
hoistButton.addEventListener('click', () => {
  if (isHoisted) return; // Prevent multiple clicks
  isHoisted = true;

  // Show the flag and start moving it up
  flag.style.display = 'block';

  // We use a short timeout to ensure the 'display' change is rendered before the transition starts
  setTimeout(() => {
    flag.style.bottom = 'calc(90vh - 110px)'; // Move to top of the pole
  }, 100);

  // Update guidance text and hide the button
  hoistButton.style.opacity = '0';
  hoistButton.style.pointerEvents = 'none';
  guidance.style.opacity = '1';
});

// Listen for the end of the hoisting animation (the 'transition')
flag.addEventListener('transitionend', () => {
  // Add the waving animation class
  flag.classList.add('waving');

  // Show the final message
  message.style.opacity = '1';

  // Hide the guidance text
  instructions.style.opacity = '0';

  // Start the flower shower
  startFlowerShower();
});

function startFlowerShower() {
  const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷'];
  setInterval(() => {
    createFlower(flowers);
  }, 200); // Create a new flower every 200ms
}

function createFlower(flowers) {
  const flower = document.createElement('div');
  flower.classList.add('flower');

  // Pick a random flower emoji
  flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

  // Randomize starting position, size, and animation duration
  flower.style.left = Math.random() * 100 + 'vw';
  flower.style.fontSize = Math.random() * 1.5 + 1 + 'rem'; // between 1rem and 2.5rem
  flower.style.animationDuration = Math.random() * 3 + 5 + 's'; // between 5s and 8s

  flowerContainer.appendChild(flower);

  // Clean up the DOM by removing the flower element after it falls
  setTimeout(() => {
    flower.remove();
  }, 8000); // Should be longer than the max animation duration
}
