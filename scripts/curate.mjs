import { google } from "googleapis";
import fs from "fs";
import http from "http";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { loadCredentials, getAuthClient } from "./auth.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURAION_PATH = path.join(__dirname, "curation.json");
const CONFIG_PATH = path.join(__dirname, "sync-config.json");
const PORT = 3457;
let filesCache = [];
let selectedIds = new Set();

function loadSelected() {
  try {
    if (fs.existsSync(CURAION_PATH)) {
      selectedIds = new Set(JSON.parse(fs.readFileSync(CURAION_PATH, "utf-8")).selectedIds || []);
    }
  } catch {}
}

function saveSelected() {
  fs.writeFileSync(CURAION_PATH, JSON.stringify({ selectedIds: [...selectedIds] }, null, 2), "utf-8");
}

function renderPage() {
  const rows = filesCache.map((f, i) => {
    const checked = selectedIds.has(f.id) ? "checked" : "";
    const thumb = `https://drive.google.com/thumbnail?id=${f.id}&sz=w320`;
    return `<div class="photo ${checked}" data-idx="${i}">
<label><input type="checkbox" ${checked} value="${f.id}" data-idx="${i}" />
<div class="thumb-wrap"><img src="${thumb}" alt="${f.name}" loading="lazy" onerror="this.closest('.photo').classList.add('no-thumb')" /><div class="no-thumb-label">${f.name}</div></div>
<div class="name">${f.name}</div></label></div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gallery Curation</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f0f0f;color:#e0e0e0;padding:20px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px}
h1{font-size:20px;font-weight:600}
.stats{font-size:13px;color:#888}
.actions{display:flex;gap:8px}
.btn{padding:8px 18px;border:none;border-radius:6px;font-size:13px;cursor:pointer;background:#333;color:#e0e0e0}
.btn-primary{background:#4f8cff;color:#fff}
.btn-primary:hover{background:#3a7bff}
.btn-danger{background:#e04848;color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.photo{border-radius:8px;overflow:hidden;background:#1a1a1a;border:2px solid transparent;position:relative}
.photo.checked{border-color:#4f8cff}
.photo label{display:block;cursor:pointer;padding:8px}
.photo input[type=checkbox]{position:absolute;top:8px;right:8px;width:18px;height:18px;accent-color:#4f8cff;cursor:pointer;z-index:2}
.thumb-wrap{width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:4px;background:#222;display:flex;align-items:center;justify-content:center}
.thumb-wrap img{width:100%;height:100%;object-fit:cover}
.no-thumb .thumb-wrap img{display:none}
.no-thumb-label{display:none;font-size:11px;color:#666;text-align:center;padding:10px;word-break:break-all}
.no-thumb .no-thumb-label{display:block}
.name{font-size:11px;color:#999;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#4f8cff;color:#fff;padding:10px 20px;border-radius:6px;font-size:13px;opacity:0;transition:opacity .3s;pointer-events:none}
.toast.show{opacity:1}
</style></head>
<body>
<div class="header">
<div><h1>Gallery Curation</h1><div class="stats"><span id="total">${filesCache.length}</span> photos &middot; <span id="count">${selectedIds.size}</span> selected</div></div>
<div class="actions">
<button class="btn" onclick="selectAll()">Select All</button>
<button class="btn" onclick="deselectAll()">Deselect All</button>
<button class="btn btn-primary" onclick="save()">Save Selection</button>
</div></div>
<div class="grid" id="grid">${rows}</div>
<div id="toast" class="toast"></div>
<script>
let selected = new Set(${JSON.stringify([...selectedIds])});
document.getElementById('grid').addEventListener('change', e => {
  if (e.target.matches('input[type=checkbox]')) {
    const id = e.target.value;
    if (e.target.checked) { selected.add(id); e.target.closest('.photo').classList.add('checked'); }
    else { selected.delete(id); e.target.closest('.photo').classList.remove('checked'); }
    document.getElementById('count').textContent = selected.size;
  }
});
function selectAll() { document.querySelectorAll('input[type=checkbox]').forEach(cb => { cb.checked = true; selected.add(cb.value); cb.closest('.photo').classList.add('checked') }); document.getElementById('count').textContent = selected.size; }
function deselectAll() { document.querySelectorAll('input[type=checkbox]').forEach(cb => { cb.checked = false; selected.delete(cb.value); cb.closest('.photo').classList.remove('checked') }); document.getElementById('count').textContent = selected.size; }
async function save() {
  const res = await fetch('/save', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({selectedIds:[...selected]}) });
  const el = document.getElementById('toast');
  el.textContent = res.ok ? 'Selection saved!' : 'Error saving';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}
</script></body></html>`;
}

async function getAllFolderIds(drive, rootId) {
  const ids = [rootId];
  const queue = [rootId];
  while (queue.length > 0) {
    const current = queue.shift();
    let pageToken;
    do {
      const res = await drive.files.list({
        q: `'${current}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: "nextPageToken, files(id)",
        pageSize: 1000,
        pageToken,
      });
      for (const f of res.data.files || []) {
        ids.push(f.id);
        queue.push(f.id);
      }
      pageToken = res.data.nextPageToken;
    } while (pageToken);
  }
  return ids;
}

async function listPhotos(drive, folderId) {
  const allFiles = [];
  const allFolderIds = await getAllFolderIds(drive, folderId);
  for (const fid of allFolderIds) {
    let pageToken;
    do {
      const res = await drive.files.list({
        q: `'${fid}' in parents and (mimeType contains 'image/jpeg' or mimeType contains 'image/png' or mimeType contains 'image/webp')`,
        fields: "nextPageToken, files(id, name)",
        orderBy: "name",
        pageSize: 1000,
        pageToken,
      });
      allFiles.push(...(res.data.files || []));
      pageToken = res.data.nextPageToken;
    } while (pageToken);
  }
  return allFiles.filter((f) => /\.(jpe?g|png|webp)$/i.test(f.name));
}

async function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("sync-config.json not found.");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  const { clientId, clientSecret } = loadCredentials();
  const auth = await getAuthClient(clientId, clientSecret);
  const drive = google.drive({ version: "v3", auth });

  loadSelected();

  for (const album of config.albums) {
    if (!album.folderId || album.folderId === "REPLACE_WITH_DRIVE_FOLDER_ID") continue;
    console.log(`Listing photos for "${album.id}"...`);
    const photos = await listPhotos(drive, album.folderId);
    filesCache.push(...photos.map((f) => ({ ...f, _albumId: album.id, _albumTitle: album.title })));
    console.log(`  ${photos.length} photos`);
  }

  if (filesCache.length === 0) {
    console.log("No photos found. Check your sync-config.json folder IDs.");
    process.exit(1);
  }

  const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/save") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          selectedIds = new Set(JSON.parse(body).selectedIds || []);
          saveSelected();
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: true, count: selectedIds.size }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderPage());
  });

  server.listen(PORT, () => {
    console.log(`\nCuration tool: http://localhost:${PORT}`);
    console.log(`Check photos to include, click "Save Selection", then Ctrl+C\n`);
    console.log(`${filesCache.length} photos loaded, ${selectedIds.size} selected`);
    const openCmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
    try { execSync(`${openCmd} http://localhost:${PORT}`, { stdio: "ignore" }); } catch {}
  });
}

main().catch((err) => { console.error(err.message); process.exit(1); });
