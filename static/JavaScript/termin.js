const buttons = document.querySelectorAll('.duration-button');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		buttons.forEach((btn) => btn.classList.remove('active'));
		button.classList.add('active');
	});
});

// Optional: Add functionality to scroll through buttons using arrows
leftArrow.addEventListener('click', () => {
	// Scroll left logic here
});

rightArrow.addEventListener('click', () => {
	// Scroll right logic here
});

const currentMonthDisplay = document.getElementById('monthYear'); // Month-Year display
const daysContainer = document.getElementById('calendarDays'); // Days container
let currentDate = new Date();
let selectedDate = null; // To keep track of the selected date

function generateCalendar() {
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();

	// Set the current month display
	currentMonthDisplay.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

	// Clear the previous calendar days
	daysContainer.innerHTML = '';

	// Get the first day of the month
	const firstDay = new Date(year, month, 1).getDay();

	// Get the last day of the month
	const lastDate = new Date(year, month + 1, 0).getDate();

	// Generate empty days for the first week
	for (let i = 0; i < firstDay; i++) {
		const emptyCell = document.createElement('div');
		emptyCell.classList.add('day', 'disabled');
		daysContainer.appendChild(emptyCell);
	}

	// Generate the days of the month
	for (let day = 1; day <= lastDate; day++) {
		const dayCell = document.createElement('div');
		dayCell.classList.add('day');
		dayCell.textContent = day;

		// Highlight the current day
		if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
			dayCell.classList.add('today');
		}

		// Add click event listener for date selection
		dayCell.addEventListener('click', () => selectDate(year, month, day));

		daysContainer.appendChild(dayCell);
	}
}

// Function to handle date selection
function selectDate(year, month, day) {
	// Clear previous selection
	const previouslySelected = document.querySelector('.day.selected');
	if (previouslySelected) {
		previouslySelected.classList.remove('selected');
	}

	// Highlight the selected day
	const selectedDayCell = [...daysContainer.children].find(cell => cell.textContent == day && !cell.classList.contains('disabled'));
	if (selectedDayCell) {
		selectedDayCell.classList.add('selected');
	}

	// Store the selected date
	selectedDate = new Date(year, month, day);

	// Display the selected date (optional)
	console.log('Selected date:', selectedDate.toDateString());
}

// Change month when user clicks prev/next
function changeMonth(offset) {
	currentDate.setMonth(currentDate.getMonth() + offset);
	generateCalendar();
}

// Add event listeners to navigation buttons
document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

// Initialize the calendar on page load
generateCalendar();

// Initialize intl-tel-input
const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
	initialCountry: "auto", // Automatically select the country based on user's IP
	geoIpLookup: function (callback) {
		fetch('https://ipinfo.io', { method: 'GET' })
			.then(response => response.json())
			.then(data => callback(data.country))
			.catch(() => callback("us"));
	},
	utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js" // For formatting and validation
});

document.querySelector("#reservationForm").addEventListener("submit", function(event) {
    if (!iti.isValidNumber()) {
        alert("Please enter a valid phone number.");
        event.preventDefault();  // Prevent form submission
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const homeSize = document.getElementById('home-size').value;

        if (!name || !email || !phone || !homeSize) {
            alert('Please fill out all fields!');
            return;
        }

        console.log('Form Submitted:', { name, email, phone, homeSize });

        fetch('https://example.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, homeSize }),
        })
        .then(response => response.ok ? alert('Form submitted successfully!') : alert('Submission failed.'))
        .catch(error => alert('Error:', error));
    });
});
