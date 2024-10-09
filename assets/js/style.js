$(document).ready(function () {
    //custom select
    const $customSelect = $('.custom-select');
    const $trigger = $customSelect.find('.select-trigger');
    const $options = $customSelect.find('.custom-option');

    $trigger.on('click', function () {
        $customSelect.toggleClass('open');
    });

    $options.on('click', function () {
        const $selectedOption = $customSelect.find('.custom-option.selected');
        $selectedOption.removeClass('selected');
        $(this).addClass('selected');
        $trigger.find('span').text($(this).text());
        $customSelect.removeClass('open');
    });

    $(document).on('click', function (e) {
        if (!$customSelect.is(e.target) && $customSelect.has(e.target).length === 0) {
            $customSelect.removeClass('open');
        }
    });


    //dropdown
    $('.dropdown').hover(
        function () {
            $(this).addClass('open');
            $(this).find('.dropdown-lists').stop(true, true).slideDown(200);
        },
        function () {
            $(this).removeClass('open');
            $(this).find('.dropdown-lists').stop(true, true).slideUp(200);
        }
    );




    // Preload images (Update these with actual image URLs)
    const images = [
        './assets/img/sec-01-preview-01.png',
        './assets/img/sec-01-preview-02.png',
        './assets/img/sec-01-preview-03.png',
        './assets/img/sec-01-preview-04.png',
    ];

    // Set the first accordion item as active by default
    $('.accordion-item').first().addClass('active');
    $('.accordion-body').first().slideDown(); // Show the first item's content
    $('.preview-img img[alt="preview-img"]').attr('data-src', images[0]); // Set the first image as the data-src
    $('.preview-img img[alt="preview-img"]').addClass('lazyload').css('opacity', 1); // Lazy load and set opacity

    // Attach click event to accordion items
    $('.accordion-item').on('click', function () {
        // If this accordion item is already active, do nothing
        if ($(this).hasClass('active')) {
            return; // Exit the function if the item is already active
        }

        // Remove active class from all items
        $('.accordion-item').removeClass('active');
        // Close all accordion bodies
        $('.accordion-body').slideUp();

        // Activate the clicked accordion item
        $(this).addClass('active');
        $(this).find('.accordion-body').slideDown();

        // Get the index of the clicked accordion item
        const index = $(this).index();

        // Change the image in the preview area with fade-in/fade-out effect
        $('.preview-img img[alt="preview-img"]').fadeOut(400, function () {
            $(this).attr('data-src', images[index]) // Change the data-src attribute
                .removeClass('lazyload')         // Remove lazyload class
                .addClass('lazyload')            // Add lazyload again to trigger loading
                .fadeIn(400);                    // Fade in the new image
        });
    });
});
