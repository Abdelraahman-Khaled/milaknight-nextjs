const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        // Only run PurgeCSS during production build - NOT during dev
        ...(process.env.NODE_ENV === 'production'
            ? [
                  purgecss({
                      // Scan all these files for used CSS class names
                      content: [
                          './app/**/*.{js,jsx,ts,tsx}',
                          './pages/**/*.{js,jsx,ts,tsx}',
                          './components/**/*.{js,jsx,ts,tsx}',
                          './public/**/*.html',
                      ],
                      // Default Extractor - handles class names with special chars like : / [ ]
                      defaultExtractor: (content) =>
                          content.match(/[\w-/:[\].@!]+/g) || [],

                      // Safelist: CSS classes that are added dynamically (by jQuery/JS)
                      // These will NEVER be purged even if not found in source files
                      safelist: {
                          standard: [
                              // Bootstrap JS dynamic classes
                              /^show$/,
                              /^fade$/,
                              /^collapse$/,
                              /^collapsing$/,
                              /^offcanvas/,
                              /^modal/,
                              /^dropdown/,
                              /^navbar/,
                              /^active$/,
                              /^disabled$/,
                              // Swiper dynamic classes
                              /^swiper/,
                              // Slicknav dynamic classes
                              /^slicknav/,
                              // NProgress bar
                              /^nprogress/,
                              // GSAP animation classes
                              /^gsap/,
                              /^is-/,
                              /^was-/,
                              // Lightbox classes
                              /^yarl/,
                              // Custom animation classes from function.min.js
                              /^image-anime/,
                              /^animated/,
                              /^reveal/,
                              /^loaded/,
                              /^react-preloader/,
                              // yet-another-react-lightbox
                              /^yarl__/,
                          ],
                          deep: [/^data-bs-/],
                      },
                  }),
              ]
            : []),
    ],
};
