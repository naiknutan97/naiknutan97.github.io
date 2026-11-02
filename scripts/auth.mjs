import { google } from "googleapis";
import fs from "fs";
import http from "http";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH = path.join(__dirname, "auth-token.json");
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

function loadEnvFile() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const envParent = path.join(__dirname, "..", ".env");
  for (const p of [envPath, envParent]) {
    try {
      const content = fs.readFileSync(p, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eq = trimmed.indexOf("=");
        if (eq === -1) continue;
        const key = trimmed.slice(0, eq).trim();
        const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
      }
    } catch {}
  }
}

export function loadCredentials() {
  loadEnvFile();

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Missing Google OAuth credentials.");
    console.error("Set these in .env.local:");
    console.error('  GOOGLE_OAUTH_CLIENT_ID="your-client-id"');
    console.error('  GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"');
    process.exit(1);
  }

  return { clientId, clientSecret };
}

export async function getAuthClient(clientId, clientSecret, port = 3456) {
  const redirectUri = `http://localhost:${port}`;

  if (fs.existsSync(TOKEN_PATH)) {
    try {
      const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
      const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
      client.setCredentials(tokens);
      client.on("tokens", (newTokens) => {
        const merged = { ...tokens, ...newTokens };
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
      });
      return client;
    } catch {
      fs.unlinkSync(TOKEN_PATH);
    }
  }

  return doAuthFlow(clientId, clientSecret, port, redirectUri);
}

async function doAuthFlow(clientId, clientSecret, port, redirectUri) {
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, `http://localhost:${port}`);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("<h2>Access denied</h2><p>Close this tab and try again.</p>");
        reject(new Error("Auth cancelled"));
        server.close();
        return;
      }

      if (code) {
        try {
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h2>Authentication successful!</h2><p>You can close this tab and return to the terminal.</p>");
          console.log("Token saved to", TOKEN_PATH);
          server.close();
          resolve(oauth2Client);
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end(`<h2>Error</h2><p>${err.message}</p>`);
          reject(err);
          server.close();
        }
        return;
      }

      // No code yet — redirect to Google auth
      res.writeHead(302, { Location: authUrl });
      res.end();
    });

    server.listen(port, () => {
      console.log(`\nOpening browser for Google authentication...`);
      const openCmd = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
      try {
        execSync(`${openCmd} http://localhost:${port}`, { stdio: "ignore" });
      } catch {}
      console.log(`If the browser doesn't open, visit:\n  ${authUrl}\n`);
      console.log("Waiting for authentication...");
    });

    server.on("close", () => {});
  });
}
