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

    // Usage
    const images = [
        './assets/img/sec-01-preview-01.svg',
        './assets/img/sec-01-preview-02.svg',
        './assets/img/sec-01-preview-03.svg',
        './assets/img/sec-01-preview-04.svg',
    ];
    const images_section7 = [
        './assets/img/sec-07-preview-01.png',
        './assets/img/sec-07-preview-02.png',
        './assets/img/sec-07-preview-03.png',
    ];

    const accordion1 = new Accordion('.accordion-preview-01', images);
    const accordion2 = new Accordion('.accordion-preview-02', images);
    const accordion3 = new Accordion('.accordion-preview-03', images_section7);


    // tab

    // Object to store the active accordion index for each tab
    let activeAccordions = {};

    // Set up click event for tab headers
    $('.tab-headers li a').on('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs
        $('.tab-headers li').removeClass('active');
        $('.tab-panel').removeClass('active');

        // Add active class to the clicked tab and its corresponding content
        $(this).parent().addClass('active');
        const target = $(this).attr('href');
        $(target).addClass('active');

        // Check if there's an accordion that was previously active for this tab
        const previousActiveIndex = activeAccordions[target];

        // If an accordion was previously active, open it; otherwise, open the first one
        if (previousActiveIndex !== undefined) {
            const previousAccordionItem = $(target).find('.tab-accordion-item').eq(previousActiveIndex);
            previousAccordionItem.addClass('active');
            previousAccordionItem.find('.tab-accordion-body').slideDown();
        } else {
            const firstAccordionItem = $(target).find('.tab-accordion-item').first();
            firstAccordionItem.addClass('active');
            firstAccordionItem.find('.tab-accordion-body').slideDown(); // Open the first item's content
        }
    });

    // Initialize each tab's first accordion item as active by default
    $('.tab-panel').each(function () {
        const firstAccordionItem = $(this).find('.tab-accordion-item').first();
        firstAccordionItem.addClass('active');
        firstAccordionItem.find('.tab-accordion-body').slideDown(); // Open the first item's content
    });

    // When an accordion header is clicked
    $('.tab-accordion-header').on('click', function () {
        // Get the parent accordion item of the clicked header
        const accordionItem = $(this).closest('.tab-accordion-item');
        const accordionContainer = accordionItem.closest('.tab-panel');
        const tabId = `#${accordionContainer.attr('id')}`;
        const index = accordionItem.index(); // Get the index of the clicked accordion item

        // Check if this item is already active
        if (accordionItem.hasClass('active')) {
            // If active, simply close it (remove the class and slide up)
            accordionItem.removeClass('active');
            accordionItem.find('.tab-accordion-body').slideUp();

            // Remove the saved index for this tab since none will be active
            activeAccordions[tabId] = undefined;
        } else {
            // Otherwise, remove active class from all accordion items within the current tab
            accordionContainer.find('.tab-accordion-item').removeClass('active');
            accordionContainer.find('.tab-accordion-body').slideUp();

            // Add active class to the clicked accordion item and open its body
            accordionItem.addClass('active');
            accordionItem.find('.tab-accordion-body').slideDown();

            // Save the index of the active accordion item for this tab
            activeAccordions[tabId] = index;
        }
    });



});
