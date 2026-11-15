/* Halaman Masuk / Daftar  (#masuk) */
function login() {
  const reg = S.mode === "daftar";
  app.innerHTML = `<a href="#beranda" class="mut" style="display:inline-block;margin-top:24px;font-size:13px;font-weight:700;text-decoration:none">← Kembali ke Beranda</a>
 <div class="login"><div class="l"><span class="pill" style="background:#ffffff1f;color:#fb7185">🛡 Single Sign-On Akademik</span><h2 style="font-size:32px;margin-top:22px;color:#fff">Akses Penuh Direktori <span style="color:#fb7185">GaruClass</span></h2><p style="color:#94a3b8;font-size:13px">Peran pengguna: Administrator, Data Engineer, Pengelola Jurnal, Stakeholder, dan User Umum (RBAC).</p><p style="color:#94a3b8;font-size:12px">Demo admin: admin@garuclass.id / admin12345</p></div>
 <form class="r" id="lf" novalidate><div class="row" style="align-items:flex-start"><div><h2 style="font-size:22px">${reg ? "Daftar Akun Baru" : "Masuk ke Akun"}</h2><div class="mut" style="font-size:12px">${reg ? "Lengkapi data diri Anda untuk membuat akun baru" : "Gunakan email dan kata sandi terdaftar"}</div></div>
 <div class="seg"><button type="button" data-m="masuk" class="${reg ? "" : "on"}">Masuk</button><button type="button" data-m="daftar" class="${reg ? "on" : ""}" style="${reg ? "color:var(--brand)" : ""}">Daftar</button></div></div>
 ${reg ? `<div class="fld"><label for="nm">Nama Lengkap</label><input class="in" id="nm" placeholder="Masukkan nama lengkap" autocomplete="name"></div>` : ""}
 <div class="fld"><label for="em">Alamat Email</label><input class="in" id="em" type="email" placeholder="nama@email.com" autocomplete="email"></div>
 <div class="fld"><label for="pw">Kata Sandi</label><div style="position:relative"><input class="in" id="pw" type="password" placeholder="Minimal 8 karakter" autocomplete="${reg ? "new-password" : "current-password"}"><button type="button" id="eye" aria-label="Tampilkan sandi" style="position:absolute;right:10px;top:9px">👁</button></div></div>
 <div class="err" id="er" role="alert"></div><button class="btn" style="width:100%;justify-content:center;padding:13px">${reg ? "Buat Akun Peneliti" : "Masuk"} ›</button></form></div>`;
  app.querySelectorAll("[data-m]").forEach(
    (b) =>
      (b.onclick = () => {
        S.mode = b.dataset.m;
        login();
      }),
  );
  $("#eye").onclick = () => {
    const p = $("#pw");
    p.type = p.type === "password" ? "text" : "password";
  };
  $("#lf").onsubmit = (e) => {
    e.preventDefault();
    const em = $("#em").value.trim(),
      pw = $("#pw").value,
      nm = $("#nm");
    let m = "";
    if (reg && !nm.value.trim()) m = "Nama lengkap wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(em)) m = "Format email tidak valid.";
    else if (pw.length < 8) m = "Kata sandi minimal 8 karakter.";
    if (m) {
      $("#er").textContent = m;
      return;
    }
    const em0 = em.toLowerCase(),
      isA = !reg && em0 === DEMO.email && pw === DEMO.pw;
    if (!reg && em0 === DEMO.email && !isA) {
      $("#er").textContent = "Email atau kata sandi salah.";
      return;
    }
    S.user = {
      name: isA ? "Admin" : reg ? nm.value.trim() : em.split("@")[0],
      role: isA ? "admin" : "user",
    };
    location.hash = isA ? "admin" : "jurnal";
    route();
  };
}
