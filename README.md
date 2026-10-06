# SpaceKaur website

Six responsive pages in `dist/`. Run `npm start` for http://127.0.0.1:4173. Edit shared page content in `generate.mjs`, then run `npm run build`. Shared styling and interaction code are in `dist/style.css` and `dist/app.js`.

## Content decisions

- Supplied notes establish the peace-through-strength positioning and capability list.
- Company profile checked at https://uk.linkedin.com/company/spacekaur on 6 October 2026: autonomous space/aerospace systems, IIT Madras incubation, Chennai and Birmingham presence.
- Visual references: https://www.raphe.com/ and https://www.anduril.com/. No reference-site assets copied.
- Product is provisionally labelled Product One. No performance specifications have been invented.
- Team names kept as requested. Roles and full biographies await confirmation; Simran has a text entry because no portrait was supplied.
- Contact details supplied by the user: info@spacekaur.com, +91 91036 86947.
- The contact form prepares a mailto draft. It does not store submissions or send mail on a server.
- Helvetica fonts are supplied client assets. Confirm web embedding rights before a public commercial launch. Specter trial files are not included.
- ISA source is 1280 × 720. A higher-resolution original can replace `dist/assets/isa-animation.mp4` without changing code.

## Accessibility and motion

Semantic navigation, labelled controls, keyboard-operable native capability disclosures, skip link, responsive menu, video pause button, and reduced-motion support. Parallax uses native scrolling and transforms.

## Checks

With the local server running: `node check-site.mjs`.
