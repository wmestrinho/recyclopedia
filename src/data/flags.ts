// Client-side release switches. Keep in step with wrangler.jsonc — a test
// fails the build if VISION_LIVE and the server's VISION_ENABLED disagree.
//
// Tier 3 (photo identification): off until the Card C.0 benchmark is in.
export const VISION_LIVE = false;

// Donate Electronics direct intake (Pit Board E). Off until the owner creates
// the D1 database and binds it (see functions/api/donate.js). Off means the
// form hands off to the donor's email app, as before. Keep in step with
// wrangler.jsonc "DONATE_INTAKE_ENABLED" — a test fails if they disagree.
export const DONATE_INTAKE_LIVE = false;
