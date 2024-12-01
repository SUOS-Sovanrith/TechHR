// Initialize rating to 0
let rating = 0;

function updateStars(rating) {
    // Reset all stars to unfilled
    for (let i = 1; i <= 5; i++) {
        document.getElementById("star-" + i).classList.remove('filled');
    }
    
    // Fill the stars up to the selected rating
    for (let i = 1; i <= rating; i++) {
        document.getElementById("star-" + i).classList.add('filled');
    }
}

function rateProduct(starValue) {
    // Update the rating variable
    rating = starValue;
    updateStars(rating);
    
    // Optionally, you can send this rating to the server using AJAX here
    console.log("Rated product with " + rating + " stars.");
}
