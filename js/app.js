$(function() {
    /* Koodin rakennemäärittelyt - Määritellään HTML elementit jQuery-objekteiksi */
    const comicImageElement = $('#comic-strip');
    const alertBox = $('#error-message-id');
    const nav = {
        oldest: $('#link-to-oldest'),
        prev: $('#link-to-prev'),
        next: $('#link-to-next'),
        latest: $('#link-to-latest')
    };

    /* Toiminnallisuudet, updateHref, updateImg & toggleLinkDisabled */
    const updateHref = function(element, id) { // Päivitetään navigointipalkin linkit
        element.children('a').attr('href', '#/kuva/' + id);
    }

    const updateImg = function(id) { // Päivitetään sarjakuva
        comicImageElement.attr('src', comicImageUrl + id + '.jpg');
    }

    const toggleLinkDisabled = function(direction) { // Estetään navigointipainikkeiden clikkaus ääripäissä (ei voi mennä yli lukualueen)
        if (direction == 'backward') {
            nav.oldest.toggleClass('disabled', true);
            nav.prev.toggleClass('disabled', true);
            nav.next.toggleClass('disabled', false);
            nav.latest.toggleClass('disabled', false);
        } else if (direction == 'forward') {
            nav.oldest.toggleClass('disabled', false);
            nav.prev.toggleClass('disabled', false);
            nav.next.toggleClass('disabled', true);
            nav.latest.toggleClass('disabled', true);
        } else {
            nav.oldest.toggleClass('disabled', false);
            nav.prev.toggleClass('disabled', false);
            nav.next.toggleClass('disabled', false);
            nav.latest.toggleClass('disabled', false);
        }
    }

    /* Luodaan reityskartta ja controller, jossa päivitetään sivusto ID:n perusteella */
    var router = Router({
        'kuva/:id': function (id) {
            id = parseInt(id, 10);
            /* Poistetaan navikointilinkit, jotka johtavat alueen ulkopuolelle pois käytöstä */
            if (id <= oldestImg) {
                toggleLinkDisabled('backward');
            } else if (id >= latestImg) {
                toggleLinkDisabled('forward');
            } else {
                toggleLinkDisabled('default');
            }

            /* Päivitetään linkit ja sarkajuka */
            updateHref(nav.prev, (id-1));
            updateHref(nav.next, (id+1));
            updateImg(id);
        }
    });

    /* Sivuston virheensietokyky:
     * Validoidaan ID osoiteriviltä:
      * Virhetilanteessa uudelleenohjataan uusimpaan kuvaan ja näytetään ystävällinen virhesivu
      * Jos käyttäjä syöttää virheellisen sivun, -^
     */
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

    /* Alustetaan sovellus - "Käynnistetään" */
    router.init('/kuva/' + latestImg);

    /* Luodaan eventHandler navikointipainikkeille: estetään linkin toiminta, jos se on poistettu käytöstä controllerissa. */
    $('nav').delegate('li.disabled a', 'click', function(e) {
        e.preventDefault();
        return false;
    });

    /* Päivitetään lautauksen yhteydessä uusin ja vanhin navikointilinkit */
    updateHref(nav.oldest, oldestImg);
    updateHref(nav.latest, latestImg);
});