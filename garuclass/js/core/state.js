/* State aplikasi (filter, tab, bookmark, user login) */
const S = {
  q: "",
  sb: "",
  s: "",
  p: "",
  o: "rel",
  tab: "all",
  view: "card",
  saved: new Set([2, 5]),
  mode: "masuk",
  user: null,
};
try {
  const v = JSON.parse(localStorage.getItem("gc_saved") || "null");
  if (Array.isArray(v)) S.saved = new Set(v);
} catch (e) {}
