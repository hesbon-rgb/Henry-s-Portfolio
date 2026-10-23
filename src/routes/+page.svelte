<script lang="ts">
	import { base } from '$app/paths';
	import { getIcon } from '$lib/generated/icons';
	import Tooltip from '$lib/components/tooltip.svelte';
	import type { HomeConfig } from '$lib/types';

	let { data }: { data: HomeConfig } = $props();
	let active = $state(0);
	let missing = $state<Record<number, boolean>>({});
	const activeSlide = $derived(data.slide[active]);

	$effect(() => {
		const count = data.slide.length;
		if (count < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = setInterval(() => (active = (active + 1) % count), 5000);
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>{data.name} | Engineering Portfolio</title>
	<meta name="description" content={data.description.replace(/\s+/g, ' ')} />
</svelte:head>

<main class="mx-auto w-full max-w-7xl px-5 pt-8 pb-14 sm:px-8 lg:pt-14">
	<section
		class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
		aria-labelledby="intro-title"
	>
		<div class="flex flex-col items-start">
			<p
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/20 bg-teal-100/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-teal-100 uppercase"
			>
				<span class="h-2 w-2 rounded-full bg-teal-300"></span>
				Engineering · CAD · Visual design
			</p>

			<p class="mb-2 text-lg font-medium text-slate-300">Hello, I’m</p>
			<h1
				id="intro-title"
				class="hero-name max-w-3xl pb-2 text-6xl leading-[0.92] font-bold tracking-tight sm:text-7xl lg:text-8xl"
			>
				{data.name}
			</h1>
			<p class="mt-7 max-w-xl text-base leading-8 whitespace-pre-line text-slate-300 sm:text-lg">
				{data.description}
			</p>

			<div class="mt-8 flex flex-wrap items-center gap-3">
				<a
					class="inline-flex items-center gap-2 rounded-full bg-teal-200 px-6 py-3 font-semibold text-[#10251f] transition hover:-translate-y-0.5 hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200"
					href="{base}/projects"
				>
					Explore my projects <span aria-hidden="true">→</span>
				</a>
				<a
					class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
					href="{base}/skills"
				>
					My skills
				</a>
			</div>

			<div class="mt-8 flex flex-wrap items-center gap-3" aria-label="Social links">
				<span class="mr-1 text-sm text-slate-400">Find me</span>
				{#each data.contact as contact}
					<Tooltip text={contact.name} position="bottom">
						<a
							href={contact.link}
							aria-label={contact.name}
							class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-200 transition hover:-translate-y-0.5 hover:border-teal-200/60 hover:bg-teal-200/10 hover:text-teal-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200"
						>
							{#if contact.icon}
								{@const Icon = getIcon(contact.icon)}
								<Icon color={contact.color} font-size={21} />
							{/if}
						</a>
					</Tooltip>
				{/each}
			</div>
		</div>

		<div class="relative mx-auto w-full max-w-lg lg:ml-auto">
			<div
				class="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-teal-200/10 blur-3xl"
				aria-hidden="true"
			></div>
			<div
				class="relative aspect-[4/5] max-h-[650px] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-200 shadow-2xl shadow-black/30"
			>
				<img
					src={data.photo}
					alt="Portrait of {data.name}"
					class="h-full w-full object-cover object-top"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-t from-[#07131c]/70 via-transparent to-transparent"
				></div>

				<div class="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
					{#if activeSlide}
						<a
							href="{base}/projects"
							class="group flex items-center gap-4 rounded-2xl border border-white/20 bg-[#0a1722]/85 p-3 shadow-xl backdrop-blur-xl transition hover:bg-[#102332]/95 sm:gap-5 sm:p-4"
						>
							<div
								class="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-700 sm:h-24 sm:w-32"
							>
								{#if !missing[active]}
									<img
										src={activeSlide.image}
										alt=""
										class="h-full w-full object-cover"
										onerror={() => (missing[active] = true)}
									/>
								{:else}
									<div
										class="flex h-full items-center justify-center px-2 text-center text-xs text-slate-300"
									>
										Project image
									</div>
								{/if}
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-xs font-semibold tracking-[0.16em] text-teal-200 uppercase">
									A glimpse of my work
								</p>
								<p class="mt-2 truncate text-lg font-semibold text-white sm:text-xl">
									{activeSlide.caption}
								</p>
								<p class="mt-1 text-sm text-slate-300">
									Explore the project <span aria-hidden="true">↗</span>
								</p>
							</div>
						</a>
					{:else}
						<div
							class="rounded-2xl border border-white/20 bg-[#0a1722]/85 p-5 shadow-xl backdrop-blur-xl"
						>
							<p class="text-sm font-semibold tracking-[0.16em] text-teal-200 uppercase">
								Engineering portfolio
							</p>
							<p class="mt-2 text-xl font-semibold text-white">A selection of my work</p>
						</div>
					{/if}
				</div>
			</div>

			{#if data.slide.length > 1}
				<div class="mt-4 flex gap-2" aria-label="Featured projects">
					{#each data.slide as slide, i}
						<button
							type="button"
							aria-label="Show {slide.caption}"
							aria-pressed={active === i}
							onclick={() => (active = i)}
							class="h-1.5 flex-1 rounded-full bg-white/20 transition-colors hover:bg-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200 {active ===
							i
								? '!bg-teal-200'
								: ''}"
						></button>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<section
		class="mt-20 border-t border-white/10 pt-8 sm:mt-24 sm:pt-10"
		aria-labelledby="more-title"
	>
		<div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="text-sm font-semibold tracking-[0.18em] text-teal-200 uppercase">
					Take a closer look
				</p>
				<h2 id="more-title" class="mt-2 text-3xl font-bold text-white sm:text-4xl">
					Explore my portfolio
				</h2>
			</div>
			<a class="font-medium text-slate-300 transition hover:text-teal-100" href="{base}/archive">
				Open technical archive <span aria-hidden="true">→</span>
			</a>
		</div>

		<div class="mt-7 grid gap-3 sm:grid-cols-3">
			<a
				class="glass group p-5 transition hover:-translate-y-1 hover:border-teal-200/40"
				href="{base}/projects"
			>
				<p class="text-sm text-slate-400">01</p>
				<h3 class="mt-3 text-2xl font-semibold text-white">Projects</h3>
				<p class="mt-2 text-sm leading-6 text-slate-300">
					Design work, prototypes, and engineering projects.
				</p>
			</a>
			<a
				class="glass group p-5 transition hover:-translate-y-1 hover:border-teal-200/40"
				href="{base}/skills"
			>
				<p class="text-sm text-slate-400">02</p>
				<h3 class="mt-3 text-2xl font-semibold text-white">Skills</h3>
				<p class="mt-2 text-sm leading-6 text-slate-300">
					The tools and capabilities I bring to my work.
				</p>
			</a>
			<a
				class="glass group p-5 transition hover:-translate-y-1 hover:border-teal-200/40"
				href="{base}/experience"
			>
				<p class="text-sm text-slate-400">03</p>
				<h3 class="mt-3 text-2xl font-semibold text-white">Experience</h3>
				<p class="mt-2 text-sm leading-6 text-slate-300">
					My learning journey and practical experience.
				</p>
			</a>
		</div>
	</section>
</main>
