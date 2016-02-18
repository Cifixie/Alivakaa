/* Sovelluksen Javascriptille annettavat parametrit, joiden mukaan kuvia esitetään.
 * Sovelluksen reitys on toteutettu estämään lukualueen ulkopuolella olevat haut
 * ComicImageUrl on hakemistopolku, josta kuvat löytyvät. Esim /kuvat/, kehitys vaiheessa käytetty absoluuttista polkua.
 */
const removedIMG = '1'; //Image displayed when id is valid, but the image is removed to preserve links in future
const oldestImg = 24;
const latestImg = 47;
const comicImageUrl = 'http://alivakaa.fi/kuvat/';
const route = '#/kuva/';

const socialSharing = {
    title: 'Alivakaa - Sarjakuva frisbeegolfista',
    description: 'Alivakaa - Sarjakuva frisbeegolfista!',
    url: 'http://alivakaa.fi/' + route
};