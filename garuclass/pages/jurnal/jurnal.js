/* Halaman Cari Jurnal  (#jurnal): pencarian, filter, kartu/tabel */
function jurnal() {
  app.innerHTML = `<div class="row" style="padding:28px 0 18px"><div><h2>Pencarian &amp; Direktori Jurnal</h2><div class="mut">Eksplorasi direktori jurnal terindeks GARUDA berdasarkan akreditasi, penerbit, dan rumpun ilmu</div></div>
 <div class="row"><div class="seg" id="tabs"></div><div class="seg v" id="views"></div></div></div>
 <div class="card" style="margin-bottom:20px"><input class="in" id="q" placeholder="Cari nama jurnal, kata kunci, ISSN, subjek, atau nama penerbit..." value="${esc(S.q)}">
 <div class="filters"><select id="fsb"><option value="">Semua Subjek / Bidang Ilmu</option>${uniq(
   "sb",
 )
   .map((x) => `<option>${x}</option>`)
   .join("")}</select>
 <select id="fs"><option value="">Semua Akreditasi SINTA</option>${[1, 2, 3].map((x) => `<option value="${x}">SINTA ${x}</option>`).join("")}</select>
 <select id="fp"><option value="">Semua Penerbit / Universitas</option>${uniq("p")
   .map((x) => `<option>${x}</option>`)
   .join("")}</select>
 <select id="fo"><option value="rel">Urutkan: Relevansi Default</option><option value="s">Akreditasi Tertinggi (S1 - S3)</option><option value="a">Jumlah Artikel Terbanyak</option><option value="n">Nama Jurnal (A - Z)</option></select></div>
 <div id="cnt" class="mut" style="font-size:12px;font-weight:600;border-top:1px solid var(--line);margin-top:14px;padding-top:12px"></div></div><div id="res"></div>`;
  $("#fsb").value = S.sb;
  $("#fs").value = S.s;
  $("#fp").value = S.p;
  $("#fo").value = S.o;
  $("#q").oninput = (e) => {
    S.q = e.target.value;
    list();
  };
  [
    ["fsb", "sb"],
    ["fs", "s"],
    ["fp", "p"],
    ["fo", "o"],
  ].forEach(
    ([i, k]) =>
      ($("#" + i).onchange = (e) => {
        S[k] = e.target.value;
        list();
      }),
  );
  list();
}
function list() {
  let r = J.filter((j) => {
    const q = S.q.toLowerCase();
    return (
      (!q || [j.t, j.p, j.sb, j.issn, j.d].join(" ").toLowerCase().includes(q)) &&
      (!S.sb || j.sb === S.sb) &&
      (!S.s || j.s == S.s) &&
      (!S.p || j.p === S.p) &&
      (S.tab === "all" || S.saved.has(j.id))
    );
  });
  if (S.o === "s") r.sort((a, b) => a.s - b.s);
  if (S.o === "a") r.sort((a, b) => b.a - a.a);
  if (S.o === "n") r.sort((a, b) => a.t.localeCompare(b.t));
  $("#tabs").innerHTML =
    `<button data-t="all" class="${S.tab === "all" ? "on" : ""}">Semua (${J.length})</button><button data-t="saved" class="${S.tab === "saved" ? "on" : ""}">🔖 Tersimpan (${S.saved.size})</button>`;
  $("#views").innerHTML =
    `<button data-v="card" class="${S.view === "card" ? "on" : ""}">▦ Kartu</button><button data-v="table" class="${S.view === "table" ? "on" : ""}">☰ Tabel</button>`;
  $("#tabs").onclick = (e) => {
    const t = e.target.dataset.t;
    if (t) {
      S.tab = t;
      list();
    }
  };
  $("#views").onclick = (e) => {
    const v = e.target.dataset.v;
    if (v) {
      S.view = v;
      list();
    }
  };
  $("#cnt").innerHTML =
    `Menampilkan <b style="color:var(--ink)">${r.length}</b> jurnal yang sesuai`;
  const bm = (j) =>
    `<button class="bm ${S.saved.has(j.id) ? "on" : ""}" data-b="${j.id}" aria-label="Simpan jurnal">🔖</button>`;
  const act = (j) =>
    `<a class="btn ghost sm" href="https://garuda.kemdikbud.go.id" target="_blank" rel="noopener">↗ Link Jurnal</a><button class="btn dark sm" data-d="${j.id}">👁 Detail</button>`;
  $("#res").innerHTML = !r.length
    ? `<div class="card mut" style="text-align:center">Tidak ada jurnal yang cocok dengan pencarian Anda.</div>`
    : S.view === "card"
      ? `<div class="grid g3">${r.map((j) => `<div class="card jc"><div class="row"><div><span class="pill s${j.s}">S${j.s}</span> <span class="pill">${esc(j.sb)}</span></div>${bm(j)}</div><h3>${esc(j.t)}</h3><div class="pub">🏛 ${esc(j.p)}</div><p>${esc(j.d)}</p><div class="foot"><span class="issn">ISSN ${j.issn}</span><div style="display:flex;gap:6px">${act(j)}</div></div></div>`).join("")}</div>`
      : `<div class="tbl"><table><thead><tr><th>NAMA JURNAL</th><th>PENERBIT</th><th>ISSN</th><th>SUBJEK</th><th>ARTIKEL</th><th>SINTA</th><th>AKSI</th></tr></thead><tbody>${r.map((j) => `<tr><td><b>${esc(j.t)}</b><div class="mut" style="font-size:11px">${j.f} Kali/Tahun</div></td><td class="mut">${esc(j.p)}</td><td class="issn">${j.issn}</td><td><span class="pill">${esc(j.sb)}</span></td><td><b>${fmt(j.a)}</b></td><td><span class="pill s${j.s}">S${j.s}</span></td><td><div style="display:flex;gap:6px;align-items:center">${bm(j)}${act(j)}</div></td></tr>`).join("")}</tbody></table></div>`;
  $("#res").onclick = (e) => {
    const b = e.target.closest("[data-b]"),
      d = e.target.closest("[data-d]");
    if (b) {
      const id = +b.dataset.b;
      S.saved.has(id) ? S.saved.delete(id) : S.saved.add(id);
      try {
        localStorage.setItem("gc_saved", JSON.stringify([...S.saved]));
      } catch (x) {}
      list();
    }
    if (d) detail(+d.dataset.d);
  };
}
