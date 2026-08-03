import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const letters = defineCollection({
	loader: glob({ pattern: '**/*.mdoc', base: './src/content/letters' }),
	schema: z.object({
		title: z.string(),
		summary: z.string().default(''),
		publishedAt: z.coerce.date().optional(),
		icon: z.string().default('✉️'),
		cover: z.string().optional().nullable(),
		status: z.enum(['draft', 'published']).default('draft'),
	}),
});

const entries = defineCollection({
	loader: glob({ pattern: '**/*.mdoc', base: './src/content/entries' }),
	schema: z.object({
		title: z.string(),
		letter: z.string(),
		publishedAt: z.coerce.date().optional(),
		icon: z.string().default('📍'),
		order: z.number().default(1),
		cover: z.string().optional().nullable(),
	}),
});

export const collections = { letters, entries };
