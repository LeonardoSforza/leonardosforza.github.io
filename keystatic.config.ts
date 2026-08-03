import { config, fields, collection } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		letters: collection({
			label: 'Letters',
			slugField: 'title',
			path: 'src/content/letters/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				summary: fields.text({
					label: 'Summary',
					multiline: true,
					description: 'Short blurb shown on the letters index and home.',
				}),
				publishedAt: fields.date({ label: 'Published date' }),
				icon: fields.text({
					label: 'Icon / emoji',
					defaultValue: '✉️',
				}),
				cover: fields.image({
					label: 'Cover image',
					directory: 'public/letters',
					publicPath: '/letters/',
				}),
				status: fields.select({
					label: 'Status',
					options: [
						{ label: 'Draft', value: 'draft' },
						{ label: 'Published', value: 'published' },
					],
					defaultValue: 'draft',
				}),
				content: fields.markdoc({
					label: 'Content',
					options: {
						formatting: {
							headingLevels: [2, 3, 4],
							inlineMarks: true,
							listTypes: true,
							blockTypes: true,
						},
						dividers: true,
						links: true,
						tables: true,
						layouts: [[1], [1, 1], [1, 1, 1]],
						image: {
							directory: 'public/letters',
							publicPath: '/letters/',
						},
					},
				}),
			},
		}),
		entries: collection({
			label: 'Entries',
			slugField: 'title',
			path: 'src/content/entries/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				letter: fields.relationship({
					label: 'Letter',
					collection: 'letters',
				}),
				publishedAt: fields.date({ label: 'Date' }),
				icon: fields.text({
					label: 'Icon / emoji',
					defaultValue: '📍',
				}),
				order: fields.integer({
					label: 'Order',
					description: 'Sort order within the letter (1 = first stop).',
					defaultValue: 1,
				}),
				cover: fields.image({
					label: 'Cover image',
					directory: 'public/entries',
					publicPath: '/entries/',
				}),
				content: fields.markdoc({
					label: 'Content',
					options: {
						formatting: {
							headingLevels: [2, 3, 4],
							inlineMarks: true,
							listTypes: true,
							blockTypes: true,
						},
						dividers: true,
						links: true,
						tables: true,
						layouts: [[1], [1, 1], [1, 1, 1]],
						image: {
							directory: 'public/entries',
							publicPath: '/entries/',
						},
					},
				}),
			},
		}),
	},
});
