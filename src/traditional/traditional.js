
//  Move .headerText div outside the carousel on listing pages.
if( $('.listing .carousel .headerText').length > 0 ){
    $('.carousel').each(function(){
        $thisHeaderText = $(this).find('.headerText');
        $(this).parent().append( $thisHeaderText );
    });
}

// Clone header search and .mainCallToAction and add contents to mobile menu
$("form.header-search").clone().appendTo("nav#menuMain");
$("header#pageHeader .mainCallToAction ").clone().prependTo("nav#menuMain");
$(".menuMainAlt").appendTo("header#pageHeader .headerContent");

// Move search bar.
function moveSearch(location) {
    $('.headerContent form.header-search').insertAfter('ul#menuAdmin ' + location).wrapAll('<li class="menuAdminSearch"></li>');
}

if($('body').hasClass('userLoggedIn')) {
    moveSearch('li.menuAdminLogOut');
} else {
    moveSearch('li.menuAdminBasket');
}

// Move social icons
$('.footerBox ul.socialIcons').clone().appendTo('ul#menuAdmin, .menuMain');

// If there's a Google Translate bar, shift it into the admin bit
$('document').ready(function() {
  if($('#google_translate_element').length) {
    $('#google_translate_element').insertBefore('#menuAdmin .menuAdminSearch').wrapAll('<li class="google-translate-element" />');
    $('body').addClass('has-google-translate');
  }
})