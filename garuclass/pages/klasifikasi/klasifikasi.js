/* Halaman Klasifikasi Subjek  (#prediksi) - hanya admin */
const K = {
  "Teknik dan Rekayasa": "teknik rekayasa mesin sipil listrik konstruksi material energi industri",
  "Ilmu Komputer dan Informatika":
    "komputer informatika software sistem data algoritma jaringan learning kecerdasan buatan aplikasi digital cybersecurity",
  "Kesehatan dan Kedokteran":
    "kesehatan kedokteran penyakit pasien klinis epidemiologi gizi farmasi keperawatan",
  "Pertanian dan Peternakan": "pertanian peternakan tanaman pangan padi ternak agribisnis tanah",
  "Ekonomi dan Bisnis": "ekonomi bisnis manajemen keuangan pemasaran akuntansi investasi",
  Pendidikan: "pendidikan pembelajaran siswa guru kurikulum sekolah mahasiswa pedagogi",
  Hukum: "hukum undang peraturan pidana perdata keadilan",
  "Ilmu Sosial dan Humaniora":
    "sosial politik budaya masyarakat sejarah bahasa sastra komunikasi pemerintahan",
  "Matematika dan Sains": "matematika fisika kimia biologi statistika sains",
  Lainnya: "",
};
function predict() {
  app.innerHTML = `<div style='padding:28px 0 18px'><h2>Klasifikasi Subjek Otomatis</h2><div class='mut'>Tempel judul dan abstrak jurnal untuk memprediksi bidang ilmu (10 kelas, C300 bagian Kecerdasan Buatan)</div></div><div class='grid g2'><div class='card'><textarea id='tx' class='in' rows='7' placeholder='Judul / abstrak / kata kunci jurnal...'></textarea><div class='row' style='margin-top:12px'><button class='btn ghost' id='ex'>Isi contoh</button><button class='btn' id='go'>Prediksi Subjek ›</button></div><div id='out' style='margin-top:16px'></div><p class='mut' style='font-size:11px'>Demo: skor berbasis kata kunci di browser. Model Random Forest/Naive Bayes/SVM yang sebenarnya dipanggil lewat POST /api/classify.</p></div><div class='card'><b style='font-size:18px'>Evaluasi Model (data uji)</b><div class='tbl' style='margin-top:12px'><table style='min-width:0'><thead><tr><th>Model</th><th>Acc</th><th>Prec</th><th>Recall</th><th>F1</th></tr></thead><tbody><tr><td><b>Random Forest + TF-IDF</b></td><td>91,30%</td><td>90,85%</td><td>91,30%</td><td>90,97%</td></tr><tr><td>Naive Bayes</td><td colspan='4' class='mut'>menunggu evaluasi</td></tr><tr><td>SVM</td><td colspan='4' class='mut'>menunggu evaluasi</td></tr></tbody></table></div></div></div>`;
  $("#ex").onclick = () =>
    ($("#tx").value =
      "Pengembangan media pembelajaran interaktif untuk meningkatkan hasil belajar siswa sekolah dasar pada kurikulum merdeka");
  $("#go").onclick = () => {
    const t = tok($("#tx").value.replace(/[0-9]/g, "")).join(" ");
    if (!t.trim()) {
      $("#out").innerHTML = "<span class='err'>Masukkan teks terlebih dahulu.</span>";
      return;
    }
    const sc = Object.entries(K).map(([k, w]) => [
        k,
        w ? w.split(" ").reduce((s, x) => s + (t.split(x).length - 1), 0) : 0,
      ]),
      sum = sc.reduce((s, x) => s + x[1] + 0.3, 0);
    $("#out").innerHTML = sc
      .map(([k, v]) => [k, (v + 0.3) / sum])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(
        ([k, p], i) =>
          `<div style='margin-top:10px'><div class='row' style='font-size:13px;font-weight:700'><span>${i === 0 ? "✓ " : ""}${k}</span><span>${(p * 100).toFixed(1)}%</span></div><div class='bar2'><i style='width:${p * 100}%;background:${i ? "#94a3b8" : "#e11d48"}'></i></div></div>`,
      )
      .join("");
  };
}
