import "./style.css";
import { loadArtists, saveArtists, uid, filterArtists } from "./logic.js";
const root = document.querySelector("#app");
let artists = loadArtists();
let q = "";
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function render(){
  const list = filterArtists(artists, q);
  root.innerHTML = `
  <main class="app">
    <h1 class="brand">Local Artists Directory</h1>
    <p class="lede">Keep a private roster of makers nearby. Nothing syncs to the cloud.</p>
    <div class="toolbar">
      <input id="q" placeholder="Search name, medium, city…" value="${q.replace(/"/g,"&quot;")}" style="flex:1;min-width:180px" />
    </div>
    <form class="form" id="form">
      <input name="name" placeholder="Name" required />
      <input name="medium" placeholder="Medium (painting, music…)" required />
      <input name="city" placeholder="City / neighborhood" />
      <input name="contact" placeholder="Contact" />
      <textarea name="notes" rows="2" placeholder="Notes"></textarea>
      <button type="submit">Add artist</button>
    </form>
    <div class="grid">
      ${list.map(a=>`<article class="card"><h2>${esc(a.name)}</h2><p>${esc(a.medium)} · ${esc(a.city||"—")}</p><p>${esc(a.contact||"")}</p><p>${esc(a.notes||"")}</p>
        <button type="button" class="ghost" data-del="${a.id}">Remove</button></article>`).join("") || "<p class='lede'>No matches.</p>"}
    </div>
    <aside id="insights" class="lede" style="margin-top:1.5rem"></aside>
  </main>`;
  root.querySelector("#q").addEventListener("input", e => { q = e.target.value; render(); });
  root.querySelector("#form").addEventListener("submit", ev => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    artists = [{ id: uid(), name: String(fd.get("name")), medium: String(fd.get("medium")), city: String(fd.get("city")), contact: String(fd.get("contact")), notes: String(fd.get("notes")) }, ...artists];
    saveArtists(artists); render();
  });
  root.querySelectorAll("[data-del]").forEach(btn => btn.addEventListener("click", () => {
    artists = artists.filter(a => a.id !== btn.getAttribute("data-del"));
    saveArtists(artists); render();
  }));
}
render();
fetch("./insights.json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(d=>{ if(d){ const el=document.querySelector("#insights"); if(el) el.textContent="Web insights: "+(d.headline||""); }}).catch(()=>{});
