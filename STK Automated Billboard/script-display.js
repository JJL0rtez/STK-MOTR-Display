document.addEventListener('DOMContentLoaded', () => {
  // console.log("[DEBUG] script-display.js: DOMContentLoaded event fired.");

  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup');

  /**
   * Displays the popup with the given information from the last submission.
   * @param {Object} data - The single submission object from localStorage.
   */
  function showPopupFromData(data) {
     console.log("[DEBUG] showPopupFromData called with data:", data);

    let popupName = '';
    let popupPlace = '';
    let popupDivision = data.division || '';
	let popupAge = data.age;
    // Decide how to extract the name/place info based on winnerType
    if (data.winnerType === 'normal') {
      // console.log("[DEBUG] winnerType = normal");
      const firstPlace = data.winners.find(w => w.place === '1st');
      if (firstPlace) {
        popupName = firstPlace.name;
        popupPlace = firstPlace.place;
      } else {
        popupName = 'No 1st place winner';
        popupPlace = '';
      }
    } else if (data.winnerType === 'grand' || data.winnerType === 'Challange') {
      // console.log("[DEBUG] winnerType = grand");
      popupName = data.grandName || 'No grand winner name';
      popupPlace = '1st';
    } else {
      console.log("[DEBUG] winnerType = unknown");
      popupName = 'Unknown Winner Type';
      popupPlace = '';
    }

    // Update the DOM to show winner details
    document.getElementById('popup-name').innerText = popupName;
    document.getElementById('popup-place').innerText = popupPlace;
    document.getElementById('popup-division-age').innerText = popupAge + " " + popupDivision;

    // Show the overlay and popup
    overlay.style.display = 'block';
    popup.style.display = 'block';

    // Trigger confetti animation if available
    if (typeof startConfetti === 'function') {
      // console.log("[DEBUG] startConfetti called.");
      startConfetti();
    } else {
      // console.log("[DEBUG] startConfetti not found.");
    }

    // Automatically hide the popup after 15 seconds
    setTimeout(hidePopup, 15000);
  }

  // Function to hide the popup
  function hidePopup() {
    // console.log("[DEBUG] hidePopup called.");
    overlay.style.display = 'none';
    popup.style.display = 'none';

    if (typeof stopConfetti === 'function') {
      // console.log("[DEBUG] stopConfetti called.");
      stopConfetti();
    } else {
      // console.log("[DEBUG] stopConfetti not found.");
    }
  }

  // Attach event listener to hide popup when the overlay is clicked
  overlay.addEventListener('click', hidePopup);

  // Check for existing submissions on page load
  const storedSubmissions = localStorage.getItem('submissions');
  // console.log("[DEBUG] Retrieved submissionsData from localStorage:", storedSubmissions);

  if (storedSubmissions) {
    const parsedSubmissions = JSON.parse(storedSubmissions);
    if (parsedSubmissions.length > 0) {
      // Grab the most recent submission
      const lastSubmission = parsedSubmissions[parsedSubmissions.length - 1];
      // console.log("[DEBUG] lastSubmission:", lastSubmission);
      showPopupFromData(lastSubmission);
    } else {
      // console.log("[DEBUG] No submissions found in the array.");
    }
  } else {
    // console.log("[DEBUG] No 'submissions' key found in localStorage.");
  }

  // Listen for localStorage updates (when data is updated in another tab/window)
  window.addEventListener('storage', (event) => {
    // console.log("[DEBUG] storage event:", event);
    if (event.key === 'submissions' && event.newValue) {
      const parsedSubmissions = JSON.parse(event.newValue);
      if (parsedSubmissions.length > 0) {
        const lastSubmission = parsedSubmissions[parsedSubmissions.length - 1];
        // console.log("[DEBUG] new lastSubmission received via storage event:", lastSubmission);
        showPopupFromData(lastSubmission);
      } else {
        // console.log("[DEBUG] No submissions found in the updated array.");
      }
    }
  });
});
