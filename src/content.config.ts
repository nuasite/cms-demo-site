import { glob } from 'astro/loaders'
import { defineCollection, reference } from 'astro:content'
import { defineCmsCollection, n } from '@nuasite/cms'

/**
 * Demo content collections for exercising the Nua CMS in project-edit.
 *
 * A generic, rich content model (blog + authors + products + FAQ + pages) that
 * covers the full field-type range and the editor features: image previews from
 * entry-relative paths, the `n.markdown()` rich editor, autosizing textareas,
 * references, arrays of objects/images, nested objects, enums, and the
 * declarative `defineCmsCollection({ cms })` form layout (tabs/sidebar/sections).
 */

// --- authors: data collection (yaml) ---
const authors = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/authors' }),
	schema: n.object({
		name: n.text({ label: 'Full name' }),
		role: n.text(),
		avatar: n.image({ label: 'Avatar' }),
		bio: n.markdown({ label: 'Bio' }),
		email: n.email(),
		website: n.url(),
		social: n.object({
			twitter: n.url(),
			github: n.url(),
			linkedin: n.url(),
		}),
	}),
})

// --- blog: markdown collection (file body + frontmatter) ---
const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: () =>
		n.object({
			title: n.text({ label: 'Title' }),
			perex: n.textarea({ label: 'Perex', rows: 2 }),
			cover: n.image(),
			author: reference('authors'),
			category: n.enum(['news', 'guides', 'stories']),
			tags: n.array(n.string()),
			publishedAt: n.date(),
			readingMinutes: n.number({ sidebar: true, min: 1 }),
			draft: n.boolean({ sidebar: true }),
			seo: n.object({
				metaTitle: n.text(),
				metaDescription: n.textarea(),
			}),
		}),
})

// --- product: data collection (yaml) with a declarative form layout ---
const product = defineCmsCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/product' }),
	schema: n.object({
		title: n.text({ width: 'half' }),
		slug: n.text({ width: 'half' }),
		category: n.enum(['hot-tubs', 'saunas', 'pools', 'accessories']),
		hero: n.image({ label: 'Hero image' }),
		gallery: n.array(n.image()),
		summary: n.textarea({ label: 'Short summary' }),
		description: n.markdown({ label: 'Description' }),
		price: n.number({ width: 'half' }),
		salePrice: n.number({ label: 'Sale price', width: 'half' }),
		sku: n.text(),
		inStock: n.boolean(),
		featured: n.boolean(),
		specs: n.array(n.object({ label: n.text(), value: n.text() })),
		tags: n.array(n.string()),
		seo: n.object({
			metaTitle: n.text(),
			metaDescription: n.textarea(),
		}),
	}),
	cms: {
		display: 'tabs',
		sidebar: ['featured', 'inStock', 'price', 'salePrice', 'sku'],
		sections: [
			{ title: 'Basics', fields: ['title', 'slug', 'category', 'summary'] },
			{ title: 'Media', fields: ['hero', 'gallery'] },
			{ title: 'Description', fields: ['description'] },
			{ title: 'Specs', fields: ['specs'], collapsed: true },
			{ title: 'SEO', fields: ['seo', 'tags'], collapsed: true },
		],
	},
})

// --- faq: data collection (yaml) ---
const faq = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/faq' }),
	schema: n.object({
		question: n.text(),
		answer: n.markdown(),
		category: n.enum(['general', 'pricing', 'delivery', 'support']),
		order: n.number().orderBy('asc'),
		published: n.boolean(),
	}),
})

// --- page: markdown collection (generic site pages) ---
const page = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/page' }),
	schema: () =>
		n.object({
			title: n.text(),
			heroImage: n.image(),
			seo: n.object({
				metaTitle: n.text(),
				metaDescription: n.textarea(),
			}),
		}),
})

export const collections = { authors, blog, product, faq, page }
