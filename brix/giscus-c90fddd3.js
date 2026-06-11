// GitHub-backed comments via giscus (https://giscus.app), injected under each
// chapter's content. Loaded through `additional-js` in book.toml, so this runs
// on every page. Comments are stored as GitHub Discussions in the repo below.
//
// TODO: fill in data-repo-id and data-category-id. Get them from
// https://giscus.app — enter the repo, pick the Discussions category, and copy
// the two generated IDs. (Discussions is already enabled; the giscus GitHub App
// must also be installed on the repo: https://github.com/apps/giscus)
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;
  const s = document.createElement("script");
  s.src = "https://giscus.app/client.js";
  s.setAttribute("data-repo", "dcherian/dcherian.github.io");
  s.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnk3OTI4NjM0NA==");
  s.setAttribute("data-category", "Announcements");
  s.setAttribute("data-category-id", "DIC_kwDOBLnQSM4C-mIi");
  s.setAttribute("data-mapping", "pathname"); // one discussion per chapter
  s.setAttribute("data-strict", "1");
  s.setAttribute("data-reactions-enabled", "1");
  s.setAttribute("data-emit-metadata", "0");
  s.setAttribute("data-input-position", "top");
  s.setAttribute("data-theme", "preferred_color_scheme");
  s.setAttribute("data-lang", "en");
  s.crossOrigin = "anonymous";
  s.async = true;
  main.appendChild(s);
});
