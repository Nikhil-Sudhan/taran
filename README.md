# SpaceKaur website

Six responsive pages in `dist/`. Run `npm start` for http://127.0.0.1:4173. Edit shared page content in `generate.mjs`, then run `npm run build`. Shared styling and interaction code are in `dist/style.css` and `dist/app.js`.

## Content decisions

- Supplied notes establish the peace-through-strength positioning and capability list.
- Company profile checked at https://uk.linkedin.com/company/spacekaur on 6 October 2026: autonomous space/aerospace systems, IIT Madras incubation, Chennai and Birmingham presence.
- Visual references: https://www.raphe.com/ and https://www.anduril.com/. No reference-site assets copied.
- Four products use the exact client supplied model identifiers: Servo Drive / ISHER SKD-I 48/5; Software / PRODIGY S.1; Control Algorithm & Firmware / PRODIGY SKD-I 48/5; High Precision Motor / OASIS SKM-D22. Product image placeholders remain. No performance specifications have been invented.
- Team names kept as requested. Roles and full biographies await confirmation. Simran's portrait can be added as `dist/assets/simran.webp`, then regenerated with `npm run build`.
- Contact details supplied by the user: info@spacekaur.com, +91 91036 86947.
- The contact form prepares a mailto draft. It does not store submissions or send mail on a server.
- Helvetica fonts are supplied client assets. Confirm web embedding rights before a public commercial launch. Specter trial files are not included.
- ISA source is 1280 × 720. A higher-resolution original can replace `dist/assets/isa-animation.mp4` without changing code.

## Accessibility and motion

Semantic navigation, labelled controls, keyboard-operable native capability disclosures, skip link and responsive menu. Parallax and reveals respect reduced-motion settings. Per the client's revision, the homepage film loops continuously without play/pause controls.

## Checks

With the local server running: `node check-site.mjs`.
