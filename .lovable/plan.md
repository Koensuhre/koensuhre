# Plan: Portfolio Koen Suhre

## Resultaat
Een complete, responsive Nederlandse portfolio-site die Koen positioneert als webdesigner, developer en multimedia-maker met een duidelijke marketing- en conversiefocus.

## Pagina-opbouw
- Bouw één krachtige, vloeiende homepage met sticky navigatie en scrollvoortgang.
- Voeg de gevraagde onderdelen toe: Home, Over, Diensten, Cases, Aanpak, Reviews, Contact en Footer.
- Maak drie grote, onderscheidende case-presentaties voor webagencytwente.nl, heynoona.nl en werkgenoten.online.
- Voeg een mobiel uitschuifmenu, actieve sectiemarkering en duidelijke contactmomenten toe.

## Visuele richting
- Donkere, editoriale basis met elektrisch blauw, neon-lime en warm koraal als functionele accenten.
- Expressieve groteske koppen, rustige leesbare bodytekst, asymmetrische grids en veel schaalcontrast.
- Eigen gegenereerde beelden voor Koens portret en de drie cases; geen zichtbare dummy-afbeeldingen.
- Subtiele geometrische achtergronden, section dividers en verzorgde hover- en focusstates.

## Interactie
- Lichte scroll-reveals via browser-native observerlogica.
- Subtiele parallax in de openingssectie en vloeiende micro-interacties zonder zware animatiebibliotheek.
- Respecteer `prefers-reduced-motion` en zorg dat alle bediening via toetsenbord werkt.
- Laat het contactformulier lokaal bevestigen dat het bericht klaarstaat, zonder verzenden of opslag te simuleren.

## SEO en kwaliteit
- Semantische structuur met één H1 en logische H2/H3-hiërarchie.
- Unieke Nederlandse titel, beschrijving, Open Graph-gegevens, Twitter Card en canonieke root-URL.
- Beschrijvende alt-teksten, lazy loading voor beelden onder de vouw en toegankelijke labels/focusstijlen.
- Controleer desktop en mobiel visueel en test menu, navigatie en formulierinteractie.

## Technische details
- Werk binnen de bestaande TanStack Start-structuur en Tailwind v4-ontwerptokens.
- Definieer alle kleuren, typografie, schaduwen en animaties centraal in het designsysteem.
- Bouw herbruikbare sectie- en kaartpatronen zonder extra backend of externe gegevensbron.
- Gebruik lokale beeldassets en laad webfonts via de document-head.
