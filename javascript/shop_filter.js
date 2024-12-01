$(document).ready(function() {
    // Filter by Category
    $('.category-filter').on('click', function(e) {
        e.preventDefault();
        var category = $(this).data('category');
        var hasMatch = false;

        // Filter products by category
        $('.product-card').each(function() {
            var productCategory = $(this).data('category');
            if (category === 'All' || productCategory === category) {
                $(this).show();
                hasMatch = true;
            } else {
                $(this).hide();
            }
        });

        // Show "No products found" message if no products match
        if (!hasMatch) {
            $('#no-products-message').show();
        } else {
            $('#no-products-message').hide();
        }
    });

    // Filter by Brand
    $('.brand-filter').on('click', function(e) {
        e.preventDefault();
        var brand = $(this).data('brand');
        var hasMatch = false;

        // Filter products by brand
        $('.product-card').each(function() {
            var productBrand = $(this).data('brand');
            if (brand === 'All' || productBrand === brand) {
                $(this).show();
                hasMatch = true;
            } else {
                $(this).hide();
            }
        });

        // Show "No products found" message if no products match
        if (!hasMatch) {
            $('#no-products-message').show();
        } else {
            $('#no-products-message').hide();
        }
    });

    $('#clear-filters').on('click', function() {
        $('.product-card').show(); // Show all products
    });
});
