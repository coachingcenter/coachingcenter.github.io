(function($) {
    "use strict"; // Start of use strict

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '#mainNav',
        offset: 51
    });

    var layoutNUM = $('#layoutNUM').val();

	// Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    //Break or reduse padding the pages menu if we have to many pages
    //Note: because of the Google Font Loader we need to wait 150ms if we want this script to work for us
    setTimeout(function() {
        $( document ).on( 's123.page.ready', function( event ) {
            ReduseMenuSizeWhenWeDontHavePlace();
        });
        ReduseMenuSizeWhenWeDontHavePlace();
    },150);
    $( window ).resize(function() {
        ReduseMenuSizeWhenWeDontHavePlace();
    });

})(jQuery); // End of use strict
