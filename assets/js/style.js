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
});
