<script lang="ts">
	import ModelViewer from '$lib/components/model-viewer.svelte';
	import type { ModelsConfig } from '$lib/types';
	let { data }: { data: ModelsConfig } = $props();
	let sel = $state(0);
	let box = $state<HTMLDivElement>();
	const current = $derived(data.model[sel]);
</script>

<div class="mx-auto w-full max-w-5xl px-4 pb-10">
	<h1 class="p-4 text-center text-4xl font-bold sm:text-6xl">{data.title}</h1>
	{#if data.intro}<p class="mx-auto mb-6 max-w-2xl text-center text-gray-500">{data.intro}</p>{/if}
	{#if current}
		<div class="flex flex-wrap gap-2 pb-3">
			{#each data.model as m, i}
				<button type="button" onclick={() => (sel = i)} class="glass px-4 py-1.5 text-sm {sel === i ? 'ring-2 ring-sky-300' : 'opacity-70'}">{m.name}</button>
			{/each}
		</div>
		<div bind:this={box} class="glass relative h-[60vh] overflow-hidden">
			{#key current.file}<ModelViewer modelUrl={'models/' + current.file} />{/key}
			<button type="button" onclick={() => box?.requestFullscreen?.()} class="glass absolute top-3 right-3 px-3 py-1 text-sm">Fullscreen</button>
		</div>
		{#if current.description}<p class="mt-3 text-gray-500">{current.description}</p>{/if}
	{:else}
		<div class="glass p-8 text-center">
			<p class="text-xl">Models coming soon.</p>
			<p class="mt-2 text-gray-500">Add .glb files to static/models/ and list them in content/models.toml.</p>
		</div>
	{/if}
</div>
