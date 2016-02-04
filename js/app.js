$(function() {
    /* Koodin rakennemäärittelyt */
    const comicImageElement = $('#comic-strip');
    const alertBox = $('#error-message-id');
    const links = {
        oldest: $('#link-to-oldest'),
        prev: $('#link-to-prev'),
        next: $('#link-to-next'),
        latest: $('#link-to-latest')
    };

    const updateHref = function(element, id) {
        element.children('a').attr('href', '#/kuva/' + id);
    }

    const updateImg = function(id) {
        comicImageElement.attr('src', comicImageUrl + id + '.jpg');
    }

    const toggleLinkDisabled = function(direction) {
        if (direction == 'backward') {
            links.oldest.toggleClass('disabled', true);
            links.prev.toggleClass('disabled', true);
            links.next.toggleClass('disabled', false);
            links.latest.toggleClass('disabled', false);
        } else if (direction == 'forward') {
            links.oldest.toggleClass('disabled', false);
            links.prev.toggleClass('disabled', false);
            links.next.toggleClass('disabled', true);
            links.latest.toggleClass('disabled', true);
        } else {
            links.oldest.toggleClass('disabled', false);
            links.prev.toggleClass('disabled', false);
            links.next.toggleClass('disabled', false);
            links.latest.toggleClass('disabled', false);
        }
    }

    var router = Router({
        'kuva/:id': function (id) {
            id = parseInt(id, 10);
            if (id <= oldestImg) {
                toggleLinkDisabled('backward');
            } else if (id >= latestImg) {
                toggleLinkDisabled('forward');
            } else {
                toggleLinkDisabled('default');
            }

            updateHref(links.prev, (id-1));
            updateHref(links.next, (id+1));
            updateImg(id);
        }
    });

    router.configure({
        before: function(id) {
            console.log('a', this);
            id = parseInt(id,10);
            if (isNaN(id) || id < oldestImg || id > latestImg) {
                alertBox.show();
                window.location.replace('#/kuva/' + latestImg);
            }
        },
        notfound: function() {
            alertBox.show();
            window.location.replace('#/kuva/' + latestImg);
        }
    });

    router.init('/kuva/' + latestImg);

    $('nav').delegate('li.disabled a', 'click', function(e) {
        e.preventDefault();
        return false;
    });

    updateHref(links.oldest, oldestImg);
    updateHref(links.latest, latestImg);
});