// Get elements from the HTML, mainly the garden box
const garden = document.getElementById('garden');
const submitButton = document.getElementById('submit-button');

// Define grid dimensions, can be changed but requires changing the grid-cols in the TailwindCSS
const rows = 5;
const cols = 5;
const gardenImage = 'garden_image.jpg'; // Getting the garden image from the files

// Track user clicks
let clickCount = 0;

// Toggle the "lit" state of a specific box
function toggleBox(row, col) {
    const box = document.querySelector(`.box[data-row='${row}'][data-col='${col}']`);
    if (box) box.classList.toggle('lit');
}

// Generate the grid dynamically using nested loops
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        // Create box and set styling
        const box = document.createElement('div');
        box.className = 'box w-24 h-24 border border-gray-300';
        box.dataset.row = row;
        box.dataset.col = col;

        // Set garden image as background
        box.style.backgroundImage = `url(${gardenImage})`;
        box.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
        box.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;

        // Add click event to toggle the box and its neighbors
        box.addEventListener('click', () => {
            clickCount++;
            toggleBox(row, col);         // Current box
            toggleBox(row - 1, col);     // Top neighbor
            toggleBox(row + 1, col);     // Bottom neighbor
            toggleBox(row, col - 1);     // Left neighbor
            toggleBox(row, col + 1);     // Right neighbor
        });

        // Append box to the garden container
        garden.appendChild(box);
    }
}

// Check if all boxes are lit
function checkAllBoxesLit() {
    return Array.from(document.querySelectorAll('.box')).every(box => box.classList.contains('lit'));
}

// Check and update button based on number of lit boxes from the previous function
submitButton.addEventListener('click', () => {
    if (checkAllBoxesLit()) {
        submitButton.classList.remove('bg-slate-500', 'bg-red-500');
        submitButton.classList.add('bg-amber-500');
        submitButton.textContent = `All Boxes Lit in ${clickCount} Moves!`;
    } else {
        submitButton.classList.remove('bg-slate-500', 'bg-green-500');
        submitButton.classList.add('bg-red-500');
        submitButton.textContent = `Not All Boxes Lit! Moves: ${clickCount}`;
    }
});
