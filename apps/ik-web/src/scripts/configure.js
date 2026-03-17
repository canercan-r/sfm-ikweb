/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fsProm = require("fs").promises;
const fs = require("fs");
const { resolve, dirname, normalize, join } = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const chalk = require("chalk");

const config = require("../assets/branding/branding.json");

const log = (msg) => console.log(chalk.blue(msg));
const info = (msg) => console.info(chalk.green(msg));
const error = (msg) => console.error(chalk.red.bold(msg));

const scriptsRoot = resolve(dirname(require.main.filename));
const projectRoot = normalize(`${scriptsRoot}/..`);

// ✅ Branding aslında src/assets/branding altında
const brandingRoot = join(projectRoot, "assets", "branding");
const srcRoot = projectRoot;

const environmentRoot = join(srcRoot, "environments");
const envPath = join(environmentRoot, "environment.ts");
const prodEnvPath = join(environmentRoot, "environment.prod.ts");

const themesRoot = join(srcRoot, "styles");
const themeVarsPath = join(themesRoot, "_override.scss");
const themesTmplPath = join(brandingRoot, "_override.scss");

function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  return `${year}${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}.${hours < 10 ? "0" + hours : hours}`;
}

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 -b [brandName]")
  .option("brand", {
    alias: "b",
    describe: "Select a brand",
    type: "string",
  })
  .demandOption(["b"])
  .help("h")
  .alias("h", "help").argv;

// ------------------ Replace Environment ------------------
const replaceEnv = (file, brand) => {
  let content = fs.readFileSync(file, "utf8");

  // string değerler
  content = content
    .replace(/{{apiServerUrl}}/g, brand.ApiServerURL)
    .replace(/{{appName}}/g, brand.AppName)
    .replace(/{{theme}}/g, brand.Theme)
    .replace(/{{brandName}}/g, brand.BrandName);

  // raw değerler (number, boolean)
  content = content
    .replace(/isLogoSvgOrNot:\s*(true|false)/, `isLogoSvgOrNot: ${brand.LogoSvgOrNot}`)
    .replace(/isMockEnabled:\s*(true|false)/, `isMockEnabled: ${brand.MockEnabled}`);

  fs.writeFileSync(file, content);
};

// ------------------ Configure Branding ------------------
async function configure(brand) {
  if (!brand) {
    error("❌ Brand not found in branding.json");
    return;
  }

  info(`Starting branding for: ${brand.BrandName}`);

  const brandFolderRoot = join(brandingRoot);
  const brandEnvPath = join(brandFolderRoot, "environment.ts");
  const brandProdEnvPath = join(brandFolderRoot, "environment.prod.ts");

  // Copy env files
  await Promise.all([
    fsProm.copyFile(brandEnvPath, envPath),
    fsProm.copyFile(brandProdEnvPath, prodEnvPath),
  ]);
  info("✅ Environment files copied");

  // Replace env variables tip güvenli
  replaceEnv(envPath, brand);
  replaceEnv(prodEnvPath, brand);
  info("✅ Environment vars replaced");

  // Theme override
  let themeVarsTemplate = await fsProm.readFile(themesTmplPath, "utf8");
  themeVarsTemplate = themeVarsTemplate
    .replace(/{{primaryColor}}/g, brand.Colors.PrimaryColor)
    .replace(/{{primaryActiveColor}}/g, brand.Colors.PrimaryActiveColor)
    .replace(/{{contrastColor}}/g, brand.Colors.PrimaryInverse)
    .replace(/{{primaryLightColor}}/g, brand.Colors.PrimaryLightColor)
    .replace(/{{primaryDarkColor}}/g, brand.Colors.PrimaryLightDarkColor);

  await fsProm.writeFile(themeVarsPath, themeVarsTemplate);
  info("✅ Theme override updated");

  // Version info
  const version = getFormattedDate();
  const replaceVersion = (file) => {
    let content = fs.readFileSync(file, "utf8");
    content = content.replace(/{{version}}/g, version);
    fs.writeFileSync(file, content);
  };
  replaceVersion(envPath);
  replaceVersion(prodEnvPath);
  info(`✅ Version updated: ${version}`);
}

// ------------------ Main ------------------
async function main() {
  const brand = config.find((e) => e.BrandFolder === argv.b);
  await configure(brand);
}

main();
