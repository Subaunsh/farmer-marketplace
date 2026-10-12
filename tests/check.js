
const fs = require("fs");

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "Dockerfile"
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`FAIL: Missing required file: ${file}`);
    process.exit(1);
  }
}

const html = fs.readFileSync("index.html", "utf8");

if (!html.includes("styles.css")) {
  console.error("FAIL: styles.css is not linked in index.html");
  process.exit(1);
}

if (!html.includes("app.js")) {
  console.error("FAIL: app.js is not linked in index.html");
  process.exit(1);
}

console.log("PASS: All required files exist.");
console.log("PASS: CSS and JavaScript are linked in HTML.");
console.log("All Farmer Marketplace tests passed.");
