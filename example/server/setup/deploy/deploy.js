#!/usr/bin/env node

import util from 'util'
import { exec as originalExec } from 'child_process'
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const exec = util.promisify(originalExec)

const USER = 'tutorark'
const HOME = `/opt/${USER}`
const DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const PWD = USER

const info = (...message) => console.info('\x1b[0m', ...message, '\x1b[0m')
const warn = (...message) => console.info('\x1b[33m', ...message, '\x1b[0m')

async function createSystemUser () {
  info('Creating system user...')
  try {
    const { stdout, stderr } = await exec(
      `sudo adduser --home ${HOME} ${USER}`)
    info(`User ${USER} created.`, stdout, stderr)
  } catch (error) {
    warn(error.stderr)
  }
}

async function installPostgreSQL () {
  info('Installing PostgreSQL...')
  const { stdout, stderr } = await exec('apt-get install postgresql -y')
  info('PostgreSQL installed.', stdout, stderr)
}

async function createPostgresUser () {
  info('Creating PostgreSQL User...')
  try {
    const { stdout, stderr } = await exec(`
      sudo -u postgres createuser -s ${USER}
      sudo -u postgres psql -c "ALTER USER ${USER} WITH PASSWORD '${PWD}'"
    `)
    info(`PostgreSQL ${USER} user created.`, stdout, stderr)
  }
  catch (error) {
    warn(error.stderr)
  }
}

async function openPostgresConnections () {
  info('Opening PostgreSQL Connections...')
  try {
    const conf = '/etc/postgresql/12/main/postgresql.conf'
    const pghba = '/etc/postgresql/12/main/pg_hba.conf'
    const { stdout, stderr } = await exec(`
      sed -i 's/#listen_addresses/listen_addresses/' ${conf}
      sed -i 's/localhost/*/' ${conf}
      sed -i 's/127.0.0.1\\/32/    0.0.0.0\\/0/' ${pghba}
    `)
    info(`PostgreSQL connections opened.`, stdout, stderr)
  }
  catch (error) {
    warn(error.stderr)
  }
}

async function restartPostgresServer () {
  info('Restarting PostgreSQL Server...')
  try {
    const { stdout, stderr } = await exec(`
      service postgresql restart
    `)
    info(`PostgreSQL server restarted.`, stdout, stderr)
  }
  catch (error) {
    warn(error.stderr)
  }
}

async function symlinkDirectory () {
  info('Symlink directory...')
  const { stdout, stderr } = await exec(`ln -sf ${DIR} ${HOME}`)
  info('Project directory symlinked.', stdout, stderr)
}

async function autoremovePackages () {
  info('Autoremoving packages...')
  const { stdout, stderr } = await exec('apt-get autoremove -y')
  info('Obsolete packages removed.', stdout, stderr)
}

async function main () {
  info("Tutorark's deployment started...")
  await createSystemUser()
  await installPostgreSQL()
  await createPostgresUser()
  await openPostgresConnections()
  await restartPostgresServer()
  await symlinkDirectory()
  await autoremovePackages()
  info("Deployment completed!")
}

main()
