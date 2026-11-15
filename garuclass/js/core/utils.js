/* Helper umum: $, esc, fmt, app */
const $ = (s, r = document) => r.querySelector(s),
  esc = (x) =>
    String(x).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
const fmt = (n) => n.toLocaleString("id-ID");
const app = $("#app");
