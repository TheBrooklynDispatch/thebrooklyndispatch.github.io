module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/content/articles/*.md").reverse()
  );

  eleventyConfig.addCollection("featured", (api) =>
    api.getFilteredByGlob("src/content/articles/*.md")
      .filter((item) => item.data.featured)
      .reverse()
  );

  eleventyConfig.addFilter("limit", (arr, n) =>
    Array.isArray(arr) ? arr.slice(0, n) : []
  );

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(dateObj)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};