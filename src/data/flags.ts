// Client-side release switches. Keep in step with wrangler.jsonc — a test
// fails the build if VISION_LIVE and the server's VISION_ENABLED disagree.
//
// Tier 3 (photo identification): off until the Card C.0 benchmark is in.
export const VISION_LIVE = false;
