document.addEventListener('DOMContentLoaded', () => {
  // console.log("[DEBUG] script-ticker.js: DOMContentLoaded event fired.");

  // 1. Grab the container where we'll display each entire submission.
  const tickerContainer = document.getElementById('news-ticker');
  if (!tickerContainer) {
    console.warn("[DEBUG] No element found with id='news-ticker'.");
    return; // Prevent errors if container is missing
  }

  // 2. Read the 'submissions' array from localStorage.
  const submissionsJSON = localStorage.getItem('submissions');
  if (!submissionsJSON) {
    // console.log("[DEBUG] No 'submissions' key found in localStorage.");
    return;
  }

  let submissions;
  try {
    submissions = JSON.parse(submissionsJSON);
  } catch (err) {
    console.error("[DEBUG] Failed to parse submissions JSON:", err);
    return;
  }

  if (!Array.isArray(submissions) || submissions.length === 0) {
    // console.log("[DEBUG] submissions is empty or not an array.");
    return;
  }

  // console.log("[DEBUG] Found submissions:", submissions);

  // We'll display one submission at a time.
  // Normal => 3 side-by-side cards + 4th card for age+division
  // Grand  => 1 wide card

  // 3. Current submission index
  let currentSubmissionIndex = 0;

  // Helper: Return a medal image path based on place or isGrand.
  function getMedalImage(place, isGrand = false) {
    if (isGrand) {
      // If you have a separate Grand medal, specify here:
      return "STK-Medals-1.png";
    }
    switch (place) {
      case "1st":
        return "STK-Medals-1.png";
      case "2nd":
        return "STK-Medals-2.png";
      case "3rd":
        return "STK-Medals-3.png";
      default:
        return "";
    }
  }

  /**
   * Builds and displays the markup for a single submission.
   * - Normal: 3 cards side-by-side, plus a 4th card with age+division
   * - Grand: 1 wide card (with a different medal optional)
   */
  function displaySubmission(submission) {
    // console.log("[DEBUG] displaySubmission:", submission);
    // Clear container
    tickerContainer.innerHTML = "";

    const winnerType = submission.winnerType;
    const division = submission.division || "No division";
    const age = submission.age || "No age";

    // Combined age+division text: e.g., "13-15 Girls Traditional Sparring"
    const ageDivisionString = `${age} ${division}`;

    if (winnerType === "normal" && Array.isArray(submission.winners)) {
      // 3 side-by-side cards for winners
      const winnerCards = submission.winners
        .map((w) => {
          const name = w.name || "No Name";
          const place = w.place || "No Place";
          const medal = "./img/" + getMedalImage(place, false);

          // No more "Name: ... Place: ..." etc. 
          // We'll show an image + the raw text lines.
    return `
      <div class="news-card normal-card-${place}">
              <div class="card-image">
                ${medal ? `<img src="${medal}" alt="${place} medal" />` : ""}
              </div>
              <div class="card-text">
                <div class="winner-name">${name}</div>
                <div class="winner-place">${place}</div>
              </div>
            </div>
          `;
        })
        .join("");

      // Put them in a group (row)
      const threeUpHTML = `<div class="cards-group normal-group">${winnerCards}</div>`;

      // 4th card for age+division
      const ageDivCard = `
	  <div class="news-card info-card">
          <div class="card-text-info">${ageDivisionString}</div>
        </div>
      `;

      // Combine them
      tickerContainer.innerHTML = `
        <div class="normal-submission">
		        
          ${threeUpHTML}
          ${ageDivCard}
        </div>
      `;

    } else if (winnerType === "grand") {
      // Single wide card
      const grandName = submission.grandName || "No Grand Winner Name";
      const medal = "./img/STK-Medals-1.png"; // We pass isGrand=true

      tickerContainer.innerHTML = `
        <div class="news-card grand-card">
          <div class="grand-card-image-left">
            ${medal ? `<img src="${medal}" alt="Grand medal" />` : ""}
          </div>
          <div class="card-text">
            <div class="grand-winner-name">${grandName}</div>
            <div class="grand-winner-place">--- Grand Champion ---</div>
            <div class="grand-winner-division">${ageDivisionString}</div>
          </div>
		            <div class="grand-card-image-right">
            ${medal ? `<img src="${medal}" alt="Grand medal" />` : ""}
          </div>
        </div>
      `;
    }else if (winnerType === "challenge") {
      // Single wide card
      const grandName = submission.grandName || "No Grand Winner Name";
      const medal = "./img/STK-Medals-1.png"; // We pass isGrand=true

      tickerContainer.innerHTML = `
        <div class="news-card grand-card">
          <div class="grand-card-image-left">
            ${medal ? `<img src="${medal}" alt="Grand medal" />` : ""}
          </div>
          <div class="card-text">
            <div class="grand-winner-name">${grandName}</div>
            <div class="grand-winner-place">--- Challenge Winner ---</div>
            <div class="grand-winner-division">${ageDivisionString}</div>
          </div>
		            <div class="grand-card-image-right">
            ${medal ? `<img src="${medal}" alt="Grand medal" />` : ""}
          </div>
        </div>
      `;
    } else {
      // Fallback if unknown
      console.warn("[DEBUG] Unknown or incomplete submission:", submission);
      tickerContainer.innerHTML = `
        <div class="news-card unknown-card">
          <div class="card-content">
            <p>Unknown Submission Format</p>
          </div>
        </div>
      `;
    }
  }

  // 5. Initial display
  displaySubmission(submissions[currentSubmissionIndex]);

  // 6. Cycle through each submission every 10 seconds
  setInterval(() => {
    currentSubmissionIndex = (currentSubmissionIndex + 1) % submissions.length;
    displaySubmission(submissions[currentSubmissionIndex]);
  }, 2000);

  // 7. Optional: Listen for storage changes to update dynamically
  window.addEventListener("storage", (event) => {
    // console.log("[DEBUG] storage event for ticker:", event);
    if (event.key === "submissions" && event.newValue) {
      try {
        const newSubmissions = JSON.parse(event.newValue);
        if (Array.isArray(newSubmissions) && newSubmissions.length > 0) {
          submissions = newSubmissions;
          currentSubmissionIndex = 0;
          displaySubmission(submissions[currentSubmissionIndex]);
        } else {
          // console.log("[DEBUG] new submissions array is empty or not an array.");
          tickerContainer.innerHTML = "";
        }
      } catch (e) {
        console.error("[DEBUG] Failed to parse new submissions JSON via storage event:", e);
      }
    }
  });
});
