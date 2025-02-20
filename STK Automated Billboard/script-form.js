// Function to clear form inputs
function clearData() {
  document.getElementById('name-input').value = '';
  document.getElementById('place').value = '';  // Clear "Place" dropdown
  document.getElementById('age').value = '';    // Clear "Age" dropdown
  document.getElementById('division').value = ''; // Clear "Division" dropdown
}

// Event listener for form submission
document.getElementById('control-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get the input values
  const name = document.getElementById('name-input').value;
  const place = document.getElementById('place').value;
  const division = document.getElementById('age').value + ' ' + document.getElementById('division').value; // Get selected division

  // Generate a unique numeric key for the new data
	const newKey = Date.now();  // Use current timestamp as the unique key
	const newData = {
	  key: newKey,
	  name: name,
	  place: place,
	  division:  division // Concatenated age and division
	};

  // Load existing data from localStorage
  let savedData = JSON.parse(localStorage.getItem('tickerData')) || [];

  // Check if the new data is already in savedData to avoid duplicates (optional)
  const isDuplicate = savedData.some(item => item.name === newData.name && item.place === newData.place && item.age === newData.age && item.division === newData.division);

  if (!isDuplicate) {
    // Add the new data to the array
    savedData.push(newData);

    // Save the updated data back to localStorage
    localStorage.setItem('tickerData', JSON.stringify(savedData));

  } else {
    alert('This data already exists!');
  }
});
