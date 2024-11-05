// src/lib/constants/siteData.ts

export const siteName = {
	info: {
		title: 'Website',
		href: '/'
	}
};

export const siteData = {
	news: {
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
	forum: {
		title: 'Forum',
		description:
			'Join the community to discuss Skater XL modding, share your work, and get help with your projects.',
		href: '/forum'
	},
	submit: {
		title: 'Submit',
		description: 'Share and rate your favorite Skater XL YouTube videos and clips.',
		href: '/submit'
	},
	links: {
		title: 'Links',
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
