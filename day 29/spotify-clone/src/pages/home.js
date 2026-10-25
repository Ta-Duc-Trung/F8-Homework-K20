import "../style.css";
import { apiFetch, auth, storage, requireAuth } from "../api.js";
import { escapeHtml, pick, pickList, getImage, getTitle, formatDuration, formatNumber, loadingHtml, errorHtml, emptyHtml } from "../ui.js";

requireAuth();

document.getElementById("logout-btn").addEventListener("click", auth.logout);

function renderUserChip(user) {
  if (!user) return;
  const name = pick(user, ["display_name", "username", "email"]) || "Bạn";
  const avatar = getImage(user);
  document.getElementById("user-name").textContent = name;
  document.getElementById("greeting").textContent = `Xin chào, ${name}`;
  document.getElementById("user-avatar").innerHTML = avatar
    ? `<img src="${escapeHtml(avatar)}" alt="" class="h-full w-full object-cover" />`
    : escapeHtml(name[0].toUpperCase());
}

renderUserChip(storage.getUser());

apiFetch("/api/users/me")
  .then((data) => {
    const user = data.user || data.data || data;
    storage.setUser(user);
    renderUserChip(user);
  })
  .catch(() => {});

const placeholder = (rounded) => `
  <div class="flex aspect-square w-full items-center justify-center ${rounded} bg-neutral-700 text-4xl text-neutral-500">♪</div>`;

function cardHtml({ image, title, subtitle, round = false }) {
  const rounded = round ? "rounded-full" : "rounded-md";
  return `
    <div class="group w-40 shrink-0 rounded-lg bg-neutral-900 p-3 transition hover:bg-neutral-800 sm:w-44">
      ${image
        ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy"
             class="aspect-square w-full ${rounded} object-cover shadow-lg"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'flex aspect-square w-full items-center justify-center bg-neutral-700 text-4xl text-neutral-500 ${rounded}',textContent:'♪'}))" />`
        : placeholder(rounded)}
      <p class="mt-3 truncate font-semibold" title="${escapeHtml(title)}">${escapeHtml(title)}</p>
      <p class="mt-1 line-clamp-2 text-sm text-neutral-400">${escapeHtml(subtitle)}</p>
    </div>`;
}

const rowHtml = (cards) =>
  `<div class="scroll-row -mx-1 flex gap-4 overflow-x-auto px-1 pb-3">${cards.join("")}</div>`;

const artistName = (item) =>
  pick(item, ["artist_name", "artist.name", "artists.0.name", "owner.display_name", "owner_name"]);

function artistSubtitle(a) {
  const followers = pick(a, ["monthly_listeners", "followers_count", "followers"]);
  if (followers && !isNaN(followers)) return `${formatNumber(followers)} người nghe`;
  return a.is_verified ? "Nghệ sĩ đã xác minh" : "Nghệ sĩ";
}

function albumSubtitle(a) {
  const parts = [];
  const year = pick(a, ["release_date", "release_year"]);
  if (year) parts.push(String(year).slice(0, 4));
  const artist = artistName(a);
  if (artist) parts.push(artist);
  const count = pick(a, ["total_tracks", "tracks_count", "track_count"]);
  if (count) parts.push(`${count} bài`);
  return parts.join(" • ") || "Album";
}

function playlistSubtitle(p) {
  const parts = [];
  const desc = pick(p, ["description"]);
  if (desc) return desc;
  const owner = artistName(p);
  if (owner) parts.push(`Bởi ${owner}`);
  const count = pick(p, ["total_tracks", "tracks_count", "track_count"]);
  if (count) parts.push(`${count} bài`);
  return parts.join(" • ") || "Playlist";
}

async function loadSection({ elId, path, key, render, emptyText }) {
  const el = document.getElementById(elId);
  el.innerHTML = loadingHtml();
  try {
    const data = await apiFetch(path);
    const items = pickList(data, key);
    el.innerHTML = items.length ? render(items) : emptyHtml(emptyText);
  } catch (error) {
    el.innerHTML = errorHtml(`Không tải được dữ liệu: ${error.message}`);
  }
}

function tracksHtml(tracks) {
  const rows = tracks
    .map((t, i) => {
      const img = getImage(t);
      const title = getTitle(t);
      const artist = artistName(t) || "";
      const album = pick(t, ["album_title", "album.title", "album.name", "album_name"]) || "";
      const duration = formatDuration(pick(t, ["duration", "duration_ms", "duration_seconds"]));
      return `
        <li class="grid grid-cols-[2rem_1fr_auto] items-center gap-4 rounded-md px-3 py-2 hover:bg-neutral-800 sm:grid-cols-[2rem_2fr_1fr_4rem]">
          <span class="text-right text-neutral-400">${i + 1}</span>
          <div class="flex min-w-0 items-center gap-3">
            ${img
              ? `<img src="${escapeHtml(img)}" alt="" loading="lazy" class="h-10 w-10 shrink-0 rounded object-cover" />`
              : `<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-neutral-700 text-neutral-500">♪</div>`}
            <div class="min-w-0">
              <p class="truncate font-medium">${escapeHtml(title)}</p>
              <p class="truncate text-sm text-neutral-400">${escapeHtml(artist)}</p>
            </div>
          </div>
          <span class="hidden truncate text-sm text-neutral-400 sm:block">${escapeHtml(album)}</span>
          <span class="text-right text-sm text-neutral-400">${duration}</span>
        </li>`;
    })
    .join("");
  return `
    <div class="hidden grid-cols-[2rem_2fr_1fr_4rem] gap-4 border-b border-neutral-800 px-3 pb-2 text-sm text-neutral-400 sm:grid">
      <span class="text-right">#</span><span>Tiêu đề</span><span>Album</span><span class="text-right">⏱</span>
    </div>
    <ol class="mt-2">${rows}</ol>`;
}

loadSection({
  elId: "artists",
  path: "/api/artists?limit=20&offset=0",
  key: "artists",
  emptyText: "Chưa có nghệ sĩ nào.",
  render: (items) =>
    rowHtml(items.map((a) => cardHtml({ image: getImage(a), title: getTitle(a), subtitle: artistSubtitle(a), round: true }))),
});

loadSection({
  elId: "albums",
  path: "/api/albums?limit=20&offset=0",
  key: "albums",
  emptyText: "Chưa có album nào.",
  render: (items) =>
    rowHtml(items.map((a) => cardHtml({ image: getImage(a), title: getTitle(a), subtitle: albumSubtitle(a) }))),
});

loadSection({
  elId: "playlists",
  path: "/api/playlists?limit=20&offset=0",
  key: "playlists",
  emptyText: "Chưa có playlist nào.",
  render: (items) =>
    rowHtml(items.map((p) => cardHtml({ image: getImage(p), title: getTitle(p), subtitle: playlistSubtitle(p) }))),
});

loadSection({
  elId: "tracks",
  path: "/api/tracks?limit=50&offset=0",
  key: "tracks",
  emptyText: "Chưa có bài hát nào.",
  render: tracksHtml,
});