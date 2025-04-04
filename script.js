// Select all checkboxes and the counter display
const checkboxes = document.querySelectorAll('.form-check-input');
const countDisplay = document.getElementById('checked-count');

// Function to update count
function updateCount() {
    const checkedCount = document.querySelectorAll('.form-check-input:checked').length;
    const imgElement = document.getElementById('cat-image');
    if (checkedCount >= 12) {
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                const catImage = data[0].url;
                imgElement.src = catImage;
                imgElement.style.display = 'block'; // Show image
            })
        countDisplay.innerHTML = `SUCCESS! You have implemented ${checkedCount} out of 15 best coding practices! Keep going! 🎯`;
        countDisplay.style.backgroundColor = 'green';
    }
    else {
        imgElement.style.display = 'none'; // Hide image
        countDisplay.style.backgroundColor = '#231942'
        countDisplay.innerHTML = `${checkedCount} out of 15 is selected`;
    }
}

// Add event listeners to all checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCount);
});

// Function to save checkbox states in local storage
function saveCheckboxState() {
    // Loop through all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxStates = {};

    checkboxes.forEach((checkbox, index) => {
        checkboxStates[`checkbox_${index + 1}`] = checkbox.checked;
    });

    // Save the states to localStorage
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

// Function to load checkbox states from local storage
function loadCheckboxState() {
    const storedStates = localStorage.getItem('checkboxStates');

    if (storedStates) {
        const checkboxStates = JSON.parse(storedStates);

        // Loop through all checkboxes and update their checked status
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            const state = checkboxStates[`checkbox_${index + 1}`];
            if (state !== undefined) {
                checkbox.checked = state;
            }
        });
    }
}

// Event listener to save state whenever a checkbox is checked or unchecked
document.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        saveCheckboxState();
    }
});

// Load the checkbox states when the page loads
window.addEventListener('load', loadCheckboxState);

// Update count on page load
window.addEventListener('load', updateCount);

// Update count whenever a checkbox is checked or unchecked
document.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
        saveCheckboxState();
        updateCount();
    }
});


