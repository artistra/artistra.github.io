export const profile = {
	fullName: 'Junxi Chen',
	// title: '',
	position: 'Postgraduate Associate at Yale',
	institute: 'Department of Psychology',
	location: 'New Haven, CT',
	author_name: 'Junxi Chen', // Author name to be highlighted in the papers section
	intro: [
		'I\'m an incoming PhD student in Psychology working with <a href="https://markkho.github.io/" target="_blank">Mark Ho</a> in the <a href="https://codec-lab.github.io/" target="_blank">Computation & Decision-Making Lab</a> at New York University.',
		'Before NYU, I worked as a research technician with <a href="https://rutledgelab.org/" target="_blank">Robb Rutledge</a> at Yale. I received my B.S. degrees in Computational Neuroscience and Mathematics from the University of Southern California, where I worked with <a href="https://piraylab.com" target="_blank">Payam Piray</a>.',
	],
	research_areas: [
		{ title: 'Computational Cognitive Science', description: 'Meta-Learning, Planning', field: 'psychology' },
		{ title: 'Computational Psychiatry', description: 'Subtyping; Subjective Well-Being; Depression, Anxiety', field: 'psychology' }
		// { title: 'Physics', description: 'Brief description of the research interest', field: 'physics' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: 'junxi.chen@yale.edu',
	linkedin: '',
	x: '',
	bluesky: 'https://bsky.app/profile/junxichen.bsky.social',
	github: 'https://github.com/artistra',
	gitlab: '',
	scholar: 'https://scholar.google.com/citations?hl=en&user=gErPehoAAAAJ',
	inspire: '',
	arxiv: '',
	orcid: 'https://orcid.org/0000-0002-1024-2914',
}

export const template = {
	website_url: 'https://junxichen.com', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '' // Repository name starting with /
}

export const seo = {
	default_title: 'Junxi Chen',
	default_description: 'I\'m a researcher working at the intersection of cognitive science, neuroscience, and machine learning. I study how people learn, plan, and make decisions under uncertainty.',
	default_image: '/favicon.svg',
}
