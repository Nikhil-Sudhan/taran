# SpaceKaur website

Six responsive pages in `dist/`. Run `npm start` for http://127.0.0.1:4173. Edit shared page content in `generate.mjs`, then run `npm run build`. Shared styling and interaction code are in `dist/style.css` and `dist/app.js`.

## Content decisions

- Supplied notes establish the peace-through-strength positioning and capability list.
- Company profile checked at https://uk.linkedin.com/company/spacekaur on 6 October 2026: autonomous space/aerospace systems, IIT Madras incubation, Chennai and Birmingham presence.
- Visual references: https://www.raphe.com/ and https://www.anduril.com/. No reference-site assets copied.
- Four products use the exact client supplied model identifiers: Servo Drive / ISHER SKD-I 48/5; Software / PRODIGY S.1; Control Algorithm & Firmware / PRODIGY SKD-I 48/5; High Precision Motor / OASIS SKM-D22. The supplied product illustrations and engineering films replace the product placeholders. No performance specifications have been invented.
- Team names kept as requested. Roles and full biographies await confirmation. Simran's portrait can be added as `dist/assets/simran.webp`, then regenerated with `npm run build`.
- Contact details supplied by the user: info@spacekaur.com, +91 91036 86947.
- The contact form prepares a mailto draft. It does not store submissions or send mail on a server.
- Helvetica fonts are supplied client assets. Confirm web embedding rights before a public commercial launch. Specter trial files are not included.
- ISA source is 1280 × 720. A higher-resolution original can replace `dist/assets/isa-animation.mp4` without changing code.

## Supplied media

Run `python prepare-showcase-assets.py` to prepare the images and videos from `../imagesandvideosforthewebsite`. Images are WebP; videos use H.264 with fast-start metadata and no audio. The control demonstration uses the first four seconds, as requested in its source filename. Poster frames keep media sections visible before playback.

The homepage includes the motor-and-drive illustration, software/control demonstrations and the motor film. The product page uses a shared media canvas with horizontal product tabs, crossfades, keyboard navigation and working product deep links. OASIS includes a product/film selector in the same canvas. Without JavaScript, all products remain readable in sequence. The capabilities page includes the supplied Simulink architecture diagram with a full-size view.

The incubation collage uses the 0:42-0:56 excerpt from IITM Research Park's film: https://www.youtube.com/watch?v=QDXf4R0fmE0. `dist/assets/iitm-research-park.mp4` is exactly 14 seconds (350 frames at 25 fps). `incubation-montage.mp4` alternates 7 seconds of campus, 4 seconds of software development, the remaining 7 seconds of campus, and 4 seconds of control development; total 22 seconds. The source is credited beside the collage. Run `python prepare-incubation-media.py` with the source excerpt in `../media-review/iitm-research-park-cut.mp4` to rebuild it.

## Accessibility and motion

Semantic navigation, labelled controls, keyboard-operable native capability disclosures, skip link and responsive menu. Parallax and reveals respect reduced-motion settings. Per the client's revision, the homepage film loops continuously without play/pause controls. It retains its original colour beneath a left-to-right black gradient and subtle static film grain; the grain does not add animation. New product films have native playback controls, play only while visible, pause when the tab is hidden, and use their posters instead of automatic playback when reduced motion is requested.

## Checks

With the local server running: `node check-site.mjs`.
