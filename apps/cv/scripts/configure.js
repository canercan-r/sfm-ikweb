/* eslint-disable @typescript-eslint/no-var-requires */
const fsProm = require('fs').promises;
const { resolve, dirname, normalize, join } = require('path');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');

const config = require('../branding.json');

const log = (msg) => console.log(chalk.blue(msg));
const info = (msg) => console.info(chalk.green(msg));
const error = (msg) => console.error(chalk.blue.bgRed.bold(msg));

const scriptsRoot = resolve(dirname(require.main.filename));
const projectRoot = normalize(`${scriptsRoot}/..`);
const brandingRoot = join(`${projectRoot}`, '/branding');

// const srcRoot = join(`${projectRoot}`, '/src');



const srcRoot = normalize(`${projectRoot}/../../apps/cv/src`);
const environmentRoot = join(`${srcRoot}`, '/environments');
const envPath = join(`${environmentRoot}`, 'environment.ts');
const prodEnvPath = join(`${environmentRoot}`, 'environment.prod.ts');


const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command('config', 'Config the app for the tenant')
  .option('tenant', {
    alias: 't',
    describe: 'Select a tenant',
    type: 'string',
  })
  .demandOption(['t'])
  .help('h')
  .alias('h', 'help')
  .epilog('Copyright© KG® 2022').argv;


async function configure(tenant) {
  info(`starting branding for tenant: ${tenant.AppDisplayName}`);
  const tenantFolderRoot = join(`${brandingRoot}`, `${tenant.Folder}`);

  const tenantEnvPath = join(`${tenantFolderRoot}`, 'environment.ts');
  const tenantProdEnvPath = join(`${tenantFolderRoot}`, 'environment.prod.ts');

  const envCopy = fsProm.copyFile(tenantEnvPath, envPath);
  const prodEnvCopy = fsProm.copyFile(tenantProdEnvPath, prodEnvPath);

  await Promise.all([envCopy, prodEnvCopy]);
  info(`sucessfully copied tenant files`);
}

async function readFile(filePath) {
  try {
    return await fsProm.readFile(filePath);
  } catch (err) {
    error(`Got an error trying to read the file: ${err.message}`);
  }
}
async function writeFile(filePath, data) {
  try {
    return await fsProm.writeFile(filePath, data);
  } catch (err) {
    error(`Got an error trying to write the file: ${err.message}`);
  }
}

async function main() {
  const tenant = config.brandList.find((e) => argv.t === e.Folder);
  await configure(tenant);
}

main();
