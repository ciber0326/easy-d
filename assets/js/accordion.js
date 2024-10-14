// class Accordion {
//     constructor(accordionSelector, images) {
//         this.accordionElement = $(accordionSelector);
//         this.images = images;
//         this.init();
//     }

//     init() {
//         // Set the first accordion item as active by default
//         this.accordionElement.find('.accordion-item').first().addClass('active');
//         this.accordionElement.find('.accordion-body').first().slideDown();
//         this.setPreviewImage(0); // Set the first image as the preview

//         // Attach click event to accordion items
//         this.accordionElement.find('.accordion-item').on('click', (e) => {
//             this.handleAccordionClick($(e.currentTarget));
//         });
//     }

//     handleAccordionClick(item) {
//         // If this accordion item is already active, do nothing
//         if (item.hasClass('active')) {
//             return; // Exit the function if the item is already active
//         }

//         // Remove active class from all items and close all accordion bodies
//         this.accordionElement.find('.accordion-item').removeClass('active');
//         this.accordionElement.find('.accordion-body').slideUp();

//         // Activate the clicked accordion item
//         item.addClass('active');
//         item.find('.accordion-body').slideDown();

//         // Get the index of the clicked accordion item
//         const index = item.index();

//         // Change the image in the preview area with fade-in/fade-out effect
//         this.changePreviewImage(index);
//     }

//     changePreviewImage(index) {
//         this.accordionElement.find('.preview-img img[alt="preview-img"]').fadeOut(600, () => {
//             this.setPreviewImage(index);
//         });
//     }

//     setPreviewImage(index) {
//         const img = this.accordionElement.find('.preview-img img[alt="preview-img"]');
//         img.attr('data-src', this.images[index])
//            .removeClass('lazyload') // Remove lazyload class
//            .addClass('lazyload')    // Add lazyload again to trigger loading
//            .css('opacity', 1)       // Set opacity to 1
//            .fadeIn(600);            // Fade in the new image
//     }
// }



// class Accordion {
//     constructor(accordionSelector, images) {
//         this.accordionElement = $(accordionSelector);
//         this.images = images;
//         this.init();
//     }

//     init() {
//         // Set the first accordion item as active by default
//         this.accordionElement.find('.accordion-item').first().addClass('active');
//         this.accordionElement.find('.accordion-body').first().slideDown();
//         this.setPreviewImage(0); // Set the first image as the preview

//         // Attach click event to accordion items
//         this.accordionElement.find('.accordion-item').on('click', (e) => {
//             this.handleAccordionClick($(e.currentTarget));
//         });
//     }

//     handleAccordionClick(item) {
//         // If this accordion item is already active, do nothing
//         if (item.hasClass('active')) return;

//         // Remove active class from all items and close all accordion bodies
//         this.accordionElement.find('.accordion-item').removeClass('active');
//         this.accordionElement.find('.accordion-body').slideUp();

//         // Activate the clicked accordion item
//         item.addClass('active');
//         item.find('.accordion-body').slideDown();

//         // Get the index of the clicked accordion item
//         const index = item.index();

//         // Change the image in the preview area smoothly
//         this.changePreviewImage(index);
//     }

//     changePreviewImage(index) {
//         const img = this.accordionElement.find('.preview-img img[alt="preview-img"]');

//         // Fade out the current image, then change the source and fade it in
//         img.fadeOut(600, () => {
//             this.setPreviewImage(index, () => {
//                 img.fadeIn(600); // Fade in after the new image has loaded
//             });
//         });
//     }

//     setPreviewImage(index, callback) {
//         const img = this.accordionElement.find('.preview-img img[alt="preview-img"]');
//         const newSrc = this.images[index];

//         // Set the new src and handle loading before fading in
//         img.attr('src', newSrc).on('load', () => {
//             if (typeof callback === 'function') callback(); // Ensure fadeIn after loading
//         }).off('error').on('error', () => {
//             console.error('Failed to load image:', newSrc);
//             if (typeof callback === 'function') callback(); // Fallback in case of error
//         });
//     }
// }



class Accordion {
    constructor(accordionSelector, images) {
        this.accordionElement = $(accordionSelector);
        this.images = images;
        this.currentImageIndex = 0; // Track current image
        this.init();
    }

    init() {
        // Set the first accordion item and preview image as active by default
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
        if (item.hasClass('active')) return;

        // Remove active class from all items and close all accordion bodies
        this.accordionElement.find('.accordion-item').removeClass('active');
        this.accordionElement.find('.accordion-body').slideUp();

        // Activate the clicked accordion item
        item.addClass('active');
        item.find('.accordion-body').slideDown();

        // Get the index of the clicked accordion item
        const index = item.index();

        // Change the preview image with smooth transition
        this.changePreviewImage(index);
    }

    changePreviewImage(index) {
        const img = this.accordionElement.find('.preview-img img[alt="preview-img"]');
        const newSrc = this.images[index];

        // Avoid reloading the same image
        if (this.currentImageIndex === index) return;

        // Update the current image index
        this.currentImageIndex = index;

        // Use fadeOut and preload the new image before fading in
        img.fadeOut(600, () => {
            img.attr('src', newSrc).on('load', () => {
                img.fadeIn(600); // Smooth fade-in after loading
            }).off('error').on('error', () => {
                console.error('Failed to load image:', newSrc);
                img.fadeIn(600); // Still fade in to avoid empty space
            });
        });
    }

    setPreviewImage(index) {
        const img = this.accordionElement.find('.preview-img img[alt="preview-img"]');
        img.attr('src', this.images[index]);
    }
}
