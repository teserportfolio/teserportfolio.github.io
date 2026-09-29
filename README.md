# Portfolio Till Eser

Dieses Paket ist für das bestehende Repository `teserportfolio/teserportfolio.github.io` vorbereitet. Alle HTML-, CSS- und JavaScript-Dateien gehören direkt ins Hauptverzeichnis. Es ist keine Installation nötig.

## Auf GitHub aktualisieren

1. Die ZIP-Datei auf deinem Computer **entpacken**. Die ZIP-Datei selbst nicht hochladen.
2. Im Repository auf **Code → Add file → Upload files** klicken.
3. Die **Dateien aus dem entpackten Ordner** auswählen und direkt ins Hauptverzeichnis hochladen, nicht den ganzen Ordner. Die gleichnamigen Dateien damit ersetzen und unten **Commit changes** wählen.
4. Nach der Veröffentlichung [teserportfolio.github.io](https://teserportfolio.github.io/) neu öffnen. Falls du noch die alte Version siehst, die Seite mit `Strg + F5` neu laden.

Die Startseite lädt `style.css` und `main.js` aus dem Hauptverzeichnis. Die Projektseiten laden zusätzlich `projects.js`. Alle elf Dateien im Paket gehören zusammen.

## Verhalten

- Eine Scrollbewegung nach unten spielt die vollständige Startanimation ab. Scrollen nach oben setzt sie nicht zurück.
- Die großen Buchstaben von TILL ESER laufen einzeln nur waagrecht oder senkrecht aus dem Bild. Der kleine Name und das Menü kommen von außen herein.
- Ein Klick auf TILL ESER oder das X führt zur Startansicht.
- Bei einem Seitenwechsel verschwindet der vorhandene Text nach links. Die neue Überschrift kommt von rechts, die Kacheln kommen von unten.
- DESIGN, GRAPHIC und ILLUSTRATION zeigen am Computer je neun kleinere Projektkacheln im 3×3-Raster. Auf kleinen Bildschirmen passt sich die Anzahl der Spalten an.
- Jede Kachel führt zu einer eigenen Projektansicht mit Überschrift, Textfeld und neun quadratischen Bildfeldern.

## Später eigene Projekte einfügen

In `projects.js` kannst du pro Projekt `title` (Titel), `description` (Text), `cover` (erstes Bild) und `gallery` (bis zu acht weitere Bilder) ändern. Bilder kannst du beispielsweise in einen neuen Ordner `assets/images/` hochladen und so referenzieren: `assets/images/design-01.jpg`. Ohne Bildpfad bleibt ein Platzhalter sichtbar.

Der CV-Platzhalter steht in `cv.html`; die Kontaktdaten stehen in `contact.html`.
