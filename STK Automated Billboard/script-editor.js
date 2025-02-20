// Function to populate the record list
// Function to populate the record list
function populateRecordList() {
  const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
  const selectRecord = document.getElementById('select-record');
  selectRecord.innerHTML = ''; // Clear the current options

  storedSubmissions.forEach((submission, index) => {
    const option = document.createElement('option');
    
    // Concatenate age, division, record #, and winner type to make it easier to identify
    const winnerTypeText = submission.winnerType === 'grand' ? 'Grand Winner' : submission.winnerType === 'challenge' ? 'Challenge' : 'Normal Winner';
    const displayText = `Record ${index + 1}: ${winnerTypeText} - Age: ${submission.age}, Division: ${submission.division}`;
    option.value = index;
    option.textContent = displayText;
    selectRecord.appendChild(option);
  });
}


// Load the selected record into the edit form
// Load the selected record into the edit form
// Load the selected record into the edit form
// Load the selected record into the edit form
function loadRecordForEditing() {
  const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
  const selectedIndex = document.getElementById('select-record').value;
  
  if (selectedIndex === '') {
    alert('Please select a record to edit.');
    return;
  }

  const record = storedSubmissions[selectedIndex];

  // If it's a "grand" winner, populate grandName
  if (record.winnerType === 'grand' || record.winnerType === 'challenge') {
	  // Toggle winner to grand mode
	  const winnerType = document.getElementById('winner-type').value;
      document.getElementById('grand-winner-section').style.display = 'block';
      document.getElementById('normal-winners-section').style.display = 'none';
	  document.getElementById('winner-type').value = "grand";
	  
    if (record.grandName) {  // Ensure winners array exists and has at least one element
      document.getElementById('grand-name').value = record.grandName; // 1st place (for grand winner)
    }
	    if (record.divisionType) {  // Ensure winners array exists and has at least one element
      document.getElementById('division-type').value = record.divisionType; // 1st place (for grand winner)
	  updateDropdowns()
	  
    }
	    if (record.age) {  // Ensure winners array exists and has at least one element
      document.getElementById('age').value = record.age; // 1st place (for grand winner)
    }
		    if (record.grandName) {  // Ensure winners array exists and has at least one element
      document.getElementById('grand-name').value = record.grandName; // 1st place (for grand winner)
    }
	
    // Clear the other name fields as they are not used for grand winner
    //document.getElementById('name2').value = '';
    //document.getElementById('name3').value = '';
  }
  // If it's a "normal" winner, populate all three names (1st, 2nd, 3rd)
  else {
	        const winnerType = document.getElementById('winner-type').value;
        document.getElementById('grand-winner-section').style.display = 'none';
        document.getElementById('normal-winners-section').style.display = 'block';
    if (record.winners && record.winners[0]) {
      document.getElementById('name1').value = record.winners[0].name; // 1st place
    }
    if (record.winners && record.winners[1]) {
      document.getElementById('name2').value = record.winners[1].name; // 2nd place
    }
    if (record.winners && record.winners[2]) {
      document.getElementById('name3').value = record.winners[2].name; // 3rd place
    }
  }

  document.getElementById('division-type').value = record.divisionType;
  document.getElementById('age').value = record.age;
  document.getElementById('division').value = record.division;
  document.getElementById('edit-form').style.display = 'block'; // Show the form
}

// Save changes to the selected record
// Save changes to the selected record
function saveChanges() {
  const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
  const selectedIndex = document.getElementById('select-record').value;

  if (selectedIndex === '') {
    alert('Please select a record to edit.');
    return;
  }

  const winnerType = document.getElementById('name2').value ? 'normal' : 'grand'; // Determine if it's normal or grand based on whether name2 is populated
  let updatedRecord;

  if (winnerType === 'grand') {
    updatedRecord = {
      winnerType: 'grand',
      name: document.getElementById('grand-name').value, // Only 1 name for grand winner
      age: document.getElementById('age').value,
      division: document.getElementById('division').value,
	  division: document.getElementById('division-type').value,
    };
  } else {
    updatedRecord = {
      winnerType: 'normal',
      winners: [
        { place: '1st', name: document.getElementById('name1').value },
        { place: '2nd', name: document.getElementById('name2').value },
        { place: '3rd', name: document.getElementById('name3').value },
      ],
      age: document.getElementById('age').value,
      division: document.getElementById('division').value,
    };
  }

  storedSubmissions[selectedIndex] = updatedRecord;
  localStorage.setItem('submissions', JSON.stringify(storedSubmissions));

  alert('Record updated successfully!');
  populateRecordList(); // Re-populate the list
  document.getElementById('edit-form').style.display = 'none'; // Hide the form
}

// Remove the selected record
function removeRecord() {
  const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
  const selectedIndex = document.getElementById('select-record').value;

  if (selectedIndex === '') {
    alert('Please select a record to remove.');
    return;
  }

  const confirmation = confirm('Are you sure you want to remove this record?');
  if (confirmation) {
    storedSubmissions.splice(selectedIndex, 1); // Remove the selected record
    localStorage.setItem('submissions', JSON.stringify(storedSubmissions));
    alert('Record removed successfully!');
    populateRecordList(); // Re-populate the list
    document.getElementById('edit-form').style.display = 'none'; // Hide the form
  }
}

// Call this function to populate the record list when the page loads
populateRecordList();
