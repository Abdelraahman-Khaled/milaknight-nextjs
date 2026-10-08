// Wraps the tables coming from the backend content in a scroll container, so a
// wide table scrolls sideways on mobile instead of breaking the page.
// Companion of app/utils/youtube.js; the styles live in app/content-table.css.
//
// The editor saves tables pasted from Google Docs with a fixed pixel width, an
// inline Arial font and no <thead> (the first row is the header), which the CSS
// overrides.

// Opening and closing tags are wrapped separately, so nested tables stay valid.
export const formatTables = (html) =>
    html
        .replace(/<table\b/gi, '<div class="content-table"><table')
        .replace(/<\/table>/gi, '</table></div>');
