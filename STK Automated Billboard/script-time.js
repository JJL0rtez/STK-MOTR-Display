document.addEventListener('DOMContentLoaded', () => {
  /**
   * Updates the #time-display element with the current time.
   */
  function updateTime() {
    const now = new Date();

    // Example: 24-hour HH:MM format
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    // const timeString = `${hours}:${minutes}`;

    // If you prefer 12-hour AM/PM format, uncomment below instead:
    let suffix = 'AM';
    let displayHour = hours;
    if (hours === 0) {
      displayHour = 12; // Midnight is 12 AM
    } else if (hours === 12) {
      suffix = 'PM'; // Noon is 12 PM
    } else if (hours > 12) {
      displayHour = hours - 12;
      suffix = 'PM';
    }
    const timeString = `${displayHour}:${minutes} ${suffix}`;
    

    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
      timeDisplay.textContent = timeString;
    }
  }

  // Run once on page load
  updateTime();

  // Update every 60 seconds (60000 ms)
  setInterval(updateTime, 1000);
});
