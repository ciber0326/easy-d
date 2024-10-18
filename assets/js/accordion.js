class Accordion {
  constructor(accordionSelector, images) {
    this.accordionElement = $(accordionSelector);
    this.images = images;
    this.currentImageIndex = 0; // Track current image
    this.init();
  }

  init() {
    // Set the first accordion item and preview image as active by default
    this.accordionElement.find(".accordion-item").first().addClass("active");
    this.accordionElement.find(".accordion-body").first().slideDown();
    this.setPreviewImage(0); // Set the first image as the preview

    // Attach click event to accordion items
    this.accordionElement.find(".accordion-item").on("click", (e) => {
      this.handleAccordionClick($(e.currentTarget));
    });
  }

  handleAccordionClick(item) {
    // If this accordion item is already active, do nothing
    if (item.hasClass("active")) {
      item.removeClass("active"); // Remove active class
      item.find(".accordion-body").slideUp(); // Slide up the accordion body
      return;
    }

    // Remove active class from all items and close all accordion bodies
    this.accordionElement.find(".accordion-item").removeClass("active");
    this.accordionElement.find(".accordion-body").slideUp();

    // Activate the clicked accordion item
    item.addClass("active");
    item.find(".accordion-body").slideDown();

    // Get the index of the clicked accordion item
    const index = item.index();

    // Change the preview image with smooth transition
    this.changePreviewImage(index);
  }

  changePreviewImage(index) {
    const img = this.accordionElement.find(
      '.preview-img img[alt="preview-img"]'
    ).first();
    const newSrc = this.images[index];

    // Avoid reloading the same image
    if (this.currentImageIndex === index) return;

    // Update the current image index
    this.currentImageIndex = index;

    // Use fadeOut and preload the new image before fading in
    img.slideUp(400, () => {
      img
        .attr("src", newSrc)
        .on("load", () => {
          img.slideDown(400) // Smooth fade-in after loading
        })
        .off("error")
        .on("error", () => {
          console.error("Failed to load image:", newSrc);
          img.slideDown(400); // Still fade in to avoid empty space
        });
    });
  }

  setPreviewImage(index) {
    const img = this.accordionElement.find(
      '.preview-img img[alt="preview-img"]'
    );
    img.attr("src", this.images[index]);
  }
}
