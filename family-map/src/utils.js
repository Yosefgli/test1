const PALETTE = [
  "#8B4513",
  "#2F6B5E",
  "#9B4D6A",
  "#3D5A80",
  "#B5651D",
  "#5C4D7D",
  "#4A6741",
  "#A65D3F",
];

export function initials(name) {
  const parts = name.replace(/[(),]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function roleLabel(role, generation) {
  if (generation === 1) return "דור ראשון";
  if (generation === 2) return "דור שני";
  if (generation === 3) return "דור שלישי";
  if (role === "parent") return "הורה";
  if (role === "child") return "ילד/ה בבית";
  return "בן משפחה";
}

export function genBadge(generation) {
  if (generation === 1) return "דור א׳";
  if (generation === 2) return "דור ב׳";
  if (generation === 3) return "דור ג׳";
  return "";
}
