# Portfolio Till Eser

Dieses Paket ist für das bestehende Repository `teserportfolio/teserportfolio.github.io` vorbereitet. Alle HTML-, CSS- und JavaScript-Dateien gehören direkt ins Hauptverzeichnis. Es ist keine Installation nötig.

## Auf GitHub aktualisieren

1. Die ZIP-Datei auf deinem Computer **entpacken**. Die ZIP-Datei selbst nicht hochladen.
2. Im Repository auf **Code → Add file → Upload files** klicken.
3. Die **Dateien und den Ordner `assets` aus dem entpackten Ordner** direkt ins Hauptverzeichnis hochladen. Die gleichnamigen Dateien damit ersetzen und unten **Commit changes** wählen. Die Unterordnerstruktur von `assets/fonts/` erhalten.
4. Nach der Veröffentlichung [teserportfolio.github.io](https://teserportfolio.github.io/) neu öffnen. Falls du noch die alte Version siehst, die Seite mit `Strg + F5` neu laden.

Die Startseite lädt `style.css` und `main.js` aus dem Hauptverzeichnis. Die Projektseiten laden zusätzlich `projects.js`. Die Schriftdatei und ihre Lizenz liegen unter `assets/fonts/`. Alle Dateien im Paket gehören zusammen. Es werden keine externen Schriftanbieter benötigt.

## Gestaltung

- Plus Jakarta Sans: geometrische, serifenlose Schrift, überwiegend Light (300), für kleine Navigation und Beschriftungen Regular (400). Die variable Schrift wird lokal geladen; ihre SIL Open Font License liegt bei.
- Kleinere Überschriften und ein kompakteres Menü ohne Trennlinien oder rechte Pfeile.
- Dezente Linien und Beschriftungen unter den Seitenüberschriften; die Angaben `PORTFOLIO / 01` bis `PORTFOLIO / 05` entfallen.
- Das Illustrationsmosaik verwendet dieselben horizontalen und vertikalen Abstände wie das Projektraster und kombiniert unterschiedlich proportionierte Bildfelder.
- Auf Geräten mit Maus ersetzt ein weißer Punkt den Standardcursor. `mix-blend-mode: difference` invertiert die Farben darunter. Auf Touchscreens bleibt die normale Bedienung erhalten.

## Verhalten

- Eine Scrollbewegung nach unten spielt die vollständige Startanimation ab. Scrollen nach oben setzt sie nicht zurück.
- Die großen Buchstaben von TILL ESER laufen einzeln nur waagrecht oder senkrecht aus dem Bild. Der kleine Name und das Menü kommen von außen herein.
- Ein Klick auf TILL ESER oder das X führt zur Startansicht.
- Bei einem Seitenwechsel verschwindet der vorhandene Text nach links. Die neue Überschrift kommt von rechts, die Kacheln kommen von unten.
- DESIGN und GRAPHIC zeigen am Computer je neun kleinere Projektkacheln im 3×3-Raster. Auf kleinen Bildschirmen passt sich die Anzahl der Spalten an.
- Die Projektkacheln führen zu einer eigenen Projektansicht mit Überschrift, Textfeld und neun quadratischen Bildfeldern.
- ILLUSTRATION zeigt 25 unterschiedlich proportionierte Bildfelder. Ein Klick öffnet die vergrößerte Ansicht; das Mausrad wechselt das Bild, Escape schließt die Ansicht.

## Später eigene Projekte einfügen

In `projects.js` kannst du pro Projekt `title` (Titel), `description` (Text), `cover` (erstes Bild) und `gallery` (bis zu acht weitere Bilder) ändern. Bilder kannst du beispielsweise in einen neuen Ordner `assets/images/` hochladen und so referenzieren: `assets/images/design-01.jpg`. Ohne Bildpfad bleibt ein Platzhalter sichtbar.

Der CV-Platzhalter steht in `cv.html`; die Kontaktdaten stehen in `contact.html`.
