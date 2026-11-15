/* Halaman Statistik  (#statistik) */
function stat() {
  const sinta = [
      [1, 412, "3.7"],
      [2, 1428, "12.7"],
      [3, 2650, "23.6"],
      [4, 3410, "30.3"],
      [5, 2295, "20.4"],
      [6, 1050, "9.3"],
    ],
    col = ["#e11d48", "#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#64748b"];
  const tr = [
    [2021, 18.1],
    [2022, 20.4],
    [2023, 22.9],
    [2024, 25.3],
    [2025, 27.6],
    [2026, 29.4],
  ];
  const pubs = [
    ["UI", "Universitas Indonesia", "Depok / Jakarta", 212, 14, "#fbbf24"],
    ["UNDIP", "Universitas Diponegoro", "Semarang", 232, 11, "#2563eb"],
    ["UNAIR", "Universitas Airlangga", "Surabaya", 123, 8, "#eab308"],
    ["UNPAD", "Universitas Padjadjaran", "Bandung", 118, 6, "#e11d48"],
  ];
  const sub = [
    ["Pendidikan", 8912, "#e11d48"],
    ["Manajemen & Bisnis", 7291, "#f43f5e"],
    ["Teknologi Informasi", 6833, "#6366f1"],
    ["Kesehatan Masyarakat", 4210, "#3b82f6"],
    ["Sosial & Politik", 3105, "#10b981"],
  ];
  app.innerHTML = `<div class="row" style="padding:28px 0 18px"><div><h2>Statistik &amp; Analytics GARUDA</h2><div class="mut">Analisis mendalam distribusi akreditasi SINTA, tren publikasi tahunan, dan produktivitas penerbit</div></div><span class="pill" style="background:var(--card);border:1px solid var(--line);color:var(--ink);padding:8px 14px">↗ Pembaruan Data: November 2026</span></div>
 <div class="grid g4">${[
   ["TOTAL ARTIKEL TERINDEKS", "1.482.910", "+18,4% dari tahun lalu"],
   ["JURNAL TERAKREDITASI SINTA", "11.245", "38,2% dari total jurnal"],
   ["RATA-RATA ARTIKEL / JURNAL", "50,4", "Publikasi per tahun"],
   ["OPEN ACCESS (DOAJ)", "94,8%", "Akses terbuka penuh"],
 ]
   .map(
     (x) =>
       `<div class="card stat"><span>${x[0]}</span><b>${x[1]}</b><div class="up">${x[2]}</div></div>`,
   )
   .join("")}</div>
 <div class="grid g2" style="margin-top:18px"><div class="card"><div class="row"><div><b style="font-size:18px">Distribusi Akreditasi SINTA</b><div class="mut" style="font-size:12px">Komposisi peringkat jurnal terakreditasi nasional (S1 - S6)</div></div><span class="pill">11.245 Jurnal</span></div>
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(130px,1fr));margin-top:16px">${sinta.map((x, i) => `<div style="background:var(--soft);border:1px solid var(--line);border-radius:16px;padding:14px"><div class="row"><span class="pill s${x[0]}">SINTA ${x[0]}</span><span class="mut" style="font-size:11px">${x[2]}%</span></div><b style="font-size:22px">${fmt(x[1])}</b><div class="bar2"><i style="width:${x[2]}%;background:${col[i]}"></i></div></div>`).join("")}</div></div>
 <div class="card"><div class="row"><div><b style="font-size:18px">Tren Pertumbuhan Jurnal (2021 - 2026)</b><div class="mut" style="font-size:12px">Akumulasi penambahan jurnal baru terindeks GARUDA</div></div><span class="pill s4">+62,5% (5 Thn)</span></div>
 <div class="cols">${tr.map((x, i) => `<div class="${i === 5 ? "last" : ""}">${x[1]}K<i style="height:${(x[1] / 29.4) * 100 * 0.8}%"></i><span class="mut">${x[0]}</span></div>`).join("")}</div>
 <div class="row" style="background:var(--soft);border-radius:12px;padding:10px 14px;font-size:12px"><span class="mut">Puncak Penambahan Jurnal Baru</span><b>Tahun 2024 (+2.410 Jurnal)</b></div></div></div>
 <div class="grid g2" style="margin-top:18px"><div class="card"><div class="row"><b style="font-size:18px">🏅 Penerbit Terproduktif</b><span class="mut" style="font-size:12px">Terbitan Jurnal</span></div>
 ${pubs.map((x, i) => `<div class="rk"><b class="pill">#${i + 1}</b><div class="av" style="background:${x[5]}">${x[0]}</div><div style="flex:1"><b style="font-size:14px">${x[1]}</b><div class="mut" style="font-size:11px">${x[2]}</div></div><div style="text-align:right"><b style="font-size:13px">${x[3]} Jurnal</b><div class="up" style="font-size:11px">+${x[4]}%</div></div></div>`).join("")}</div>
 <div class="card"><div class="row"><div><b style="font-size:18px">Volume Publikasi per Rumpun Ilmu</b><div class="mut" style="font-size:12px">Klasifikasi jumlah terbitan jurnal ber-ISSN</div></div><span class="pill" style="background:var(--brandsoft);color:var(--brand)">GARUDA Data</span></div>
 ${sub.map((x) => `<div style="margin-top:16px"><div class="row" style="font-size:13px;font-weight:700"><span>${x[0]}</span><span>${fmt(x[1])} Jurnal</span></div><div class="bar2" style="height:12px"><i style="width:${(x[1] / 8912) * 90}%;background:${x[2]}"></i></div></div>`).join("")}</div></div>`;
}
