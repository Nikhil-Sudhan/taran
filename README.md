# SpaceKaur website

Six responsive pages in `dist/`. Run `npm start` for http://127.0.0.1:4173. Edit shared page content in `generate.mjs`, then run `npm run build`. Shared styling and interaction code are in `dist/style.css` and `dist/app.js`.

## Content decisions

- Supplied notes establish the peace-through-strength positioning and capability list.
- Company profile checked at https://uk.linkedin.com/company/spacekaur on 6 October 2026: autonomous space/aerospace systems, IIT Madras incubation, Chennai and Birmingham presence.
- Visual references: https://www.raphe.com/ and https://www.anduril.com/. No reference-site assets copied.
- Four products use the exact client supplied model identifiers: Servo Drive / ISHER SKD-I 48/5; Software / PRODIGY S.1; Control Algorithm & Firmware / PRODIGY SKD-I 48/5; High Precision Motor / OASIS SKM-D22. The supplied product illustrations and engineering films replace the product placeholders. No performance specifications have been invented.
- Team profiles use verified names: Tarandeep Singh, Rohan Nakade and Simran Kaur (EngTech MIMechE). Founder/CEO wording is omitted at the client's request. Simran intentionally has a text-only entry, with no photo or pending-photo placeholder. All names link to the user-supplied profiles. Team and mentor cards share the original three-column layout with compact spacing; mentor titles are shortened to Professor & HoD / Assistant Professor, IIT Madras. Light page surfaces use pure white.
- Mentors: Prof. Murthy Haradanahalli S. N. (Professor & Head of the Department, Aerospace Engineering, IIT Madras) and Dr. David Kumar (Assistant Professor, Aerospace Engineering, IIT Madras). Murthy's name is from https://ae.iitm.ac.in/~mhsn/ and his headship from https://ae.iitm.ac.in/contactus/. David's full name and designation are from https://ae.iitm.ac.in/faculty/; his Google Scholar ID is corroborated by IIT Madras's institutional profile at https://iitm.irins.org/profile/485134. Verified 8 October 2026. Other job titles and biographies are omitted where unconfirmed.
- Contact details supplied by the user: info@spacekaur.com, +91 91036 86947 and +91 86260 97531.
- The contact form prepares a mailto draft. It does not store submissions or send mail on a server.
- Helvetica fonts are supplied client assets. Confirm web embedding rights before a public commercial launch. Specter trial files are not included.
- ISA source is 1280 × 720. A higher-resolution original can replace `dist/assets/isa-animation.mp4` without changing code.

## Supplied media

Run `python prepare-showcase-assets.py` to prepare the images and videos from `../imagesandvideosforthewebsite`. Images are WebP; videos use H.264 with fast-start metadata and no audio. The control demonstration uses the first four seconds, as requested in its source filename. Poster frames keep media sections visible before playback.

The homepage includes the motor-and-drive illustration, software/control demonstrations and the motor film. The product page presents every product in a scrolling, alternating layout. Gradient edges blend media into a shared graphite background. The horizontal product selector and carousel controls are removed. The capabilities schematic has been removed. Navigation uses clean directory URLs, with redirects from legacy `.html` URLs.

The IIT Madras section uses only the research and workbench video. The incubation montage uses the 0:42-0:56 excerpt from IITM Research Park's film: https://www.youtube.com/watch?v=QDXf4R0fmE0. `dist/assets/iitm-research-park.mp4` is trimmed to 10 seconds (250 frames at 25 fps). `incubation-montage.mp4` plays 5 seconds of campus, 3 seconds of software development and 2 seconds of control development, without repeating a sequence; total 10 seconds. The ten-second incubation montage loops continuously without playback controls. The source is credited below the video. Run `python prepare-incubation-media.py` with the source excerpt in `../media-review/iitm-research-park-cut.mp4` to rebuild it.

## Accessibility and motion

Semantic navigation, labelled controls, keyboard-operable native capability disclosures, skip link and responsive menu. Parallax and reveals respect reduced-motion settings. Per the client's revision, the homepage film loops continuously without play/pause controls. It retains its original colour beneath a left-to-right black gradient and subtle static film grain; the grain does not add animation. All website films have no playback controls. Product films play only while visible, pause when the tab is hidden, and use their posters instead of automatic playback when reduced motion is requested.

## Checks

With the local server running: `node check-site.mjs`.
