// src/lib/constants/siteData.ts

export const siteData = {
	home: {
		title: 'Skatebit - Recent News',
		description:
			'Discover the latest official updates, news, and videos from Skater XL, Session, Skate, and more—all in one place.',
		heading: 'News',
		href: '/'
	},
	guides: {
		title: 'Skatebit - Guides',
		description:
			'Find essential guides and tutorials to help you get started with Skater XL modding.',
		heading: 'Guides',
		href: '/guides'
	},
	links: {
		title: 'Skatebit - Helpful Links',
		description: 'Helpful links and resources to get you started with Skater XL modding.',
		heading: 'Helpful Links',
		href: '/links'
	},
	mods: {
		title: 'Skatebit - Mods',
		description: 'Discover the latest mods for Skater XL.',
		heading: 'Mods',
		href: '/mods'
	},
	stats: {
		title: 'Skatebit - Stats & Settings',
		description: 'Download and share Skater XL stats and settings.',
		heading: 'Stats & Settings',
		href: '/stats'
	}
};

// Utility function to get navigation links
export function getNavLinks() {
	return Object.values(siteData).map(({ heading, href }) => ({ name: heading, href }));
}
