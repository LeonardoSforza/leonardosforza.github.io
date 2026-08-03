import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
	nodes: {
		image: {
			...nodes.image,
			render: component('./src/components/markdoc/MarkdocImage.astro'),
		},
	},
	tags: {
		video: {
			render: component('./src/components/markdoc/VideoEmbed.astro'),
			attributes: {
				src: { type: String, required: true },
				title: { type: String },
			},
		},
		callout: {
			render: component('./src/components/markdoc/Callout.astro'),
			attributes: {
				type: { type: String, default: 'note' },
			},
		},
	},
});
