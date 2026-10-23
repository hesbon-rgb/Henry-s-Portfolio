<script lang="ts">
	import { reveal } from '$lib/reveal';
	import type { ExperienceConfig } from '$lib/types';
	let { data }: { data: ExperienceConfig } = $props();
</script>

<div class="mx-auto w-full max-w-4xl px-4 pb-16">
	<h1 class="p-4 text-center text-4xl font-bold sm:text-6xl">Experience</h1>
	<div class="relative pl-8 md:pl-0">
		<div class="absolute top-0 bottom-0 left-3 w-px bg-gradient-to-b from-sky-200 via-sky-300/60 to-transparent md:left-1/2"></div>
		{#each data.experience as e, i}
			<div use:reveal class="reveal relative mb-10 md:w-1/2 {i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10'}">
				<span class="glow absolute top-6 -left-[26px] h-3 w-3 rounded-full bg-sky-200 shadow-[0_0_14px_4px_rgba(125,211,252,.8)] md:left-auto {i % 2 ? 'md:-left-1.5' : 'md:-right-1.5'}"></span>
				<article class="glass p-5 transition-transform duration-300 hover:-translate-y-1">
					<p class="font-mono text-sm text-sky-200">{e.timeline}</p>
					<h2 class="mt-1 text-3xl font-bold">{e.company}</h2>
					<p class="text-lg text-sky-100">{e.position}</p>
					{#if e.summary}<p class="mt-3">{e.summary}</p>{/if}
					{#if e.tags.length}
						<div class="mt-3 flex flex-wrap gap-2">
							{#each e.tags as t}<span class="rounded-full border border-sky-200/50 px-3 py-0.5 text-xs">{t}</span>{/each}
						</div>
					{/if}
				</article>
			</div>
		{/each}
	</div>
</div>
