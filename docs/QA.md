# Verification — 2026-10-20

- Original template syntax command passed: `node --check app.js && node --check business.js`.
- Original Forme checkout remains clean (`git status --short` returned no changes).
- Browser visually inspected at 320 × 740, 768 × 1024, and 1440 × 1000, including hero/contact layouts.
- Additional document-width checks passed at 390 × 693, 1024 × 768, 1920 × 1080 and 2560 × 1080. No horizontal overflow. These additional sizes were geometry checks, not full visual inspections.
- All internal fragment links resolve. Navigation and mobile menu open/close work; menu selection closes it.
- All-work and Wedding-decor filters update pressed state and live count. Only the verified mandap feature appears.
- Keyboard Enter opens project detail; Escape closes it and restores focus to its card. Privacy dialog opens/closes correctly.
- Service-specific enquiry selects the matching occasion. Message helper includes date/venue, copies successfully, and does not submit a request.
- Actual primary Instagram link opened the official GS Event Decor profile, where the Message button is visible. No Message button was pressed; no communication sent.
- Browser-back restored inputs initially disagreed with the draft. Fixed with pageshow regeneration and regeneration before copy; retested browser-back and confirmed consistent output.
- No browser warnings/errors observed. No stock/Instagram images downloaded or embedded.
- Reduced-motion CSS disables animations/transitions and smooth scrolling; inspected in code, not OS-emulated in the browser.
- Current gallery is a source-linked text feature. No licensed owner photo gallery can be visually validated until approved media arrives.
- No deployment, domain, email delivery or booking confirmation tested/enabled. Preview is noindex and robots-disallowed.

## Instagram image update — 2026-10-20

Supersedes the initial no-images state above. Three requester-authorized local Instagram post covers added. Syntax checks passed; desktop hero and full-image gallery visually inspected at 1440 × 1000. Mobile image loading and no horizontal overflow verified at 390 × 844. Gallery Enter/Escape and image loading passed. Owner public-use approval remains pending.

2026-10-20 editorial update: expanded to nine Instagram-sourced images; all source URLs and local-preview permissions are in business.js. Added Stages / Ceremony settings / Aisles & details filters. Checked filter counts, Enter/Escape gallery interaction, mobile menu, copy-message success, and actual contact navigation to the official Instagram profile. Inspected 390px mobile, 768px tablet and 1440px desktop; 320px geometry also has no horizontal overflow. Syntax check passed. Public media permission remains pending; no publication or business messages sent.
