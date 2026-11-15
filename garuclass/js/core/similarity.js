/* Rekomendasi jurnal serupa: TF-IDF + cosine similarity */
const tok = (s) => s.toLowerCase().match(/[a-z]{4,}/g) || [];
function similar(j) {
  const D = J.map((x) => tok([x.t, x.sb, x.sb, x.d].join(" "))),
    df = {};
  D.forEach((d) => new Set(d).forEach((w) => (df[w] = (df[w] || 0) + 1)));
  const vec = (d) => {
      const v = {};
      d.forEach((w) => (v[w] = (v[w] || 0) + Math.log((J.length + 1) / (df[w] + 1)) + 1));
      return v;
    },
    nrm = (v) => Math.sqrt(Object.values(v).reduce((s, x) => s + x * x, 0)),
    V = D.map(vec),
    a = V[J.indexOf(j)];
  return J.map((x, i) => {
    if (x === j) return null;
    let dot = 0;
    for (const w in a) if (V[i][w]) dot += a[w] * V[i][w];
    return { j: x, c: dot / (nrm(a) * nrm(V[i]) || 1) };
  })
    .filter(Boolean)
    .sort((p, q) => q.c - p.c)
    .slice(0, 3);
}
