<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import type { SkillsConfig } from '$lib/types';

	let { data }: { data: SkillsConfig } = $props();
	let activeCategory = $state('All skills');
	let search = $state('');

	const categories = $derived(['All skills', ...data.section.map((section) => section.name)]);
	const visibleSections = $derived(
		data.section
			.filter((section) => activeCategory === 'All skills' || section.name === activeCategory)
			.map((section) => ({
				...section,
				skill: section.skill.filter((skill) =>
					skill.name.toLowerCase().includes(search.trim().toLowerCase())
				)
			}))
			.filter((section) => section.skill.length > 0)
	);
	const skillCount = $derived(
		data.section.reduce((total, section) => total + section.skill.length, 0)
	);
</script>

<svelte:head>
	<title>Skills | Engineering Portfolio</title>
	<meta
		name="description"
		content="CAD, engineering, and visual design tools used by Henry Hesbon Gudo."
	/>
</svelte:head>

<main class="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 lg:pt-14">
	<header class="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
		<div class="max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.18em] text-cyan-200 uppercase">
				Tools I work with
			</p>
			<h1 class="mt-3 text-5xl font-bold text-white sm:text-6xl">Skills &amp; toolkit</h1>
			<p class="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
				A practical toolkit for turning engineering ideas into considered designs and clear visuals.
			</p>
		</div>
		<label class="relative block w-full lg:max-w-xs">
			<span class="sr-only">Search skills</span>
			<span
				class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
				aria-hidden="true">⌕</span
			>
			<input
				type="search"
				bind:value={search}
				placeholder="Find a tool..."
				class="w-full rounded-full border border-white/15 bg-white/[0.04] py-3 pr-4 pl-11 text-sm text-white placeholder:text-slate-400 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/15 focus:outline-none"
			/>
		</label>
	</header>

	<div class="mt-9 flex flex-wrap gap-2" aria-label="Filter skills by category">
		{#each categories as category}
			<button
				type="button"
				aria-pressed={activeCategory === category}
				onclick={() => (activeCategory = category)}
				class="rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 {activeCategory ===
				category
					? 'border-cyan-200 bg-cyan-200 text-[#07182b]'
					: 'border-white/15 bg-white/[0.04] text-slate-300 hover:border-cyan-100/40 hover:bg-white/[0.08]'}"
			>
				{category}
			</button>
		{/each}
	</div>

	<div class="mt-8 space-y-10">
		{#each visibleSections as section}
			<section aria-label={section.name}>
				<div class="mb-4 flex items-center gap-3">
					<h2 class="text-xl font-semibold text-white">{section.name}</h2>
					<div class="h-px flex-1 bg-gradient-to-r from-cyan-200/30 to-transparent"></div>
					<span class="text-xs text-slate-400">{section.skill.length} tools</span>
				</div>
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each section.skill as skill}
						{@const Icon = skill.icon ? getIcon(skill.icon) : null}
						<article
							class="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1d33]/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-100/30 hover:bg-[#102b48]/90"
						>
							<div
								class="absolute -top-12 -right-10 h-32 w-32 rounded-full bg-cyan-300/5 blur-2xl transition group-hover:bg-cyan-300/15"
								aria-hidden="true"
							></div>
							<div class="relative flex items-center gap-4">
								<div
									class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cyan-100 transition group-hover:border-cyan-100/25 group-hover:bg-cyan-100/10"
								>
									{#if Icon}
										<Icon color={skill.color} font-size={skill.icon_size ?? 30} />
									{:else}
										<span class="text-2xl" aria-hidden="true">✦</span>
									{/if}
								</div>
								<div>
									<h3 class="text-lg font-semibold text-white">{skill.name}</h3>
									<p class="mt-1 text-xs tracking-wide text-slate-400">{section.name}</p>
								</div>
								<span
									class="ml-auto text-cyan-200/50 transition group-hover:translate-x-1 group-hover:text-cyan-100"
									aria-hidden="true">↗</span
								>
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}
		{#if visibleSections.length === 0}
			<div class="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center">
				<p class="text-lg font-semibold text-white">No matching tools yet</p>
				<p class="mt-2 text-sm text-slate-400">
					Try another search or select a different category.
				</p>
			</div>
		{/if}
	</div>
	<p class="mt-10 text-sm text-slate-400">
		{skillCount} skills listed · More can be added in
		<code class="text-cyan-100">content/skills.toml</code>.
	</p>
</main>
