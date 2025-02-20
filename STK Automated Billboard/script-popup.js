// Function to handle the popup display for saved data
function showPopupData() {
  // Load saved data from localStorage
  let savedData = JSON.parse(localStorage.getItem('submissions')) || [];

  if (savedData.length > 0) {
    // Get the latest data to show in the popup
	
	// Find the winner with place '1st'
	const firstPlace = savedData.winners.find(winner => winner.place === "1st");

	// Access the name and place
	const winnerName = firstPlace ? firstPlace.name : "No winner";
	const division = savedData.age + " " + savedData.division || "No division";  // Accessing division directly from the main object

    const latestData = savedData[savedData.length - 1];
    const popupMessage = `Latest Added Data: 
      Name: ${winnerName}, 
      Place: "1st", 
      Division: ${division}`;

    // Display the popup (for now, just a simple alert)
    alert(popupMessage);
  } else {
    alert('No saved data found.');
  }
}
