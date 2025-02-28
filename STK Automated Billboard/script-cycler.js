document.addEventListener("DOMContentLoaded", function () {
    const groups = document.querySelectorAll(".table-group");
    let currentGroupIndex = 0;
    const switchInterval = 5000; // 5 seconds per transition

    function switchGroups() {
        // Hide current group
        groups[currentGroupIndex].classList.remove("active");

        // Move to the next group
        currentGroupIndex = (currentGroupIndex + 1) % groups.length;

        // Show next group
        groups[currentGroupIndex].classList.add("active");
    }

    // Initialize: Show the first group
    groups[currentGroupIndex].classList.add("active");

    // Set interval for transitions
    setInterval(switchGroups, switchInterval);
});
