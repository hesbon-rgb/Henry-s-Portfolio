<script lang="ts">
	import { base } from '$app/paths';
	import type { ProjectsConfig } from '$lib/types';

	let { data }: { data: ProjectsConfig } = $props();
	let activeCategory = $state('All projects');

	const categories = $derived([
		'All projects',
		...new Set(data.project.map((project) => project.category ?? 'Engineering'))
	]);
	const visibleProjects = $derived(
		data.project.filter(
			(project) =>
				activeCategory === 'All projects' || (project.category ?? 'Engineering') === activeCategory
		)
	);
</script>

<svelte:head>
	<title>Projects | Engineering Portfolio</title>
	<meta
		name="description"
		content="Engineering projects, CAD designs, and prototypes by Henry Hesbon Gudo."
	/>
</svelte:head>

<main class="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 lg:pt-14">
	<header class="mb-9 max-w-3xl">
		<p class="text-sm font-semibold tracking-[0.18em] text-cyan-200 uppercase">Selected work</p>
		<h1 class="mt-3 text-5xl font-bold text-white sm:text-6xl">Projects in practice</h1>
		<p class="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
			A growing collection of engineering designs, technical drawings, and ideas in progress.
		</p>
	</header>

	<div class="mb-8 flex flex-wrap gap-2" aria-label="Filter projects">
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

	<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
		{#each visibleProjects as project, index}
			{@const title =
				project.grid_item.find((item) => item.type === 'title')?.content ?? `Project ${index + 1}`}
			{@const notes = project.grid_item.filter((item) => item.type !== 'title')}
			{@const summary =
				notes.find((item) => item.type === 'text')?.content ?? 'Project details coming soon.'}
			<article
				class="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b1d33]/75 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-100/30 hover:shadow-cyan-950/30"
			>
				<div
					class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-950 via-slate-800 to-cyan-950"
				>
					{#if project.cover}
						<img
							src={`${base}/${project.cover}`}
							alt="{title} engineering design"
							class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
							loading="lazy"
						/>
					{:else}
						<div
							class="flex h-full items-center justify-center text-6xl text-cyan-100/35"
							aria-hidden="true"
						>
							⌘
						</div>
					{/if}
					<div
						class="absolute inset-0 bg-gradient-to-t from-[#07182b]/80 via-transparent to-transparent"
					></div>
					<span
						class="absolute top-4 left-4 rounded-full border border-white/15 bg-[#07182b]/75 px-3 py-1.5 text-xs font-medium text-cyan-100 backdrop-blur"
					>
						{project.category ?? 'Engineering'}
					</span>
					<span
						class="absolute right-4 bottom-4 text-sm font-semibold tracking-[0.16em] text-white/60"
					>
						{String(index + 1).padStart(2, '0')}
					</span>
				</div>

				<div class="p-5 sm:p-6">
					<h2 class="text-2xl font-semibold text-white">{title}</h2>
					<p class="mt-3 line-clamp-4 text-sm leading-6 text-slate-300">{summary}</p>
					<details class="group/details mt-5 border-t border-white/10 pt-4">
						<summary
							class="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-cyan-100 marker:hidden focus-visible:outline-2 focus-visible:outline-cyan-200"
						>
							<span>Explore project notes</span>
							<span class="transition group-open/details:rotate-45" aria-hidden="true">+</span>
						</summary>
						<div class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
							{#each notes.filter((item) => item.type === 'text') as note}
								<p>{note.content}</p>
							{/each}
							{#if title === 'Rigid flange coupling'}
								<a
									class="inline-flex items-center gap-2 font-semibold text-cyan-200 hover:text-white"
									href="../archive"
								>
									View calculations in the archive <span aria-hidden="true">→</span>
								</a>
							{/if}
						</div>
					</details>
				</div>
			</article>
		{/each}
	</div>
</main>
