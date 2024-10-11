export function seo(data = {}) {
  data.title = data.title || "UPM of Namibia";
  data.metaDescription =
    data.metaDescription || "United People's Movement party of Namibia";

  document.title = data.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", data.metaDescription);
}
