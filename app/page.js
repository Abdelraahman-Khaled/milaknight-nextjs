// app/page.tsx (Next.js App Router)
import fs from "fs";
import path from "path";
import HomeScripts from "./components/HomeScripts";

export default async function HomePage() {
  // Get absolute path to the HTML file
  const filePath = path.join(process.cwd(), "public/index.html");

  // Read file content (server-side only)
  let htmlContent = fs.readFileSync(filePath, "utf8");

  // Extract content inside <body>...</body> to avoid invalid nesting
  const bodyStartTag = "<body";
  const bodyEndTag = "</body>";

  const bodyStartIndex = htmlContent.toLowerCase().indexOf(bodyStartTag);
  const bodyEndIndex = htmlContent.toLowerCase().lastIndexOf(bodyEndTag);

  if (bodyStartIndex !== -1 && bodyEndIndex !== -1) {
    // Find the end of the opening <body> tag
    const bodyContentStart = htmlContent.indexOf(">", bodyStartIndex) + 1;
    if (bodyContentStart > 0 && bodyContentStart < bodyEndIndex) {
      htmlContent = htmlContent.substring(bodyContentStart, bodyEndIndex);
    }
  } else {
    console.warn("Could not find <body> tags in index.html");
  }

  // Remove the static preloader to avoid duplication/stuck state
  // We use a robust replacement or simple string replace if the content is static.
  // Since we know the exact structure, we can try to replace it.
  // However, regex with nested divs is tricky.
  // Let's try to match the specific known content of the preloader.
  const preloaderRegex = /<div class="preloader">[\s\S]*?<\/div>\s*<\/div>/;
  // Note: The preloader has 3 closing divs: 
  // 1. .loading (self closing? no <div class="loading"></div>)
  // 2. .loading-container
  // 3. .preloader

  // Let's check the content again.
  // <div class="preloader">
  //   <div class="loading-container">
  //     <div class="loading"></div>
  //     <div id="loading-icon">
  //       <img alt="Milaknight loader" src="images/icons/loader.svg" />
  //     </div>
  //   </div>
  // </div>

  // Regex to match this liberally but safely?
  // Maybe just hiding it via style injection is safer if we aren't 100% sure of regex?
  // But removing is better.

  // Let's use a replace that targets the opening class and enough context.
  htmlContent = htmlContent.replace(
    /<div class="preloader">[\s\S]*?alt="Milaknight loader"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    ""
  );

  // Also strip any script tags that might cause double loading if they weren't in the body or were part of the extracted chunk
  // (Optional, but safe practice if HomeScripts handles them)
  // htmlContent = htmlContent.replace(/<script src="js\/.*?"><\/script>/g, "");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} suppressHydrationWarning />
      <HomeScripts />
    </>
  );
}
