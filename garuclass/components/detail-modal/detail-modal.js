/* Modal detail jurnal: kutipan APA/IEEE/BibTeX + jurnal serupa */
function cite(j, f) {
  const y = 2026;
  return f === "APA"
    ? `${j.p}. (${y}). ${j.t}. GaruClass Database, ISSN: ${j.issn}.`
    : f === "IEEE"
      ? `${j.p}, “${j.t},” GaruClass Database, ISSN ${j.issn}, ${y}.`
      : `@misc{garuclass${j.id},\n  title={${j.t}},\n  publisher={${j.p}},\n  issn={${j.issn}},\n  year={${y}}\n}`;
}
function detail(id) {
  const j = J.find((x) => x.id === id);
  let f = "APA";
  const m = document.createElement("div");
  m.className = "dim";
  const draw = () => {
    m.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="row" style="align-items:flex-start"><div><span class="pill s${j.s}">S${j.s}</span> <span class="issn">ISSN ${j.issn}</span></div><button id="x" aria-label="Tutup" style="font-size:20px">✕</button></div>
 <h2 style="font-size:24px;margin-top:10px">${esc(j.t)}</h2><div class="pub">🏛 ${esc(j.p)} · ${esc(j.sb)} · ${fmt(j.a)} artikel</div>
 <div style="background:var(--soft);border:1px solid var(--line);border-radius:16px;padding:14px;margin:18px 0"><div class="row"><b style="font-size:13px">❝ Kutip Jurnal Ini</b><div class="seg">${["APA", "IEEE", "BibTeX"].map((x) => `<button data-f="${x}" class="${x === f ? "on" : ""}" style="padding:4px 10px">${x}</button>`).join("")}</div></div>
 <pre>${esc(cite(j, f))}</pre><button id="cp" style="color:var(--brand);font-weight:700;font-size:12px">⧉ Salin Format Kutipan</button></div>
 <div style='margin-bottom:16px'><b style='font-size:13px'>Jurnal Serupa <span class='mut'>(TF-IDF + cosine similarity)</span></b>${similar(
   j,
 )
   .map(
     (s) =>
       `<button data-sim='${s.j.id}' class='rk' style='width:100%;text-align:left'><div style='flex:1'><b style='font-size:13px'>${esc(s.j.t)}</b><div class='mut' style='font-size:11px'>${esc(s.j.p)}</div></div><b class='pill s4'>${Math.round(s.c * 100)}%</b></button>`,
   )
   .join(
     "",
   )}</div><a class="btn" style="width:100%;justify-content:center" href="https://garuda.kemdikbud.go.id" target="_blank" rel="noopener">Buka di Portal GARUDA ↗</a></div>`;
    m.querySelectorAll("[data-f]").forEach(
      (b) =>
        (b.onclick = (e) => {
          e.stopPropagation();
          f = b.dataset.f;
          draw();
        }),
    );
    $("#x", m).onclick = close;
    m.querySelectorAll("[data-sim]").forEach(
      (b) =>
        (b.onclick = (e) => {
          e.stopPropagation();
          close();
          detail(+b.dataset.sim);
        }),
    );
    $("#cp", m).onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard
        ?.writeText(cite(j, f))
        .then(() => (e.target.textContent = "✓ Tersalin"))
        .catch(() => {});
    };
  };
  const close = () => {
      m.remove();
      document.removeEventListener("keydown", k);
    },
    k = (e) => e.key === "Escape" && close();
  m.onclick = (e) => {
    if (e.target === m) close();
  };
  document.addEventListener("keydown", k);
  draw();
  document.body.appendChild(m);
}
