#!/usr/bin/env node
/**
 * Migrate Canada Pre-Tour Notion HTML export → Letter #1 + entries (Markdoc).
 *
 * Usage:
 *   node scripts/migrate-canada.mjs
 *   CANADA_SOURCE=/path/to/Canada-Pre-Tour-2026 node scripts/migrate-canada.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE =
	process.env.CANADA_SOURCE || path.resolve(ROOT, '../Canada-Pre-Tour-2026');

const LETTER_SLUG = 'canada-pre-tour-2026';
const ENTRIES = [
	{ file: 'Amsterdam ✈️ Canada 0ccd8fd9d88b8360ab050190928ffafb.html', emoji: '🇳🇱', title: 'Amsterdam ✈️ Canada', date: '2026-06-18', folder: 'Amsterdam ✈️ Canada' },
	{ file: 'Cycling + Kayaking 64dd8fd9d88b83af8b9a01234177a233.html', emoji: '🇨🇦', title: 'Cycling + Kayaking', date: '2026-06-19', folder: 'Cycling + Kayaking' },
	{ file: 'Bridgewater PP 66ed8fd9d88b826eac0b818ad744ee57.html', emoji: '🧘', title: 'Bridgewater PP', date: '2026-06-20', folder: 'Bridgewater PP' },
	{ file: 'To The Whales 🐋 1d2d8fd9d88b82c9afe2016c155084b9.html', emoji: '🐋', title: 'To The Whales 🐋', date: '2026-06-21', folder: 'To The Whales 🐋' },
	{ file: 'Whale 762d8fd9d88b8277993581d6f8fabf96.html', emoji: '🙅‍♂️', title: 'Whale?', date: '2026-06-22', folder: 'Whale' },
	{ file: 'New Glasgow PP 864d8fd9d88b825fbb9501771274b443.html', emoji: '🧘', title: 'New Glasgow PP', date: '2026-06-23', folder: 'New Glasgow PP' },
	{ file: 'Made it to PEI 39fd8fd9d88b80e49f1efe6cd7376eb3.html', emoji: '🇨🇦', title: 'Made it to PEI', date: '2026-06-24', folder: 'Made it to PEI' },
	{ file: 'PEI PP + Split up 39fd8fd9d88b8018ae83fc2316e1dd88.html', emoji: '⭐', title: 'PEI PP + Split up', date: '2026-06-25', folder: 'PEI PP + Split up' },
	{ file: 'Fundy National Park Of Canada 39fd8fd9d88b8091a825dd597238ccd6.html', emoji: '🦫', title: 'Fundy National Park Of Canada', date: '2026-06-26', folder: 'Fundy National Park Of Canada' },
	{ file: 'To the Puja & Beyond 39fd8fd9d88b80d2b618fc71ce61e9c6.html', emoji: '👑', title: 'To the Puja & Beyond', date: '2026-06-27', folder: 'To the Puja & Beyond' },
	{ file: 'Kingston PP 39fd8fd9d88b80a8ba0bdf20a15091ab.html', emoji: '🧘', title: 'Kingston PP', date: '2026-06-29', folder: 'Kingston PP' },
	{ file: 'I am from Brampton 39fd8fd9d88b8035a5efcc258f756ed7.html', emoji: '🇮🇳', title: 'I am from Brampton', date: '2026-06-30', folder: 'I am from Brampton' },
	{ file: 'Niagara Falls PP 39fd8fd9d88b800db2f3f23dace84538.html', emoji: '🌊', title: 'Niagara Falls PP', date: '2026-07-02', folder: 'Niagara Falls PP' },
	{ file: 'Sudbury PP + Pasta 39fd8fd9d88b80178a9bf4a38c99918e.html', emoji: '🍝', title: 'Sudbury PP + Pasta', date: '2026-07-03', folder: 'Sudbury PP + Pasta' },
	{ file: 'Sault Ste Marie PP 3a3d8fd9d88b80a1aa08db159a0f4305.html', emoji: '🧘', title: 'Sault Ste. Marie PP', date: '2026-07-05', folder: 'Sault Ste Marie PP' },
	{ file: 'Thunderbay PP 3a7d8fd9d88b801cb1eee6ef461c94ad.html', emoji: '🧘', title: 'Thunderbay PP', date: '2026-07-06', folder: 'Thunderbay PP' },
	{ file: 'Winnipeg PP 3aad8fd9d88b809abfc9c9b26d946991.html', emoji: '🏎️', title: 'Winnipeg PP', date: '2026-07-09', folder: 'Winnipeg PP' },
	{ file: 'Saskatchewan - Lakes & Hills 3aad8fd9d88b80c2b378e5465b15d4d1.html', emoji: '🚣‍♂️', title: 'Saskatchewan - Lakes & Hills', date: '2026-07-10', folder: 'Saskatchewan - Lakes & Hills' },
	{ file: 'Moose jaw PP 3a7d8fd9d88b808ab515f353f62fe8f0.html', emoji: '🧘', title: 'Moose jaw PP', date: '2026-07-11', folder: 'Moose jaw PP' },
	{ file: 'Medicine Hat + Lethbridge 3a7d8fd9d88b80f89b30fce65a82554d.html', emoji: '🧘', title: 'Medicine Hat + Lethbridge', date: '2026-07-12', folder: 'Medicine Hat + Lethbridge' },
	{ file: 'Banff - Lakes 3aad8fd9d88b80119791ec2c6d74e6f7.html', emoji: '🌊', title: 'Banff - Lakes', date: '2026-07-13', folder: 'Banff - Lakes' },
	{ file: 'To Vancouver 3aad8fd9d88b80d5b6e0e1bf63ebcbed.html', emoji: '🌃', title: 'To Vancouver', date: '2026-07-15', folder: 'To Vancouver' },
	{ file: 'The Vancouver 3aad8fd9d88b80b68dd3f5e5a496ed21.html', emoji: '🌆', title: 'The Vancouver', date: '2026-07-17', folder: 'The Vancouver' },
];

function slugify(input) {
	return input
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 80);
}

function decodeUriPath(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

function escapeYaml(value) {
	const str = String(value);
	if (/[:\-?#\[\]{},&*!|>'"%@`\n]/.test(str) || /[\u{1F300}-\u{1FAFF}]/u.test(str)) {
		return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
	}
	return str;
}

function decodeEntities(text) {
	return text
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#x27;/g, "'")
		.replace(/&#39;/g, "'")
		.replace(/\u00a0/g, ' ')
		.trim();
}

function stripTags(html) {
	return decodeEntities(
		html
			.replace(/<br\s*\/?>/gi, '\n')
			.replace(/<[^>]+>/g, '')
			.replace(/[ \t]+\n/g, '\n')
			.replace(/\n{3,}/g, '\n\n'),
	);
}

function extractPageBody(html) {
	const match = html.match(/<div class="page-body"[\s\S]*$/i);
	if (!match) {
		const article = html.match(/<article[\s\S]*?<\/article>/i);
		return article ? article[0] : html;
	}
	// Cut before injected scripts if present
	return match[0].split(/<script[\s\S]*$/i)[0];
}

function extractCover(html) {
	const cover = html.match(
		/class="[^"]*page-cover-image[^"]*"[^>]*src="([^"]+)"|src="([^"]+)"[^>]*class="[^"]*page-cover-image[^"]*"/i,
	);
	if (cover) return cover[1] || cover[2];
	const unsplash = html.match(/src="(https:\/\/images\.unsplash\.com[^"]+)"/i);
	return unsplash ? unsplash[1] : null;
}

function extractBlocks(pageBody) {
	const blocks = [];
	const seenImages = new Set();

	// Walk top-level-ish blocks in document order via a token scan
	const tokenRe =
		/<(details|summary|h1|h2|h3|h4|p|blockquote|figure|div)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi;

	// Prefer explicit leaf extraction in order of appearance
	const leafRe =
		/<(h1|h2|h3|h4|p|blockquote|summary)(\s[^>]*)?>([\s\S]*?)<\/\1>|<img\b[^>]*src="([^"]+)"[^>]*>/gi;

	let m;
	while ((m = leafRe.exec(pageBody))) {
		if (m[4]) {
			const src = m[4];
			if (
				seenImages.has(src) ||
				/^https:\/\/app\.notion\.com/i.test(src) ||
				/page-cover-image/i.test(m[0])
			) {
				continue;
			}
			seenImages.add(src);
			blocks.push({ type: 'image', src });
			continue;
		}

		const tag = m[1].toLowerCase();
		const text = stripTags(m[3]);
		if (!text) continue;

		// Skip Notion collection / property chrome
		if (/^date$/i.test(text) && tag === 'summary') continue;

		if (tag === 'h1' || tag === 'h2') blocks.push({ type: 'h2', text });
		else if (tag === 'h3' || tag === 'h4') blocks.push({ type: 'h3', text });
		else if (tag === 'summary') blocks.push({ type: 'h3', text });
		else if (tag === 'blockquote') blocks.push({ type: 'quote', text });
		else blocks.push({ type: 'p', text });
	}

	void tokenRe; // reserved for future nested parsing
	return blocks;
}

function blocksToMarkdoc(blocks, imageMapper) {
	const out = [];
	for (const block of blocks) {
		if (block.type === 'p') out.push(block.text);
		else if (block.type === 'h2') out.push(`## ${block.text}`);
		else if (block.type === 'h3') out.push(`### ${block.text}`);
		else if (block.type === 'quote') out.push(`> ${block.text.replace(/\n/g, '\n> ')}`);
		else if (block.type === 'image') {
			const mapped = imageMapper(block.src);
			if (mapped) out.push(`![ ](${mapped})`);
		}
		out.push('');
	}
	return `${out.join('\n').trim()}\n`;
}

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}

function copyImage(srcPath, destPath) {
	ensureDir(path.dirname(destPath));
	fs.copyFileSync(srcPath, destPath);
}

function resolveLocalImage(src, entryDir) {
	if (!src || /^https?:\/\//i.test(src)) return null;
	const decoded = decodeUriPath(src.split('?')[0]);
	const candidates = [
		path.join(entryDir, decoded),
		path.join(entryDir, path.basename(decoded)),
		path.join(path.dirname(entryDir), decoded),
	];
	for (const candidate of candidates) {
		if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
	}
	return null;
}

function writeMdoc(filePath, frontmatter, body) {
	ensureDir(path.dirname(filePath));
	const yaml = Object.entries(frontmatter)
		.filter(([, v]) => v !== undefined && v !== null && v !== '')
		.map(([k, v]) => `${k}: ${typeof v === 'number' ? v : escapeYaml(v)}`)
		.join('\n');
	fs.writeFileSync(filePath, `---\n${yaml}\n---\n\n${body}`);
}

function migrateLetter() {
	const letterHtmlPath = path.join(
		SOURCE,
		'Canada Pre-Tour - 2026 e0ad8fd9d88b82d5a129817407008c7f.html',
	);
	if (!fs.existsSync(letterHtmlPath)) {
		throw new Error(`Missing letter HTML at ${letterHtmlPath}`);
	}

	const html = fs.readFileSync(letterHtmlPath, 'utf8');
	const pageBody = extractPageBody(html);
	const coverRemote = extractCover(html);
	const blocks = extractBlocks(pageBody).filter((b) => {
		if (b.type === 'image') return false;
		if (b.type === 'h2' && /canada pre-tour/i.test(b.text)) return false;
		if (/travel journal database/i.test(b.text || '')) return false;
		return true;
	});

	const body = `${blocksToMarkdoc(blocks, () => null).trim()}

---

The journey stops are listed below.
`;

	writeMdoc(
		path.join(ROOT, 'src/content/letters', `${LETTER_SLUG}.mdoc`),
		{
			title: 'Canada Pre-Tour - 2026',
			summary:
				'A spontaneous Sahaj road trip across Canada — public programs, lakes, whales, and coast-to-coast friendship.',
			publishedAt: '2026-06-18',
			icon: '🇨🇦',
			cover: coverRemote ? decodeEntities(coverRemote) : '',
			status: 'published',
		},
		`${body.trim()}\n`,
	);

	console.log(`✓ Letter → src/content/letters/${LETTER_SLUG}.mdoc`);
}

function migrateEntries() {
	const dbDir = path.join(SOURCE, 'Canada Pre-Tour - 2026/Travel Journal Database');
	const outDir = path.join(ROOT, 'src/content/entries');
	const publicEntries = path.join(ROOT, 'public/entries');
	ensureDir(outDir);
	ensureDir(publicEntries);

	ENTRIES.forEach((entry, index) => {
		const htmlPath = path.join(dbDir, entry.file);
		if (!fs.existsSync(htmlPath)) {
			console.warn(`! Missing ${entry.file}`);
			return;
		}

		const slug = slugify(entry.title);
		const html = fs.readFileSync(htmlPath, 'utf8');
		const pageBody = extractPageBody(html);
		const folderPath = path.join(dbDir, entry.folder);
		const publicDir = path.join(publicEntries, slug);
		ensureDir(publicDir);

		const imageMapper = (src) => {
			if (/^https?:\/\//i.test(src) && !/notion\.com/i.test(src)) return src;
			const local = resolveLocalImage(src, folderPath);
			if (!local) return null;
			const destName = path.basename(local).replace(/\s+/g, '-');
			const dest = path.join(publicDir, destName);
			if (!fs.existsSync(dest)) copyImage(local, dest);
			return `/entries/${slug}/${destName}`;
		};

		let cover = null;
		const coverSrc = extractCover(html);
		if (coverSrc && !/^https?:\/\//i.test(coverSrc)) cover = imageMapper(coverSrc);
		if (!cover && fs.existsSync(folderPath)) {
			const firstImg = fs.readdirSync(folderPath).find((f) => /\.(jpe?g|png|webp)$/i.test(f));
			if (firstImg) {
				const destName = firstImg.replace(/\s+/g, '-');
				copyImage(path.join(folderPath, firstImg), path.join(publicDir, destName));
				cover = `/entries/${slug}/${destName}`;
			}
		}
		if (!cover && coverSrc && /^https?:\/\//i.test(coverSrc)) cover = coverSrc;

		const blocks = extractBlocks(pageBody);
		const filtered = blocks.filter((b, i) => {
			if (i === 0 && b.type === 'h2') return false;
			return true;
		});
		const body = blocksToMarkdoc(filtered, imageMapper);

		writeMdoc(
			path.join(outDir, `${slug}.mdoc`),
			{
				title: entry.title,
				letter: LETTER_SLUG,
				publishedAt: entry.date,
				icon: entry.emoji,
				order: index + 1,
				cover: cover || '',
			},
			body || '_(Content forthcoming.)_\n',
		);

		console.log(`✓ Entry ${index + 1}: ${slug}`);
	});
}

function main() {
	if (!fs.existsSync(SOURCE)) {
		console.error(`Canada source not found: ${SOURCE}`);
		process.exit(1);
	}
	console.log(`Migrating from ${SOURCE}`);
	migrateLetter();
	migrateEntries();
	console.log('Done.');
}

main();
