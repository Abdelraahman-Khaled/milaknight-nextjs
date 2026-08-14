// Helpers for turning TikTok links coming from the backend content into
// responsive embeds. Companion of app/utils/youtube.js.
//
// TikTok's player/v1 endpoint renders the player on its own — no caption block
// bolted underneath — so the embed needs no cropping, no scaling and no facade.
// Leaving autoplay off means it waits for the visitor, and because the press
// lands inside TikTok's own player it counts as a user gesture there, so the
// video starts with sound.

// Extract a TikTok video ID from a full URL or a raw ID. Short links
// (vm./vt.tiktok.com, /t/…) can't be resolved on the client, so they are left
// untouched.
export const getTiktokId = (value) => {
    if (!value) return "";
    const patterns = [
        /tiktok\.com\/(?:@[^/]+\/)?(?:video|photo|embed(?:\/v2)?|player\/v1)\/(\d{6,25})/i,
        /^(\d{6,25})$/,
    ];
    for (const re of patterns) {
        const match = value.match(re);
        if (match) return match[1];
    }
    return "";
};

// Build a TikTok embed from a video ID using TikTok's official iframe player.
// Returns a bare iframe; the generic wrapper in formatContent() detects the
// TikTok src and gives it the portrait container.
export const buildTiktokEmbed = (videoId) => {
    if (!videoId) return "";
    return `<iframe src="https://www.tiktok.com/player/v1/${videoId}?music_info=1&description=1&rel=0" title="TikTok video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
};

// Turn TikTok links inside an HTML string into embeds. Called from
// formatContent() in app/utils/youtube.js.
export const formatTiktokLinks = (htmlContent) => {
    if (!htmlContent) return "";
    let formatted = htmlContent;

    const linkPattern = /(?:https?:\/\/)?(?:www\.|m\.)?tiktok\.com\/(?:@[^/\s"'<]+\/)?(?:video|photo|embed(?:\/v2)?|player\/v1)\/\d{6,25}[^\s"'<)]*/i;

    // Whole embeds first, so their inner links are not rewritten separately.

    // A TikTok iframe pasted from the backend, on any of their endpoints: rebuild
    // it on player/v1 so it gets the clean player too.
    formatted = formatted.replace(
        /<iframe[^>]*src=["'][^"']*tiktok\.com\/(?:embed(?:\/v2)?|player\/v1)\/(\d{6,25})[^"']*["'][^>]*>\s*<\/iframe>/gi,
        (match, id) => buildTiktokEmbed(id) || match
    );

    // The official TikTok <blockquote class="tiktok-embed" cite="..."> snippet
    formatted = formatted.replace(
        /<blockquote[^>]*class=["'][^"']*tiktok-embed[^"']*["'][^>]*>[\s\S]*?<\/blockquote>(?:\s*<script[^>]*tiktok\.com[^>]*><\/script>)?/gi,
        (match) => {
            const idMatch = match.match(/data-video-id=["'](\d{6,25})["']/i) || match.match(/\/video\/(\d{6,25})/i);
            return idMatch ? buildTiktokEmbed(idMatch[1]) || match : match;
        }
    );

    // A TikTok link wrapped in an <a> tag
    formatted = formatted.replace(
        new RegExp(`<a\\b[^>]*href=["'](${linkPattern.source})["'][^>]*>[\\s\\S]*?<\\/a>`, "gi"),
        (match, url) => buildTiktokEmbed(getTiktokId(url)) || match
    );

    // A bare TikTok link in plain text
    formatted = formatted.replace(
        new RegExp(`(^|[\\s>(])(${linkPattern.source})`, "gi"),
        (match, pre, url) => {
            const embed = buildTiktokEmbed(getTiktokId(url));
            return embed ? pre + embed : match;
        }
    );

    return formatted;
};
