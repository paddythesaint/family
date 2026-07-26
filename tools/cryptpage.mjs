#!/usr/bin/env node
// Lock or unlock a family page with a shared password.
//
//   node tools/cryptpage.mjs lock   <plain.html>  <locked.html> <password> [title...]
//   node tools/cryptpage.mjs unlock <locked.html> <plain.html>  <password>
//
// "lock" wraps the page in tools/locker.template.html with the content
// AES-256-GCM encrypted (key from PBKDF2-SHA256). "unlock" recovers the
// editable page from a locked file. Passwords are normalized to
// lowercase with spaces removed, matching what the unlock screen does,
// so kids can type it any way they like. Never commit the unlocked
// page or the password to this (public) repo.
import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ITER = 600000;
const norm = p => p.toLowerCase().replace(/\s+/g, '');

const [mode, inFile, outFile, password, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ') || 'The Ryan Family';
if (!['lock', 'unlock'].includes(mode) || !inFile || !outFile || !password) {
  console.error('usage: node tools/cryptpage.mjs lock|unlock <in> <out> <password>');
  process.exit(1);
}
const pw = norm(password);

if (mode === 'lock') {
  const html = readFileSync(inFile, 'utf8');
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(pw, salt, ITER, 32, 'sha256');
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  // WebCrypto expects ciphertext||tag, so append the GCM tag
  const ct = Buffer.concat([cipher.update(html, 'utf8'), cipher.final(), cipher.getAuthTag()]);
  const vault = JSON.stringify({
    iter: ITER,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ct: ct.toString('base64'),
  });
  const tpl = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'locker.template.html'), 'utf8');
  if (!tpl.includes('/*__VAULT__*/null')) {
    console.error('locker.template.html is missing the /*__VAULT__*/null placeholder');
    process.exit(1);
  }
  writeFileSync(outFile, tpl.replace('/*__VAULT__*/null', vault).replaceAll('__TITLE__', title));
  console.log(`locked ${inFile} -> ${outFile} (${ct.length} bytes encrypted)`);
} else {
  const locked = readFileSync(inFile, 'utf8');
  const m = locked.match(/const VAULT = (\{.*?\});/s);
  if (!m) {
    console.error(`${inFile} does not look like a locked page (no VAULT found)`);
    process.exit(1);
  }
  const v = JSON.parse(m[1]);
  const data = Buffer.from(v.ct, 'base64');
  const ct = data.subarray(0, data.length - 16);
  const tag = data.subarray(data.length - 16);
  const key = pbkdf2Sync(pw, Buffer.from(v.salt, 'base64'), v.iter, 32, 'sha256');
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(v.iv, 'base64'));
  decipher.setAuthTag(tag);
  let html;
  try {
    html = Buffer.concat([decipher.update(ct), decipher.final()]).toString('utf8');
  } catch (e) {
    console.error('wrong password (or corrupted file)');
    process.exit(1);
  }
  writeFileSync(outFile, html);
  console.log(`unlocked ${inFile} -> ${outFile}`);
}
