/* Konfigurasi backend: isi API.base untuk memakai data dari server */
const API = {
  base: "",
}; /* isi dengan URL backend, mis. https://api.garuclass.id; respons GET /api/journals: [{id,t,p,sb,s,issn,a,f,d}] */
if (API.base)
  fetch(API.base + "/api/journals")
    .then((r) => r.json())
    .then((d) => {
      J.splice(0, J.length, ...d);
      route();
    })
    .catch(() => {});
