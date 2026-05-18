export const experiences = [
	{
		company: 'Yale University',
		time: '2024 - 2026',
		title: 'Postgraduate Associate',
		department: '',
		location: 'New Haven, CT',
		description: '',
	},
	// {
	// 	company: 'Radium Institute (Institut du Radium)',
	// 	time: '1914 - 1934',
	// 	title: 'Director',
	// 	location: 'Paris, France',
	// 	description: 'Led groundbreaking studies on radioactivity and mentored future Nobel Prize laureates.',
	// },
];

export const education = [
	{
		school: 'New York University',
		time: '2026 - ',
		degree: 'Ph.D. in Cognition & Perception',
		department: '',
		location: 'New York City, NY',
		description: '',
	},
	{
		school: 'University of Southern California',
		time: '',
		degree: 'B.S. in Computational Neuroscience\nB.S. in Mathematics',
		location: 'Los Angeles, CA',
		description: '',
	},
	// {
	// 	school: 'University of Paris',
	// 	time: '1891 - 1895',
	// 	degree: 'Master’s in Physics and Mathematics',
	// 	location: 'Paris, France',
	// 	description: 'Graduated at the top of her class in physics and second in mathematics.',
	// },
];

export const skills = [
	{
		title: '',
		description: '',
	},
	// {
	// 	title: 'Experimental Techniques',
	// 	description: 'Spectroscopy, Isolation of Radioactive Elements, Radiation Measurement',
	// },
];

export const publications = [
	{
		title: 'Categorical Bayes Filtering for Computational Phenotyping in Adaptive Learning',
		authors: 'Junxi Chen, Payam Piray',
		journal: 'bioRxiv',
		time: '2026',
		link: 'https://orcid.org/0000-0002-1024-2914',
		tags: ['Bayesian Inference', 'Computational Psychiatry'],
		abstract: 'Adaptive learning requires distinguishing environmental volatility from observation stochasticity, two sources of uncertainty that demand opposite adjustments to the learning rate but inflate experienced variance similarly. Disentangling them is computationally difficult with no tractable closed-form solution. Particle-filter methods are the natural tool for this kind of joint inference, but their stochastic likelihoods and non-differentiable objectives force derivative-free fitting protocols and discourage the individual-difference analyses central to cognitive modeling, where small effect sizes leave little room for additional estimator noise. We introduce the Categorical Bayes Filter (CBF), a deterministic alternative that preserves the conditional structure of recent particle-filter accounts but replaces the stochastic outer layer with a categorical distribution on a quantile grid parameterized through differentiable Beta quantile functions. The procedure performs evidence maximization with an exact, deterministic marginal likelihood that is fully differentiable in the grid parameters. In a volatility-stochasticity task with N = 643 participants, fitted CBF dispersion parameters reveal a cross-over phenotyping pattern between volatility-blind and stochasticity-blind subjects that is not recoverable from particle-filter parameters fit to the same data under a state-of-the-art protocol. The deterministic structure also yields a trial-by-trial ambiguity signal that predicts response times not used in fitting. More broadly, the approach opens individual-level analyses in cognitive modeling and computational psychiatry that stochastic methods have effectively foreclosed.',
	},
	// {
	// 	title: 'The Radiation of Uranium Compounds',
	// 	authors: 'Marie Curie',
	// 	journal: 'Comptes Rendus de l’Académie des Sciences',
	// 	time: '1898',
	// 	link: '#',
	// 	abstract: 'Early research leading to the identification of uranium’s radioactive properties.',
	// },
];
