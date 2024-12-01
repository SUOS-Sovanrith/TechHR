// Function to dynamically load the modal HTML and append it to the body
function loadModal() {
    if (!$('#alert-modal').length) { // Check if the modal already exists
        const modalHtml = `
            <div id="alert-overlay" class="alert-overlay"></div>
            <div id="alert-modal" class="alert-modal">
                <img id="alert-image" src="" alt="Alert Icon">
                <h2 id="alert-heading"></h2>
                <p id="alert-message"></p>
                <button class="btn" id="alert-btn">OK</button>
                <button class="btn cancel-btn" id="cancel-btn">Cancel</button>
            </div>
        `;
        $('body').append(modalHtml); // Append the modal HTML to the body
    }
}

// Function to show alert modal
function showAlert(type, message) {
    loadModal(); // Load modal if not already present
    let heading = '';
    let imageSrc = '';
    // Determine heading and image based on type
    switch (type) {
        case 'success':
            heading = 'Success';
            imageSrc = '../images/success.png';
            break;
        case 'warning':
            heading = 'Warning';
            imageSrc = '../images/warning.png';
            break;
        case 'danger':
            heading = 'Error';
            imageSrc = '../images/danger.png';
            break;
        default:
            heading = 'Alert';
            imageSrc = '';
    }
    // Update modal with appropriate content
    $('#alert-heading').text(heading);
    $('#alert-image').attr('src', imageSrc);
    $('#alert-message').text(message);

    // Show the modal
    $('#alert-overlay').fadeIn(200);
    $('#alert-modal').fadeIn(200);
}
// Function for confirmation dialog
function showConfirmation(message) {
    return new Promise(function (resolve, reject) {
        try {
                
            loadModal(); // Load modal if not already present

            // Update modal content for confirmation
            $('#alert-heading').text('Confirmation');
            $('#alert-image').attr('src', '../images/confirm.png');
            $('#alert-message').text(message);
            $('#alert-btn').text('Yes');
            $('#cancel-btn').show(); // Show cancel button for confirmation

            // Show the modal
            $('#alert-overlay').fadeIn(200);
            $('#alert-modal').fadeIn(200);

            // Handle button clicks
            $('#alert-btn').off('click').on('click', function() {
                $('#alert-modal').fadeOut(200);
                $('#alert-overlay').fadeOut(200);
                resolve(true); // Return true if confirmed
            });

            $('#cancel-btn').off('click').on('click', function() {
                $('#alert-modal').fadeOut(200);
                $('#alert-overlay').fadeOut(200);
                resolve(false); // Return false if canceled
            });
        } catch (error) {
            reject(error); // In case of any error in the code
        }
    });
}

// Close the modal when clicking the "OK" button
$(document).on('click', '#alert-btn', function() {
    $('#alert-modal').fadeOut(200);
    $('#alert-overlay').fadeOut(200);
});

// Close the modal when clicking the "Cancel" button
$(document).on('click', '#cancel-btn', function() {
    $('#alert-modal').fadeOut(200);
    $('#alert-overlay').fadeOut(200);
});