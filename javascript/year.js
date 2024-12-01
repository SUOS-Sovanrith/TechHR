// Function to update the year in the copyright section
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();  // Get the current year
    const copyrightElement = document.getElementById("copyright-year"); // Get the copyright element
    copyrightElement.innerHTML = `&copy;${currentYear} TechHR | All Rights Reserved`; // Update the text
}

// Call the function when the page loads
updateCopyrightYear();
