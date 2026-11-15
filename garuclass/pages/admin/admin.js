/* Halaman Dashboard Admin  (#admin) - hanya admin */
const ROLES = {
  Administrator: [
    "Kelola user & konfigurasi",
    "Akuisisi & ETL",
    "Klasifikasi",
    "Dashboard & laporan",
  ],
  "Data Engineer": ["Akuisisi & ETL", "Database"],
  "Pengelola Jurnal": ["Data jurnal & klasifikasi"],
  "Stakeholder (RKAT)": ["Dashboard & laporan"],
  "User Umum": ["Dashboard publik (view-only)"],
};
const ST = [
    "Harvest OAI-PMH",
    "Data cleaning",
    "Normalisasi metadata",
    "Deduplikasi",
    "Klasifikasi ML",
    "Simpan ke MySQL",
  ],
  EP = [
    ["GET", "/api/journals", "getJournal()"],
    ["GET", "/api/journals/:id", "getJournalDetail()"],
    ["PUT", "/api/journals/:id", "updateJournal()"],
    ["DELETE", "/api/journals/:id", "deleteJournal()"],
    ["GET", "/api/dashboard", "getDashboard()"],
    ["GET", "/api/publishers/stats", "getPublisherStats()"],
    ["GET", "/api/subjects/stats", "getSubjectStats()"],
    ["POST", "/api/classify", "classifyJournal()"],
    ["POST", "/api/auth/login", "login()"],
    ["POST", "/api/auth/register", "register()"],
  ];
function admin() {
  clearInterval(window._t);
  S.role = "Administrator";
  const P = ROLES[S.role],
    ok = P.includes("Akuisisi & ETL");
  app.innerHTML = `<div class='row' style='padding:28px 0 18px'><div><h2>Dashboard Admin &amp; Data Engineer</h2><div class='mut'>Monitoring pipeline akuisisi data dan hak akses berbasis peran (RBAC)</div></div><span class='pill s4'>Login: Administrator</span></div><div class='card'><b>Hak akses: </b>${P.map((x) => `<span class='pill s4'>${x}</span>`).join(" ")}</div>${ok ? `<div class='card' style='margin-top:18px'><div class='row'><b style='font-size:18px'>Pipeline Akuisisi &amp; ETL <span class='mut' style='font-size:12px'>(simulasi)</span></b><button class='btn' id='run'>▶ Jalankan Akuisisi</button></div><div id='stp' class='grid' style='grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-top:14px'></div><pre id='lg' style='max-height:150px;overflow:auto'>Menunggu proses dijalankan...</pre></div>` : `<div class='card mut' style='margin-top:18px'>Akses ditolak: peran ini tidak memiliki izin menjalankan pipeline.</div>`}<div class='card' style='margin-top:18px'><b style='font-size:18px'>Endpoint REST API</b> <span class='mut' style='font-size:12px'>(C300 Tabel 3.9)</span><div class='tbl' style='margin-top:12px'><table style='min-width:0'><thead><tr><th>Method</th><th>Endpoint</th><th>Fungsi</th></tr></thead><tbody>${EP.map((e) => `<tr><td><span class='pill ${e[0] === "GET" ? "s4" : e[0] === "DELETE" ? "s1" : "s2"}'>${e[0]}</span></td><td class='issn'>${e[1]}</td><td>${e[2]}</td></tr>`).join("")}</tbody></table></div></div>`;
  const paint = (n) => {
    $("#stp").innerHTML = ST.map(
      (s, i) =>
        `<div style='background:var(--soft);border-radius:14px;padding:12px;font-size:12px;font-weight:700'><span class='pill ${i < n ? "s4" : i === n ? "s5" : ""}'>${i < n ? "Selesai" : i === n ? "Proses" : "Menunggu"}</span><div style='margin-top:6px'>${s}</div></div>`,
    ).join("");
  };
  if (ok) {
    paint(-1);
    $("#run").onclick = () => {
      let n = 0;
      clearInterval(window._t);
      $("#lg").textContent = "";
      paint(0);
      window._t = setInterval(() => {
        if (!$("#lg")) {
          clearInterval(window._t);
          return;
        }
        $("#lg").textContent +=
          "[" + new Date().toLocaleTimeString("id-ID") + "] " + ST[n] + " selesai\n";
        n++;
        paint(n);
        if (n >= ST.length) {
          clearInterval(window._t);
          $("#lg").textContent += "Pipeline selesai.\n";
        }
      }, 800);
    };
  }
}
