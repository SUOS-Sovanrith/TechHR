document.addEventListener('DOMContentLoaded', () => {
    // Increase value on + button click
    $('.plus-btn-view').click(function() {
        var currentValue = parseInt($('input[name="quantity"]').val());
        $('input[name="quantity"]').val(currentValue + 1);
    });

    // Decrease value on - button click
    $('.minus-btn-view').click(function() {
        var currentValue = parseInt($('input[name="quantity"]').val());
        if(currentValue > 1 )
            $('input[name="quantity"]').val(currentValue - 1);
    });
});