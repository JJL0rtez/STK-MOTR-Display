document.getElementById('control-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const winnerType = document.getElementById('winner-type').value;
    const age = document.getElementById('age').value;
    const division = document.getElementById('division').value;
    const divisionType = document.getElementById('division-type').value;

    let submissionData;

    if (winnerType === 'grand' || winnerType === 'challenge') {
        const grandName = document.getElementById('grand-name').value;
        if (!grandName) {
            alert('Please enter the grand winner\'s name.');
            return;
        }
        submissionData = {
            winnerType,
            grandName,
            age,
            division,
            divisionType
        };
    } else {
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        const name3 = document.getElementById('name3').value.trim();

        if (!name1 || !name2 || !name3) {
            alert('Please enter all three winners\' names.');
            return;
        }

        submissionData = {
            winnerType: 'normal',
            winners: [
                { place: '1st', name: name1 },
                { place: '2nd', name: name2 },
                { place: '3rd', name: name3 },
            ],
            age,
            division,
            divisionType
        };
    }

    // Retrieve stored submissions
    const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];

    // **Enhanced Duplicate Check**
    const isDuplicate = storedSubmissions.some(existingEntry => {
        if (existingEntry.winnerType !== submissionData.winnerType) return false;
        if (existingEntry.age !== submissionData.age) return false;
        if (existingEntry.division !== submissionData.division) return false;
        if (existingEntry.divisionType !== submissionData.divisionType) return false;

        if (submissionData.winnerType === 'grand' || submissionData.winnerType === 'challenge') {
            return existingEntry.grandName.toLowerCase() === submissionData.grandName.toLowerCase();
        } else {
            return existingEntry.winners.every((winner, index) => 
                winner.name.toLowerCase() === submissionData.winners[index].name.toLowerCase()
            );
        }
    });

    if (isDuplicate) {
        alert("Duplicate submission detected. This entry already exists.");
        return; // Stop further execution
    }

    // Add new submission
    storedSubmissions.push(submissionData);
    localStorage.setItem('submissions', JSON.stringify(storedSubmissions));

    alert("Submission successfully saved!");
});

    function toggleWinnerType() {
      const winnerType = document.getElementById('winner-type').value;
		if (winnerType === 'grand') {
		document.getElementById('grand-winner-section').style.display = 'block';
        document.getElementById('normal-winners-section').style.display = 'none';
		document.getElementById('division-type').value = 'Grand Champion';
		updateDropdowns();
		}
       else if( winnerType === 'challenge') {
        document.getElementById('grand-winner-section').style.display = 'block';
        document.getElementById('normal-winners-section').style.display = 'none';
		document.getElementById('division-type').value = 'Challenge';
		updateDropdowns();
      } else {
        document.getElementById('grand-winner-section').style.display = 'none';
        document.getElementById('normal-winners-section').style.display = 'block';
      }
    }

    function clearData() {
      const confirmation = confirm('Are you sure you want to clear all data?');
      if (confirmation) {
        localStorage.removeItem('submissions');
        alert('All submissions data cleared.');
      }
    }

    // Update the options of age and division based on selected division type
    window.updateDropdowns = function() {
      const divisionType = document.getElementById('division-type').value;
      const ageDropdown = document.getElementById('age');
      const divisionDropdown = document.getElementById('division');

      // Clear existing options
      ageDropdown.innerHTML = '';
      divisionDropdown.innerHTML = '';

      if (divisionType === 'Junior Black Belt') {
        ageDropdown.innerHTML = `
          <option value="-9 Girls">-9 Girls</option>
          <option value="-9 Boys">-9 Boys</option>
		  <option value="10-11 Girls">10-11 Girls</option>
		  <option value="10-11 Boys">10-11 Boys</option>
		  <option value="12-13 Girls">12-13 Girls</option>
		  <option value="12-13 Boys">12-13 Boys</option>
		  <option value="14-15 Girls">4-15 Girls</option>
		  <option value="14-15 Boys">14-15 Boys</option>
		  <option value="16-17 Girls">16-17 Girls</option>
		  <option value="16-17 Boys">16-17 Boys</option>
        `;
        divisionDropdown.innerHTML = `
		  <option value="Hardstyle Forms">Hardstyle Forms</option>
		  <option value="Classical Forms">Classical Forms</option>
		  <option value="Traditional Weapons">Traditional Weapons</option>
		  <option value="Creative Weapons">Creative Weapons</option>
		  <option value="Open/Musical Forms">Open/Musical Forms</option>
		  <option value="Open/Musical Weapons">Open/Musical Weapons</option>
		  <option value="Kumite / Sparring">Kumite / Sparring</option>
        `;
      } else if (divisionType === 'Adult Black Belt') {
        ageDropdown.innerHTML = `
          <option value="Men 18 and over">Men 18 and over</option>
		  <option value="Women 18 and over">Women 18 and over</option>
        `;
        divisionDropdown.innerHTML = `
          <option value="Traditional Forms">Traditional Forms</option>
		  <option value="Traditional Weapons">Traditional Weapons</option>
		  <option value="Creative Weapons">Creative Weapons</option>
		  <option value="Open/Musical Forms">Open/Musical Forms</option>
		  <option value="-65kgs Kumite / Sparring">-65kgs Kumite / Sparring</option>
          <option value="+65kgs Kumite / Sparring">+65kgs Kumite / Sparring</option>
		  <option value="-75kgs Kumite / Sparring">-75kgs Kumite / Sparring</option>
          <option value="+75kgs Kumite / Sparring">+75kgs Kumite / Sparring</option>
        `;
      }else if (divisionType === 'Veteran Black Belt') {
        ageDropdown.innerHTML = `
          <option value="Men 35+">Men 35+</option>
		  <option value="Women 35+">Women 35+</option>
		  <option value="Men 42+">Men 42+</option>
		  <option value="Women 24+">Women 42+</option>
        `;z
        divisionDropdown.innerHTML = `
          <option value="Traditional Forms">Traditional Forms</option>
		  <option value="Short Kumite / Sparring">Kumite / Sparring</option>
          <option value="Tall Kumite / Sparring">Kumite / Sparring</option>
        `;
      }
	  else if (divisionType === 'Coloured Belt') {
        ageDropdown.innerHTML = `
          <option value="Little Ninjas">Little Ninjas</option>
		  <option value="Para Divisions All Ages">Para Divisions All Ages</option>
		  <option value="6yrs and Under Novice">6yrs and Under Novice</option>
		  <option value="6yrs and Under Advanced">6yrs and Under Advanced</option>
		  <option value="7 - 8yrs Novice">7-8yrs Novice</option>
		  <option value="7 - 8yrs Intermediate">7-8yrs Intermediate</option>
		  <option value="7 - 8yrs Advanced">7-8yrs Advanced</option>
		  <option value="9 - 10yrs Novice">9 - 10yrs Novice</option>
		  <option value="9 - 10yrs Intermediate">9 - 10yrs Intermediate</option>
		  <option value="9 - 10yrs Advanced">9 - 10yrs Advanced</option>
		  <option value="11 - 12yrs Novice">11 - 12yrs Novice</option>
		  <option value="11 - 12yrs Intermediate">11 - 12yrs Intermediate</option>
		  <option value="11 - 12yrs Advanced">11 - 12yrs Advanced</option>
		  <option value="13 - 14yrs Novice">13 - 14yrs Novice</option>
		  <option value="13 - 14yrs Intermediate">13 - 14yrs Intermediate</option>
		  <option value="13 - 14yrs Advanced">13 - 14yrs Advanced</option>
		  <option value="15 - 17yrs Novice">15 - 17yrs Novice</option>
		  <option value="15 - 17yrs Intermediate">15 - 17yrs Intermediate</option>
		  <option value="15 - 17yrs Advanced">15 - 17yrs Advanced</option>
		  <option value="Womens 18+ Novice">Womens 18+ Novice</option>
		  <option value="Womens 18+ Intermediate">Womens 18+ Intermediate</option>
		  <option value="Womens 18+ Advanced">Womens 18+ Advanced</option>
		  <option value="Mens 18+ Novice">Mens 18+ Novice</option>
		  <option value="Mens 18+ Intermediate">Mens 18+ Intermediate</option>
		  <option value="Mens 18+ Advanced">Mens 18+ Advanced</option>
		  <option value="Womens 35+ Novice">Womens 35+ Novice</option>
		  <option value="Womens 35+ Advanced">Womens 35+ Advanced</option>
		  <option value="Mens 35+ Novice">Mens 35+ Novice</option>
		  <option value="Mens 35+ Advanced">Mens 35+ Advanced</option>
		  <option value="Musical forms/Weapons">Musical forms/Weapons</option>

        `;
        divisionDropdown.innerHTML = `
			<option value="Basics">Basics</option>
		  <option value="Kata / Forms">Kata / Forms</option>
		  <option value="Weapons">Weapons</option>
		  <option value="Kumite / Sparring">Kumite / Sparring</option>

        `;
      }
	  else if (divisionType === 'Grand Champion') {
        ageDropdown.innerHTML = `
          <option value="-17 Blackbelt Traditional Forms/Weapons">-17 Blackbelt Traditional Forms/Weapons</option>
		  <option value="-17 Blackbelt Open/Musical">-17 Blackbelt Open/Musical</option>
		  <option value="Adult Blackbelt Womens Sparring">Adult Blackbelt Womens Sparring</option>
		  <option value="Adult Blackbelt Mens Sparring">Adult Blackbelt Mens Sparring</option>
		  <option value="Adult Blackbelt Forms/Weapons">Adult Blackbelt Forms/Weapons</option>
        `;
        divisionDropdown.innerHTML = `
			<option value=" ">No Selection Needed</option>
        `;
      }
	  	  else if (divisionType === 'Challenge') {
        ageDropdown.innerHTML = `
          <option value="-17 Blackbelt Traditional Forms">-17 Blackbelt Traditional Forms</option>
		  <option value="-17 Blackbelt Open/Musical Forms">-17 Blackbelt Open/Musical Forms</option>
		  <option value="-17 Colour Belt Traditional Forms">-17 Colour Belt Traditional Forms</option>
		  <option value="Adult Blackbelt Forms">Adult Blackbelt Forms</option>
        `;
        divisionDropdown.innerHTML = `
			<option value=" ">No Selection Needed</option>
        `;
      }
    }

	function exportLocalStorageToCSV() {
		let data = [];
		
		// Retrieve all local storage keys and values
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			let value = localStorage.getItem(key);
			
			// Attempt to parse JSON, otherwise store as raw text
			try {
				value = JSON.parse(value);
			} catch (e) {}

			data.push({ key, value: JSON.stringify(value) });
		}

		// Convert data to CSV format
		let csvContent = "data:text/csv;charset=utf-8,key,value\n" + 
			data.map(row => `${row.key},"${row.value.replace(/"/g, '""')}"`).join("\n");

		// Create a download link and trigger download
		let encodedUri = encodeURI(csvContent);
		let link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "localStorageData.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

function importCSVToLocalStorage() {
    const fileInput = document.getElementById("import-file");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a CSV file to import.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split("\n").slice(1); // Skip the header row

        rows.forEach(row => {
            let [key, value] = row.split(/,(.+)/); // Split on first comma only

            if (key && value) {
                value = value.replace(/^"|"$/g, '').replace(/""/g, '"'); // Handle quoted values

                try {
                    // Parse JSON only if the value is a JSON string
                    const parsedValue = JSON.parse(value);
                    localStorage.setItem(key, JSON.stringify(parsedValue)); // Store it properly
                } catch (e) {
                    // If parsing fails, store it as a plain string
                    localStorage.setItem(key, value);
                }
            }
        });

        alert("Local storage successfully updated!");
    };

    reader.readAsText(file);
}


    // Call the update function on page load to set initial dropdown values
    updateDropdowns();