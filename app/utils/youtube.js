// Helpers for turning YouTube links coming from the backend content into
// responsive embeds. Shared by the blog and operations detail pages.
// TikTok links are handled by app/utils/tiktok.js and plugged into formatContent.

import { formatTiktokLinks } from "./tiktok";

// Extract a YouTube video ID from a full URL or a raw ID
export const getYoutubeId = (value) => {
    if (!value) return "";
    const patterns = [
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
        /^([A-Za-z0-9_-]{11})$/,
    ];
    for (const re of patterns) {
        const match = value.match(re);
        if (match) return match[1];
    }
    return "";
};

// Build a YouTube embed from a video ID. Shorts get a portrait (9:16) wrapper;
// normal videos return a bare iframe that the generic wrapper handles as 16:9.
export const buildYoutubeEmbed = (videoId, isShort = false) => {
    if (!videoId) return "";
    const iframe = `<iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    return isShort ? `<div class="video-responsive video-short">${iframe}</div>` : iframe;
};

// Normalize the HTML content: decode escaped iframes, convert YouTube/TikTok
// links into embeds and wrap every iframe in a responsive container.
export const formatContent = (htmlContent) => {
    if (!htmlContent) return "";
    let formatted = htmlContent;

    // The backend may store the iframe HTML-escaped (&lt;iframe ...&gt;), which shows
    // up as plain text. Decode any escaped iframe back to a real element first.
    formatted = formatted.replace(/&lt;iframe[\s\S]*?&lt;\/iframe&gt;/gi, (match) =>
        match
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&')
    );

    // Convert a plain YouTube link wrapped in an <a> tag into a responsive embed
    formatted = formatted.replace(
        /<a\b[^>]*href=["'](https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)[A-Za-z0-9_-]{11}[^"']*)["'][^>]*>[\s\S]*?<\/a>/gi,
        (match, url) => buildYoutubeEmbed(getYoutubeId(url), /\/shorts\//i.test(url)) || match
    );

    // Convert a bare YouTube link (plain text) into a responsive embed
    formatted = formatted.replace(
        /(^|[\s>(])((?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)[A-Za-z0-9_-]{11}[^\s<)]*)/gi,
        (match, pre, url) => {
            const embed = buildYoutubeEmbed(getYoutubeId(url), /\/shorts\//i.test(url));
            return embed ? pre + embed : match;
        }
    );

    // Convert TikTok links / embeds into player iframes
    formatted = formatTiktokLinks(formatted);

    // Wrap any bare <iframe> (YouTube / TikTok embeds) in a responsive container —
    // skip ones already wrapped, and give TikTok iframes the portrait container.
    formatted = formatted.replace(
        /(?<!<div class="video-responsive[^"]*">)(<iframe[\s\S]*?<\/iframe>)/gi,
        (match, iframe) => {
            const cls = /tiktok\.com/i.test(iframe)
                ? 'video-responsive video-tiktok'
                : 'video-responsive';
            return `<div class="${cls}">${iframe}</div>`;
        }
    );

    return formatted;
};
