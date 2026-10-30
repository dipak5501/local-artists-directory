const KEY = "nae-local-artists";
export function loadArtists() {
  try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch {}
  return [
    { id: "a1", name: "Maya Chen", medium: "Painting", city: "Your city", contact: "maya@example.com", notes: "Studio open weekends" },
    { id: "a2", name: "Jordan Lee", medium: "Photography", city: "Your city", contact: "@jordanlee", notes: "Street + portrait" },
  ];
}
export function saveArtists(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
export function uid() { return "a-" + Math.random().toString(36).slice(2, 8); }
export function filterArtists(list, q) {
  const s = (q || "").toLowerCase();
  if (!s) return list;
  return list.filter((a) => [a.name, a.medium, a.city, a.notes, a.contact].join(" ").toLowerCase().includes(s));
}
