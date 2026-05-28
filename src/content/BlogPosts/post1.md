---
title: "When should we change our minds?"
date: "2026-05-27"
tags: ["Bayesian Inference", "Computational Psychiatry"]
excerpt: "The background and intuition behind my Categorical Bayes Filter work."
---

_This post gives the intuition behind my recent work with Payam Piray on  ["Categorical Bayes Filtering for Computational Phenotyping in Adaptive Learning."](https://www.biorxiv.org/content/10.64898/2026.05.14.725268v1)_

One of the basic problems of learning is deciding how much to trust new information. Whenever something surprising happens, we have to decide whether it reflects a real change in the world or just noise in what we happened to observe. This comes up everywhere. If a usually reliable friend gives a cold reply, maybe something in the relationship has changed, or maybe they are just tired. If a stock suddenly drops, maybe the company’s prospects have shifted, or maybe the market is having a noisy day. If your train is late once, maybe the schedule has become unreliable, or maybe it was just a one-time delay. In all of these cases, the same observation can support two very different interpretations.

Computationally, this is the distinction between **volatility** and **stochasticity**. **Volatility** means the underlying state of the world is changing. **Stochasticity** means the underlying state may be stable, but each observation is noisy. These two forms of uncertainty call for opposite learning strategies. If the world is volatile, you should update quickly, because old beliefs may no longer be useful. Early models of adaptive learning highlighted that environments with high volatility require higher learning rates ([Behrens et al., 2007](https://www.nature.com/articles/nn1954)). If the world is stochastic, you should update cautiously, because any single observation may be misleading.

The difficulty is that, from experience alone, volatility and stochasticity can look very similar. Both produce surprising outcomes. Learning is therefore not only about updating from prediction errors. It is also about explaining what caused those prediction errors. The learner has to solve an attribution problem: should surprise be explained by a changing hidden state, or by noisy observations around a stable state?

## A Bird, a Bucket, and Two Kinds of Uncertainty

One way to study this problem is through a game-like prediction task ([Piray & Daw, 2024](https://www.nature.com/articles/s41467-024-53459-z)). Imagine there is a bird flying across the screen dropping bags of coins, but you cannot see the bird directly. On each trial, you place a bucket where you think the bird will drop a bag of coins. Then the bag appears, and you see how far off your prediction was. The tricky part is that the bag does not always fall straight down. Sometimes the bird's hidden position changes a lot from trial to trial - that is volatility. Sometimes the bird is relatively stable, but wind pushes the bag away from the bird’s true position - that is stochasticity. So when a bag lands far from your bucket, you face the same problem as in real life: did the hidden thing you care about change, or was this just a noisy observation?

The hard part is that these two explanations compete:

- If you decide the bird moved, then the surprising bag location is evidence for volatility, and you should move your bucket more next time.
- If you decide the wind caused the error, then the same surprise is evidence for stochasticity, and you should move your bucket less.

In Bayesian terms, volatility and stochasticity **explain away** each other. The more a prediction error is explained by one source, the less it needs to be explained by the other. This means the two estimates are coupled: getting one wrong can systematically bias the other. Previous work has shown that this explaining-away effect is central to human learning ([Piray & Daw, 2021](https://www.nature.com/articles/s41467-021-26731-9)). This is why the problem cannot be fully captured by a model that estimates one source of uncertainty while holding the other fixed. The central computation is the competition between the two.

## Why Particle Filters Are Powerful but Difficult to Use

One way to solve this problem is to keep many possible explanations in mind at once. One hypothesis might say the world is highly volatile but not very noisy. Another might say the world is stable but observations are very noisy. A particle-filter model does something like this: it maintains a cloud of possible hypotheses and gives more weight to the ones that better explain the data. Recent models have used particle filters to capture how humans simultaneously track these competing sources of noise ([Piray & Daw, 2024](https://www.nature.com/articles/s41467-024-53459-z)).

This is a powerful idea, but it creates practical problems for cognitive modeling. Particle filters rely on sampling, which means that fitting the same model to the same participant twice can produce slightly different likelihoods or parameter estimates. Their likelihoods are stochastic, and their objectives are not differentiable in the way standard gradient-based fitting methods require. As a result, fitting them to individual participants can be slow, noisy, and unstable.

This matters because many questions in psychology are individual-difference questions. We often care about subtle variation across people: who updates too much, who updates too little, and which kind of uncertainty each person is sensitive to. If the model-fitting procedure adds extra noise, it becomes harder to tell whether a parameter reflects the person or the fitting procedure. Beyond the statistical noise, there is also an interpretability issue. Even when a model captures the average learning pattern, its fitted parameters may not cleanly reveal the structure of individual differences. For computational phenotyping, we want more than a model that says whether someone is “more adaptive” or “less adaptive.” We want a model that tells us which part of the learning process is distorted.

In this task, different people can fail in different ways:

- A **volatility-blind** learner may fail to update enough when the world changes, treating real change as if it were just noise.
- A **stochasticity-blind** learner may do the opposite, treating noisy observations as if they reveal real change and updating too much.

These are not simply stronger or weaker versions of the same deficit. They are different computational phenotypes: different ways of misattributing uncertainty.

## The Categorical Bayes Filter

The Categorical Bayes Filter, or CBF, is a deterministic alternative to particle filters ([Chen & Piray, 2026](https://www.biorxiv.org/content/10.64898/2026.05.14.725268v1)). Instead of representing beliefs with randomly moving particles, it represents beliefs on a fixed grid. 

You can think of this grid as a map of possible explanations. One axis is volatility: how much the hidden state is changing. The other axis is stochasticity: how noisy the observations are. Each point on the map represents one possible combination of the two.

As new observations arrive, the points themselves do not move. What changes is the amount of probability assigned to each point:

- If a surprising outcome is better explained by a changing world, probability shifts toward the high-volatility region.
- If it is better explained by noisy observations, probability shifts toward the high-stochasticity region.
- If the evidence is ambiguous, probability remains spread across multiple explanations.

This fixed-grid representation removes the randomness from the outer inference procedure: given the same data and parameters, the model gives the same answer every time. The grid also gives the model interpretable parameters. Roughly, the model can describe where a person’s prior expectations are centered and how spread out those expectations are. The spread, or dispersion, matters because it determines how much the model can move when new evidence arrives. A broad grid keeps probability spread across a wide range of values, so surprising outcomes can genuinely shift the model's beliefs. A narrow grid clusters almost all probability mass in a small region, so even when new evidence arrives, there is nowhere for the mass to go. The model cannot update much in that dimension, not because it has seen evidence against change, but because the representation never gave it room to.

This is useful for computational phenotyping. A person who is volatility-blind can be modeled as having a narrow prior over volatility: the grid has little room to absorb surprise on that dimension, so the explaining-away competition is structurally tilted from the start. Surprising outcomes get pushed toward stochasticity not because the evidence points there, but because that is the only dimension with enough spread to accommodate them. Conversely, a person who is stochasticity-blind may have a narrow prior over stochasticity, causing noisy observations to be misread as real environmental change.

## What We Found in Human Behavior

We applied CBF to data from 643 participants performing the bird-and-bucket prediction task (collected in [Piray & Daw, 2024](https://www.nature.com/articles/s41467-024-53459-z)). Across blocks of the task, both the bird’s movement and the wind varied systematically, allowing volatility and stochasticity to be manipulated separately.

The model captured the expected adaptive pattern: learning rates increased when volatility was high and decreased when stochasticity was high. More importantly, the fitted parameters revealed a crossover pattern between behaviorally defined subgroups. Participants who were volatility-blind had narrow priors over volatility, while participants who were stochasticity-blind had narrow priors over stochasticity.

This is the pattern the framework predicts: if a learner cannot flexibly represent one source of uncertainty, surprise tends to be misattributed to the other.

The model also produced a trial-by-trial measure of ambiguity. On some trials, the evidence clearly favored one explanation: the surprise looked more like volatility or more like stochasticity. On other trials, the evidence did not clearly distinguish between the two. Participants responded more slowly on these ambiguous trials. Importantly, response times were not used to fit the model. This suggests that the model captured something about the cognitive difficulty of deciding what kind of uncertainty caused the error. In other words, the model’s ambiguity signal lined up with moments when people themselves seemed to hesitate.

## The Broader Point

The broader takeaway is that cognitive models need to be useful not only as elegant theories, but also as practical measurement tools. Many models describe sophisticated computations that people might perform. But if we want to study individual differences and clinical phenotypes, we also need models that can be fit stably and interpreted at the individual level. This approach opens the door for new applications in computational psychiatry, where specific computational phenotypes can be related to clinical traits. See a recent application of CBF in the preprint by [Fang & Piray (2026)](https://www.biorxiv.org/content/10.64898/2026.05.22.727329v1).

The CBF is one attempt to bridge these goals. It preserves the psychological structure of the computation but replaces a noisy sampling-based approximation with a deterministic belief representation that is easier to fit, scale, and interpret.

## Related Reading

- **Behrens et al. (2007, Nature Neuroscience), ["Learning the value of information in an uncertain world."](https://www.nature.com/articles/nn1954)** A classic paper on how people adjust learning under volatility.
- **Piray & Daw (2021, Nature Communications), ["A model for learning based on the joint estimation of stochasticity and volatility."](https://www.nature.com/articles/s41467-021-26731-9)** Introduces the theoretical framework that volatility and stochasticity must be inferred jointly, because they compete to explain experienced noise.
- **Piray & Daw (2024, Nature Communications), ["Computational processes of simultaneous learning of stochasticity and volatility in humans."](https://www.nature.com/articles/s41467-024-53459-z)** Tests this idea in human participants using the bird-and-bucket task.
- **Chen & Piray (2026, bioRxiv preprint), ["Categorical Bayes Filtering for Computational Phenotyping in Adaptive Learning."](https://www.biorxiv.org/content/10.64898/2026.05.14.725268v1)** Introduces CBF as a deterministic alternative for fitting and phenotyping individual differences in this setting.
- **Fang & Piray (2026, bioRxiv preprint), ["Dissociating volatility and stochasticity reveals transdiagnostic computational signatures of psychopathology."](https://www.biorxiv.org/content/10.64898/2026.05.22.727329v1)** A translational extension of the volatility-stochasticity framework, using CBF-based modeling to relate dimension-specific learning deficits to psychiatric traits.
