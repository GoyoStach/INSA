// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

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
					items: [
						{ 
							label: 'Introduction', 
							translations: {
								fr: 'Introduction',
								en: 'Introduction',
							},
							link: '/mnsr/introduction/' 
						},
						{
							label: 'Cours 1',
							translations: {
								fr: 'Cours 1',
								en: 'Course 1',
							},
							items: [
								{ 
									label: 'Système et Boîte Noire', 
									translations: {
										fr: 'Système et Boîte Noire',
										en: 'System and Black Box',
									},
									link: '/mnsr/cours-1/systeme-et-boite-noire/' 
								},
								{
									label: 'Composants PC',
									translations: {
										fr: 'Composants PC',
										en: 'PC Components',
									},
									items: [
										{ 
											label: 'Carte Mère', 
											translations: {
												fr: 'Carte Mère',
												en: 'Motherboard',
											},
											link: '/mnsr/cours-1/composants-pc/motherboard/' 
										},
										{ 
											label: 'Processeur (CPU)', 
											translations: {
												fr: 'Processeur (CPU)',
												en: 'Processor (CPU)',
											},
											link: '/mnsr/cours-1/composants-pc/cpu/' 
										},
										{ 
											label: 'Mémoire (RAM)', 
											translations: {
												fr: 'Mémoire (RAM)',
												en: 'Memory (RAM)',
											},
											link: '/mnsr/cours-1/composants-pc/ram/' 
										},
										{ 
											label: 'Stockage', 
											translations: {
												fr: 'Stockage',
												en: 'Storage',
											},
											link: '/mnsr/cours-1/composants-pc/storage/' 
										},
										{ 
											label: 'BIOS', 
											translations: {
												fr: 'BIOS',
												en: 'BIOS',
											},
											link: '/mnsr/cours-1/composants-pc/bios/' 
										},
									],
								},
							],
						},
						{
							label: 'Cours 2',
							translations: {
								fr: 'Cours 2',
								en: 'Course 2',
							},
							items: [
								{ 
									label: 'Lancement PC', 
									translations: {
										fr: 'Lancement PC',
										en: 'PC Boot',
									},
									link: '/mnsr/cours-2/lancement_pc/' 
								},
								{ 
									label: 'Cours Complet Binaire', 
									translations: {
										fr: 'Cours Complet Binaire',
										en: 'Complete Binary Course',
									},
									link: '/mnsr/cours-2/cours_complet_binaire/' 
								},
								{ 
									label: 'Linux Filesystem', 
									translations: {
										fr: 'Linux Filesystem',
										en: 'Linux Filesystem',
									},
									link: '/mnsr/cours-2/linux_filesystem/' 
								},
								{ 
									label: 'Registry vs Linux Config', 
									translations: {
										fr: 'Registry vs Linux Config',
										en: 'Registry vs Linux Config',
									},
									link: '/mnsr/cours-2/registry_vs_linux_config/' 
								},
								{ 
									label: 'Variables d\'Environnement', 
									translations: {
										fr: 'Variables d\'Environnement',
										en: 'Environment Variables',
									},
									link: '/mnsr/cours-2/env_variables/' 
								},
							],
						},
						{
							label: 'Cours 3',
							translations: {
								fr: 'Cours 3',
								en: 'Course 3',
							},
							items: [
								{ 
									label: 'Utilisateurs & Groupes', 
									translations: {
										fr: 'Utilisateurs & Groupes',
										en: 'Users & Groups',
									},
									link: '/mnsr/cours-3/user_group_management/' 
								},
								{ 
									label: 'Exercice Librairie', 
									translations: {
										fr: 'Exercice Librairie',
										en: 'Library Exercise',
									},
									link: '/mnsr/cours-3/library_exercise/' 
								},
							],
						},
					],
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
