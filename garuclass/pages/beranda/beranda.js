/* Halaman Beranda  (#beranda) */
function home() {
  app.innerHTML = `<section class="hero"><div>
 <span class="pill" style="background:var(--brandsoft);color:var(--brand)">✦ Database Integrasi GARUDA Kemdikbudristek</span>
 <h1>Klasifikasi &amp; Analisis <span>Jurnal Garuda Indonesia</span></h1>
 <p class="mut" style="font-size:17px;max-width:560px">Temukan dan petakan repositori publikasi bereputasi berdasarkan akreditasi SINTA, rumpun ilmu, dan produktivitas penerbit secara akurat.</p>
 <form class="search" id="hs"><input id="hq" placeholder="Cari judul jurnal, ISSN, atau nama penerbit..." aria-label="Cari jurnal"><button class="btn">Cari Jurnal ›</button></form>
 <p style="margin-top:14px"><span class="mut" style="font-size:12px;font-weight:700">Populer:</span> ${["Pendidikan", "Manajemen", "Teknologi Informasi", "SINTA 1"].map((t) => `<button class="tag" data-t="${t}">#${t}</button>`).join("")}</p></div>
 <div class="card"><div class="row"><div><b>GARUDA Live Classifier</b><div class="mut" style="font-size:11px">Akreditasi Terintegrasi</div></div><span class="pill s4">Live Active</span></div>
 ${[J[4], J[1]].map((j) => `<div class="rk" style="display:block"><div class="row"><span class="pill s${j.s}">SINTA ${j.s}</span><span class="issn">ISSN ${j.issn}</span></div><b style="font-size:13px">${esc(j.t)}</b><div class="mut" style="font-size:12px">${esc(j.p)}</div></div>`).join("")}</div></section>
 <section class="grid g4" style="margin:24px 0">${[
   ["TOTAL PENERBIT", "5.161", "↗ +128 Terdaftar Baru", 1],
   ["TOTAL JURNAL", "29.427", "↗ +840 Terbitan Baru", 1],
   ["KATEGORI SUBJEK", "231", "Rumpun Disiplin Ilmu"],
   ["SINTA 1 & 2", "1.840+", "Jurnal Bereputasi"],
 ]
   .map(
     (x) =>
       `<div class="card stat"><span>${x[0]}</span><b>${x[1]}</b><div class="${x[3] ? "up" : "mut"}" style="font-size:12px">${x[2]}</div></div>`,
   )
   .join("")}</section>`;
  $("#hs").onsubmit = (e) => {
    e.preventDefault();
    S.q = $("#hq").value;
    location.hash = "jurnal";
  };
  app.querySelectorAll(".tag").forEach(
    (b) =>
      (b.onclick = () => {
        const t = b.dataset.t;
        S.q = t.startsWith("SINTA") ? "" : t;
        S.s = t.startsWith("SINTA") ? "1" : "";
        location.hash = "jurnal";
      }),
  );
}
