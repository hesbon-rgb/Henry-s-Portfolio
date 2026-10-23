<script lang="ts">
	import { base } from '$app/paths';
	import type { ListPageConfig } from '$lib/types';

	let { data }: { data: ListPageConfig } = $props();
	let activeCategory = $state('All work');
	let selectedImage = $state<{ src: string; alt: string; caption: string } | null>(null);
	let imageDialog: HTMLDialogElement;

	const categories = $derived([
		'All work',
		...new Set(data.item.map((item) => item.category ?? 'Other'))
	]);
	const visibleItems = $derived(
		data.item.filter((item) => activeCategory === 'All work' || item.category === activeCategory)
	);

	function showImage(image: { src: string; alt: string; caption: string }) {
		selectedImage = image;
		imageDialog.showModal();
	}
</script>

<svelte:head>
	<title>{data.title} | Engineering Portfolio</title>
	<meta name="description" content={data.intro ?? 'Selected graphic and visual design work.'} />
</svelte:head>

<main class="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 lg:pt-14">
	<header
		class="relative mb-9 overflow-hidden rounded-[2rem] border border-fuchsia-100/15 bg-gradient-to-br from-[#201c48] via-[#10274a] to-[#0a1d39] p-6 sm:p-9"
	>
		<div
			class="pointer-events-none absolute -top-28 -right-16 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl"
			aria-hidden="true"
		></div>
		<div class="relative max-w-3xl">
			<p class="text-sm font-semibold tracking-[0.18em] text-fuchsia-200 uppercase">
				Visual identity · Posters · Apparel
			</p>
			<h1 class="mt-3 text-5xl font-bold text-white sm:text-6xl">{data.title}</h1>
			<p class="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{data.intro}</p>
			<a
				class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-fuchsia-100/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-200"
				href="{base}/experience"
			>
				See my design and publicity experience <span aria-hidden="true">→</span>
			</a>
		</div>
	</header>

	<div class="mb-7 flex flex-wrap gap-2" aria-label="Filter design work">
		{#each categories as category}
			<button
				type="button"
				aria-pressed={activeCategory === category}
				onclick={() => (activeCategory = category)}
				class="rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-200 {activeCategory ===
				category
					? 'border-fuchsia-200 bg-fuchsia-200 text-[#181333]'
					: 'border-white/15 bg-white/[0.04] text-slate-300 hover:border-fuchsia-100/40 hover:bg-white/[0.08]'}"
			>
				{category}
			</button>
		{/each}
	</div>

	<div class="grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-3">
		{#each visibleItems as item}
			<article
				class="group overflow-hidden rounded-3xl border border-white/10 bg-[#0b1d33]/75 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-100/30"
			>
				{#each item.images as image}
					<button
						type="button"
						class="block w-full cursor-zoom-in overflow-hidden bg-[#081426] text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-fuchsia-200"
						aria-label="View larger image: {image.caption}"
						onclick={() => showImage(image)}
					>
						<img
							src="{base}/{image.src}"
							alt={image.alt}
							class="max-h-[34rem] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
							loading="lazy"
						/>
					</button>
				{/each}
				<div class="p-5">
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="text-xs font-semibold tracking-[0.14em] text-fuchsia-200 uppercase">
								{item.category}
							</p>
							<h2 class="mt-2 text-2xl font-semibold text-white">{item.title}</h2>
						</div>
						<span
							class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
							>{item.meta}</span
						>
					</div>
					<p class="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
					{#if item.link}
						<a
							class="mt-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-100/25 bg-fuchsia-100/[0.06] px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:border-fuchsia-100/50 hover:bg-fuchsia-100/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-200"
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							{item.link_label ?? 'View design'} <span aria-hidden="true">↗</span>
						</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>

	<aside class="mt-10 rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
		<h2 class="text-xl font-semibold text-white">More designs coming soon</h2>
		<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
			More poster and design work can be added here. Canva links open the original designs in a new
			tab so visitors can view your work there.
		</p>
	</aside>
</main>

<dialog
	bind:this={imageDialog}
	onclose={() => (selectedImage = null)}
	class="image-dialog m-auto max-h-[92vh] max-w-[min(92vw,80rem)] overflow-hidden rounded-2xl border border-white/15 bg-[#081426] p-0 text-white shadow-2xl"
>
	{#if selectedImage}
		<div class="flex max-h-[92vh] flex-col">
			<div class="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
				<p class="text-sm font-medium text-slate-200">{selectedImage.caption}</p>
				<form method="dialog">
					<button
						class="rounded-full border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-fuchsia-200"
					>
						Close <span aria-hidden="true">×</span>
					</button>
				</form>
			</div>
			<img
				src="{base}/{selectedImage.src}"
				alt={selectedImage.alt}
				class="max-h-[calc(92vh-4rem)] min-h-0 object-contain"
			/>
		</div>
	{/if}
</dialog>

<style>
	.image-dialog::backdrop {
		background: rgba(2, 8, 23, 0.86);
		backdrop-filter: blur(8px);
	}
</style>
