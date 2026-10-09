# SpaceKaur website

Six responsive pages in `dist/`. Run `npm start` for http://127.0.0.1:4173. Edit shared page content in `generate.mjs`, then run `npm run build`. Shared styling and interaction code are in `dist/style.css` and `dist/app.js`.

## Content decisions

- Supplied notes establish the peace-through-strength positioning and capability list.
- Company profile checked at https://uk.linkedin.com/company/spacekaur on 6 October 2026: autonomous space/aerospace systems, IIT Madras incubation, Chennai and Birmingham presence.
- Visual references: https://www.raphe.com/ and https://www.anduril.com/. No reference-site assets copied.
- Three product sections retain the client supplied identifiers: ISHER SKD-I 48/5; PRODIGY, combining Software / PRODIGY S1 and Control Algorithms & Firmware / PRODIGY SKD-I 48/5; and OASIS SKM-D22. Hardware uses transparent PNG cutouts of the supplied product illustrations. No performance specifications have been invented. `product-image-edits.json` records the built-in image edit prompts and output paths.
- Team profiles use verified names: Tarandeep Singh, Rohan Nakade and Simran Kaur (EngTech MIMechE). The client-supplied titles are Founder | CEO and Chief Engineer for Tarandeep, Co-founder | CTO and CEO for Rohan, and Founding Team Member for Simran. Simran intentionally has a text-only entry, with no photo or pending-photo placeholder. All names link to the user-supplied profiles. Team and mentor cards share the original three-column layout with compact spacing; mentor titles are shortened to Professor & HoD / Assistant Professor, IIT Madras. Light page surfaces use pure white.
- Mentors: Prof. Murthy Haradanahalli S. N. (Professor & Head of the Department, Aerospace Engineering, IIT Madras) and Dr. David Kumar (Assistant Professor, Aerospace Engineering, IIT Madras). Murthy's name is from https://ae.iitm.ac.in/~mhsn/ and his headship from https://ae.iitm.ac.in/contactus/. David's full name and designation are from https://ae.iitm.ac.in/faculty/; his Google Scholar ID is corroborated by IIT Madras's institutional profile at https://iitm.irins.org/profile/485134. Verified 8 October 2026. Other job titles and biographies are omitted where unconfirmed.
- Contact details supplied by the user: info@spacekaur.com, +91 91036 86947 and +91 86260 97531.
- The contact form prepares a mailto draft. It does not store submissions or send mail on a server.
- Helvetica fonts are supplied client assets. Confirm web embedding rights before a public commercial launch. Specter trial files are not included.
- ISA source is 1280 × 720. A higher-resolution original can replace `dist/assets/isa-animation.mp4` without changing code.

## Supplied media

Run `python prepare-showcase-assets.py` to prepare the original images and videos from `../imagesandvideosforthewebsite`. Original images are WebP; the product page uses separate transparent PNG cutouts. Videos use H.264 with fast-start metadata and no audio. The combined PRODIGY section contains text only, with no videos or still images.

The homepage is intentionally concise: the main hero, one mission statement, the OASIS motor film and a contact prompt. The product page alternates desktop columns: hardware titles on the left with transparent images on the right, then the combined PRODIGY title on the right with its software and firmware details on the left. Mobile sections stack the title before the content. The motor film appears only on the homepage. The horizontal product selector and carousel controls are removed. The Simulink model appears as a compact rounded thumbnail beside Computational Modeling in the first capability disclosure. Navigation uses clean directory URLs, with redirects from legacy `.html` URLs.

The homepage headline and supporting copy are shortened. The OASIS film fills the page width without side gutters. Media overlay labels are removed, including the incubation video caption; only the two mentor portrait badges remain. Tarandeep and Rohan have no number badges, and Simran's entry has no SpaceKaur label.

The IIT Madras section uses only the research and workbench video. The incubation montage uses the 0:42-0:56 excerpt from IITM Research Park's film: https://www.youtube.com/watch?v=QDXf4R0fmE0. `dist/assets/iitm-research-park.mp4` is trimmed to 10 seconds (250 frames at 25 fps). `incubation-montage.mp4` plays 2 seconds of control development (the engineer at work), 5 seconds of IIT Madras aerial footage, then 3 seconds of Prodigy S.1 software, without repeating a sequence; total 10 seconds. Its poster matches the opening control clip. The ten-second incubation montage loops continuously without playback controls. The source is credited below the video. Run `python prepare-incubation-media.py` with the source excerpt in `../media-review/iitm-research-park-cut.mp4` to rebuild it.

## Accessibility and motion

Semantic navigation, labelled controls, keyboard-operable native capability disclosures, skip link and responsive menu. Parallax and reveals respect reduced-motion settings. Per the client's revision, the homepage film loops continuously without play/pause controls. It retains its original colour beneath a left-to-right black gradient and subtle static film grain; the grain does not add animation. All website films have no playback controls. Product films play only while visible, pause when the tab is hidden, and use their posters instead of automatic playback when reduced motion is requested.

## Checks

With the local server running: `node check-site.mjs`.

## Full-screen scroll pacing

Home hero, conviction and motion feature now occupy separate viewport-height chapters. The motor headline overlays the film with a left-side gradient. Each product also has its own full-screen chapter, with a full-height catalogue introduction. Matching the supplied Loft Lab reference, a native sticky hold adds 60% of a viewport of scroll travel on home and product, including phones: each chapter occupies 160% of the viewport, with its content pinned full-screen for the first 60%. Reduced motion and content taller than the viewport disable the hold. No wheel, touch or keyboard events are intercepted.

The Capabilities connected-disciplines hardware section also fills the viewport and uses the same native scroll hold. Its complete assembly image stays visible, with a stacked image and copy layout on phones.

## Home page client revision — 9 October 2026

The home header is transparent over the hero's left-to-right black-to-transparent gradient. The headline reads “Proud to build critical subsystems for India's first smart ammunition.” The conviction chapter uses Taran's quote, “The question is not ‘if.’ The question is ‘how?’ Because there is always a way.” attributed to “~ Taran, Founder and CEO of SPACEKAUR.” Eyebrow labels and decorative plus signs are removed throughout the site; capability disclosures use chevrons. The home film links to the product catalogue with “View Products.” Its video and poster use a 1280 × 560 crop from the top edge of the original 1280 × 720 film to exclude the embedded slogan and Gemini watermark. The original film remains available, and prepare-showcase-assets.py regenerates the cropped files.

## Continuous scrolling and Careers

Preserve the native pass-and-hold effect unless the user explicitly requests its removal. The home videos and product chapters retain their 60svh sticky hold, with reduced-motion and oversized-content safeguards. The motor video uses an explicit sticky rule so its section styling cannot disable the hold. The Careers page is linked from the main navigation. Its confirmed email is careers@spacekaur.com. Join the Team is a disabled placeholder, as requested, until the client supplies the Google Form URL; replace the disabled button with an external link when that URL arrives.

## Team, About and footer revision — 9 October 2026

Team and mentor portraits retain visible colour through a restrained CSS grade (78% saturation, 96% contrast and brightness). The white background is retained. The About incubation tagline is removed and its location copy reads India and UK. The shared site footer is approximately 34% shorter at 1280px, with compact India and UK SVG flags replacing city/country text; accessible country names remain available. Footer rules target only the body-level footer to preserve the founder quote styling.
