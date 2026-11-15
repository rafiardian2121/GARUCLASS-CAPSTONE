/* Autentikasi DEMO + tombol Masuk/Keluar di header */
const DEMO = {
  email: "admin@garuclass.id",
  pw: "admin12345",
}; /* DEMO saja: ganti dengan autentikasi backend (POST /api/auth/login + JWT) */
function setAuth() {
  const u = S.user,
    a = $("#auth");
  a.textContent = u ? "\u{1F464} " + u.name + " \u00b7 Keluar" : "\u{1F464} Masuk / Daftar";
  a.href = u ? "#beranda" : "#masuk";
  a.onclick = u
    ? (e) => {
        e.preventDefault();
        S.user = null;
        location.hash = "beranda";
        route();
      }
    : null;
}
