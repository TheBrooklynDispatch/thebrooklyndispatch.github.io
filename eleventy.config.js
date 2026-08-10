module.exports = function(eleventyConfig) {

  // Copy static files directly into the built site
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });


  // All articles
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/articles/*.md");
  });


  // Featured articles
  eleventyConfig.addCollection("featured", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/articles/*.md")
      .filter((item) => item.data.featured);
  });


  // Sort any collection newest → oldest
  eleventyConfig.addFilter("sortByPublishedDate", function(items) {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.data.date || a.date);
      const dateB = new Date(b.data.date || b.date);

      return dateB - dateA;
    });
  });


  // Limit arrays
  eleventyConfig.addFilter("limit", (arr, n) => {
    return Array.isArray(arr) ? arr.slice(0, n) : [];
  });


  // Format dates as "August 10, 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(dateObj);
  });


  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      data: "_data"
    },

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };

};