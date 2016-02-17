$(function() {
    /* Creating Jquery object from HTML DOM -elements */
    const comicImageElement = $('#comic-strip');
    const alertBox = $('#error-message-id');
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
    const updateNav = function(id) {
        disableLinks(id);
        updateHref(nav.next, (id+1));
        updateHref(nav.prev, (id-1));
    }

    /* function updateImg: Changes the image by id */
    const updateImg = function (id) {
        comicImageElement.attr('src', comicImageUrl + id + '.jpg');
    }

    /* function disableLink: Disable's the use of navigation links which would leave out of range */
    const disableLinks = function (id) {
        var oldest = (id <= oldestImg);
        var latest = (id >= latestImg);
        nav.oldest.toggleClass('disabled', oldest);
        nav.prev.toggleClass('disabled', oldest);
        nav.next.toggleClass('disabled', latest);
        nav.latest.toggleClass('disabled', latest);
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
            updateNav(id);
            updateImg(id);
        }
    });

    /* Configures the id validation for comic, if invalid redirects */
    router.configure({
        before: function(id) {
            if (isNaN(id) || id < oldestImg || id > latestImg) {
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