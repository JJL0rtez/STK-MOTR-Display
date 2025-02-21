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
    const displayText = `Record ${index + 1}: ${winnerTypeText} -> ${submission.age}`;
    option.value = index;
    option.textContent = displayText;
    selectRecord.appendChild(option);
  });
}


// Load the selected record into the edit form
function loadRecordForEditing() {
  const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
  const selectedIndex = document.getElementById('select-record').value;
  
  if (selectedIndex === '') {
    alert('Please select a record to edit.');
    return;
  }

  const record = storedSubmissions[selectedIndex];

  // Set the correct winner type
  document.getElementById('winner-type').value = record.winnerType; 

  // Ensure all fields are properly set
  document.getElementById('division-type').value = record.divisionType || '';
  document.getElementById('division').value = record.division || '';
  document.getElementById('age').value = record.age || '';

  if (record.winnerType === 'grand' || record.winnerType === 'challenge') {
      document.getElementById('grand-winner-section').style.display = 'block';
      document.getElementById('normal-winners-section').style.display = 'none';

      document.getElementById('grand-name').value = record.grandName || ''; 

  } else {
      document.getElementById('grand-winner-section').style.display = 'none';
      document.getElementById('normal-winners-section').style.display = 'block';

      document.getElementById('name1').value = record.winners?.[0]?.name || '';
      document.getElementById('name2').value = record.winners?.[1]?.name || '';
      document.getElementById('name3').value = record.winners?.[2]?.name || '';
  }

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

  const winnerType = document.getElementById('winner-type').value;

  let updatedRecord;

  if (winnerType === 'grand' || winnerType === 'challenge') {
    updatedRecord = {
      winnerType: winnerType,
      grandName: document.getElementById('grand-name').value?.trim() || '',
      age: document.getElementById('age')?.value?.split('/')[0]?.trim() || '', // ✅ Ensure age is correct
      division: document.getElementById('division')?.value?.trim() || '',      // ✅ Fix division issue
      divisionType: document.getElementById('division-type')?.value?.trim() || '',
    };
  } else {
    updatedRecord = {
      winnerType: 'normal',
      winners: [
        { place: '1st', name: document.getElementById('name1').value?.trim() || '' },
        { place: '2nd', name: document.getElementById('name2').value?.trim() || '' },
        { place: '3rd', name: document.getElementById('name3').value?.trim() || '' },
      ],
      age: document.getElementById('age')?.value?.trim() || '',      // ✅ Ensure age is correctly stored
      division: document.getElementById('division')?.value?.trim() || '', // ✅ Ensure division is correctly stored
      divisionType: document.getElementById('division-type')?.value?.trim() || '',
    };
  }

  console.log("Saving corrected record:", updatedRecord); // ✅ Debugging log

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

function clearForm() {
    // Get all input fields inside the "Add Records" form
    const inputs = document.querySelectorAll("#control-form input[type='text']");
    
    // Clear each input field
    inputs.forEach(input => input.value = "");
}