import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadCredentials, getAuthClient } from "./auth.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURAION_PATH = path.join(__dirname, "curation.json");
const CONFIG_PATH = path.join(__dirname, "sync-config.json");

function loadCuration() {
  try {
    if (fs.existsSync(CURAION_PATH)) {
      const ids = JSON.parse(fs.readFileSync(CURAION_PATH, "utf-8")).selectedIds;
      if (Array.isArray(ids) && ids.length > 0) {
        console.log(`Using curation.json — ${ids.length} selected photo(s)`);
        return new Set(ids);
      }
    }
  } catch {}
  return null;
}

async function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("sync-config.json not found.");
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  const curationIds = loadCuration();
  const { clientId, clientSecret } = loadCredentials();
  const auth = await getAuthClient(clientId, clientSecret);
  const drive = google.drive({ version: "v3", auth });

  const albums = [];

  for (const albumCfg of config.albums) {
    if (!albumCfg.folderId || albumCfg.folderId === "REPLACE_WITH_DRIVE_FOLDER_ID") {
      console.warn(`Skipping "${albumCfg.id}" — folderId not configured.`);
      continue;
    }

    console.log(`Fetching files for "${albumCfg.id}"...`);

    const allFolderIds = [albumCfg.folderId];
    const queue = [albumCfg.folderId];
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
          allFolderIds.push(f.id);
          queue.push(f.id);
        }
        pageToken = res.data.nextPageToken;
      } while (pageToken);
    }

    const allFiles = [];
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

    const photos = allFiles
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f.name))
      .filter((f) => !curationIds || curationIds.has(f.id))
      .map((f) => ({
        src: `https://drive.google.com/uc?export=view&id=${f.id}`,
        alt: f.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
        location: albumCfg.location,
        date: albumCfg.date,
      }));

    albums.push({
      id: albumCfg.id,
      title: albumCfg.title,
      description: albumCfg.description,
      location: albumCfg.location,
      date: albumCfg.date,
      photos,
    });

    console.log(`  ${photos.length} photos`);
  }

  const outputPath = path.join(__dirname, "..", "public", "data", "gallery-sync.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(albums, null, 2), "utf-8");
  console.log(`\nWritten ${albums.length} album(s) to ${outputPath}`);
}

main().catch((err) => { console.error(err.message); process.exit(1); });
