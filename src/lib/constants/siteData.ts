// src/lib/constants/siteData.ts

export const siteName = {
	name: 'Website Name',
	abbr: 'WN'
};

export const siteData = {
	home: {
		title: 'News',
		description:
			'Discover the latest official updates, news, and videos from Skater XL, Session, Skate, and more—all in one place.',
		href: '/'
	},
	guides: {
		title: 'Guides',
		description:
			'Find essential guides and tutorials to help you get started with Skater XL modding.',
		href: '/guides'
	},
	links: {
		title: 'Helpful Links',
		description: 'Helpful links and resources to get you started with Skater XL modding.',
		href: '/links'
	},
	mods: {
		title: 'Mods',
		description: 'Discover the latest mods for Skater XL.',
		href: '/mods'
	},
	stats: {
		title: 'Stats & Settings',
		description: 'Download and share Skater XL stats and settings.',
		href: '/stats'
	}
};

// Utility function to get navigation links
export function getNavLinks() {
	return Object.values(siteData).map(({ title, href }) => ({ name: title, href }));
}
