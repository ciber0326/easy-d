class Accordion {
    constructor(accordionSelector, images) {
        this.accordionElement = $(accordionSelector);
        this.images = images;
        this.init();
    }

    init() {
        // Set the first accordion item as active by default
        this.accordionElement.find('.accordion-item').first().addClass('active');
        this.accordionElement.find('.accordion-body').first().slideDown();
        this.setPreviewImage(0); // Set the first image as the preview

        // Attach click event to accordion items
        this.accordionElement.find('.accordion-item').on('click', (e) => {
            this.handleAccordionClick($(e.currentTarget));
        });
    }

    handleAccordionClick(item) {
        // If this accordion item is already active, do nothing
        if (item.hasClass('active')) {
            return; // Exit the function if the item is already active
        }

        // Remove active class from all items and close all accordion bodies
        this.accordionElement.find('.accordion-item').removeClass('active');
        this.accordionElement.find('.accordion-body').slideUp();

        // Activate the clicked accordion item
        item.addClass('active');
        item.find('.accordion-body').slideDown();

        // Get the index of the clicked accordion item
        const index = item.index();

        // Change the image in the preview area with fade-in/fade-out effect
        this.changePreviewImage(index);
    }

    changePreviewImage(index) {
        this.accordionElement.find('.preview-img img[alt="preview-img"]').fadeOut(400, () => {
            this.setPreviewImage(index);
        });
    }

    setPreviewImage(index) {
        const img = this.accordionElement.find('.preview-img img[alt="preview-img"]');
        img.attr('data-src', this.images[index])
           .removeClass('lazyload') // Remove lazyload class
           .addClass('lazyload')    // Add lazyload again to trigger loading
           .css('opacity', 1)       // Set opacity to 1
           .fadeIn(400);            // Fade in the new image
    }
}