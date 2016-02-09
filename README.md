# Alivakaa
Suomen hauskin Frisbeegolf stripsarjakuva!

##Asennus
- Siirrä kaikki tiedostot serverin hakemistoon
- Korjaa absoluutiset osoitukset index.html:stä relatiivisillä, ainakin:
  - Sponsorien kuvat
  - alivakaa_info
- Tarkista, että kaikki tiedot ja muut pitävät paikansa, kuten sivuston metadata, otsikko yms.
- Tarkista google Analytics
- Halutessasi voit vaihtaa virheviestin (div id=error-message-id), joka näytetään jos URL -osoite on virheellinen
- Huomaa, logo on kahdessa osassa, jolloin vain oikeanpuoleinen on linkki facebook-sivulle
- Jos haluat vaihtaa "kuva/" -etuliitteen:
  - Muokkaa js/app.js-tiedostosta Routerin ominaisuuksista polut
  - Muuta config.js -tiedostosta route
- Muuta config.js -tiedostosta comicImageUrl -muuttujan arvo relatiivikseksi poluksi (lähtien Index.html:stä)

##Huom:
Bootstrap, Analystics, jQuery ja Director ovat kolmannenosapuolenkirjastoja.
Dokumentaatiot näille löytyy netistä.