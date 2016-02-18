$(function() {
    /* Creating Jquery object from HTML DOM -elements */
    const comicImageElement = $('#comic-strip');
    const alertBox = $('#error-message-id');
    const socialSharingButtons = $('.rrssb-buttons');
    const nav = {
        oldest: $('#link-to-oldest'),
        prev: $('#link-to-prev'),
        next: $('#link-to-next'),
        latest: $('#link-to-latest')
    };

    /* function updateHref: Updates link-elements in nav */
    const updateHref = function (element, id) {
        element.children('a').attr('href', route + id);
    }

    /* function updateNav: Updates the navigation links by id */
    const updateNav = function(id, disable) {
        disableLinks(id, disable);
        updateHref(nav.next, (id+1));
        updateHref(nav.prev, (id-1));
    }

    /* function updateImg: Changes the image by id */
    const updateImg = function (id) {
        comicImageElement.attr('src', comicImageUrl + id + '.jpg');
    }

    /* function disableLink: Disable's the use of navigation links which would leave out of range */
    const disableLinks = function (id, disable) {
        nav.oldest.toggleClass('disabled', id == oldestImg || disable.oldest === true);
        nav.prev.toggleClass('disabled', id <= oldestImg || disable.prev === true);
        nav.next.toggleClass('disabled', id >= latestImg || disable.next === true);
        nav.latest.toggleClass('disabled', id == latestImg || disable.latest === true);
    }

    const updateSocialSharing = function (id) {
        var updatedLinks = $.extend(false, socialSharing, {url: socialSharing.url + id} );
        socialSharingButtons.rrssb(updatedLinks);
    }

    /* function redirect: redirect the page to latest comicstrip */
    const redirect = function() {
        alertBox.show();
        window.location.replace(route + latestImg);
    }

    /* Creates instance of Router and defines routes */
    var router = Router({
        'kuva/:id': function (id) {
            id = parseInt(id,10);
            if (id >= oldestImg) {
                updateNav(id, {});
                updateImg(id);
            } else {
                updateNav(id, {next: true});
                updateImg(removedIMG);
            }
            updateSocialSharing(id);
        }
    });

    /* Configures the id validation for comic, if invalid redirects */
    router.configure({
        before: function(id) {
            if (isNaN(id) || id > latestImg) {
                redirect();
            }
        },
        notfound: function() {
            redirect();
        }
    });

    /* Initializes the Router (starts the app) */
    router.init('kuva/' + latestImg);

    /* update's the oldest and latest navlinks */
    updateHref(nav.oldest, oldestImg);
    updateHref(nav.latest, latestImg);

    /* Creates event handler for preventing the disables links to go anywhere */
    $('nav').delegate('li.disabled a', 'click', function(e) {
        e.preventDefault();
        return false;
    });
});