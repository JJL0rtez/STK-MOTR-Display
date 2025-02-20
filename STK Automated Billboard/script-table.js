document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded: Initializing Table Editing");

    const table = document.getElementById("editableTable");

    if (!table) {
        console.error("Error: Table element not found.");
        return;
    }

    table.addEventListener("click", function (event) {
        let cell = event.target;

        // ✅ Only allow editing if the cell is inside a sub-table
        if (cell.tagName === "TD" && cell.closest(".sub-table, .sub-table-borderless")) {
            console.log(`Cell Clicked: "${cell.innerText}"`);

            let oldText = cell.innerText.trim();
            let input = document.createElement("input");
            input.type = "text";
            input.value = oldText;
            input.style.width = "100%";
            input.style.border = "none";

            cell.innerHTML = "";
            cell.appendChild(input);
            input.focus();

            input.addEventListener("blur", function () {
                saveCell(cell, input.value);
            });

            input.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    input.blur();
                }
            });
        }
    });

    function saveCell(cell, newText) {
        if (cell.classList.contains("event") && newText.startsWith("@")) {
            newText = newText.substring(1).trim();
            cell.classList.remove("event");
            cell.classList.add("event-over");
        } else if ((cell.classList.contains("event-over") || cell.classList.contains("event")) && !newText.startsWith("@")) {
            cell.classList.remove("event-over");
            cell.classList.add("event");
        }

        cell.innerText = newText;
        updateFormatting(cell);
    }

    function updateFormatting(cell) {
        let text = cell.innerText.trim();
        let movedRingRegex = /moved ring \d+/i;

        if (movedRingRegex.test(text) && (cell.classList.contains("event-over") || cell.classList.contains("event"))) {
            cell.classList.add("alert");
        } else {
            cell.classList.remove("alert");
        }
    }

    // Apply correct formatting only to cells that contain "moved ring ##"
    table.querySelectorAll(".sub-table td, .sub-table-borderless td").forEach(cell => updateFormatting(cell));
});
