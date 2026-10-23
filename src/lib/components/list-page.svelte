<script lang="ts">
	import { reveal } from '$lib/reveal';
	import type { ListPageConfig } from '$lib/types';
	let { data }: { data: ListPageConfig } = $props();
</script>

<div class="flex w-full justify-center px-4 pb-8">
	<div class="w-full max-w-4xl">
		<h1 class="p-4 text-center text-4xl font-bold sm:text-6xl">{data.title}</h1>
		{#if data.intro}<p class="mx-auto mb-6 max-w-2xl text-center text-gray-500">{data.intro}</p>{/if}
		<div class="flex flex-col gap-4">
			{#each data.item as item}
				<article use:reveal class="glass reveal p-5">
					<h2 class="text-2xl font-semibold">{item.title}</h2>
					{#if item.meta}<p class="mt-1 font-mono text-sm text-sky-300">{item.meta}</p>{/if}
					<p class="mt-3 whitespace-pre-line">{item.text}</p>
					{#if item.link}
						<a class="mt-3 inline-flex items-center gap-2 rounded-full border border-sky-200/60 px-3 py-1 text-sm hover:bg-white/15" href={item.link} target="_blank" rel="noopener"><span aria-hidden="true">✓</span> {item.link_label ?? 'Open'}</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</div>
