// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'INSA',
			defaultLocale: 'fr',
			locales: {
				fr: {
					label: 'Français',
					lang: 'fr',
				},
				en: {
					label: 'English',
					lang: 'en',
					dir: 'ltr',
				},
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'MNSR',
					translations: {
						fr: 'MNSR',
						en: 'MNSR',
					},
					autogenerate: { directory: 'mnsr' },
				},
				{
					label: 'Git',
					translations: {
						fr: 'Git',
						en: 'Git',
					},
					autogenerate: { directory: 'git' },
				},
			],
		}),
	],
});
