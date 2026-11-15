/* Router berbasis hash (#beranda, #jurnal, dst) + guard halaman admin */
function route() {
  let r = (location.hash || "#beranda").slice(1);
  setAuth();
  const adm = S.user && S.user.role === "admin";
  if (["prediksi", "admin"].includes(r) && !adm) {
    location.hash = "masuk";
    return;
  }
  document.querySelectorAll(".adm").forEach((a) => (a.hidden = !adm));
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.r === r));
  (
    ({
      beranda: home,
      jurnal: jurnal,
      statistik: stat,
      masuk: login,
      prediksi: predict,
      admin: admin,
    })[r] || home
  )();
  window.scrollTo(0, 0);
}
