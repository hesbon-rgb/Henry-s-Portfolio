<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { getIcon } from '$lib/generated/icons';
	import type { SiteConfig } from '$lib/types';

	let { data }: { data: SiteConfig } = $props();
	type Item = { enabled: boolean; name: string; icon?: string };
	const nav = data.navigation as Record<string, Item>;
	const keys = [
		'profile',
		'projects',
		'skills',
		'models',
		'experience',
		'design',
		'certifications',
		'archive',
		'resume'
	];
	let open = $state(false);

	const label = (key: string) =>
		key === 'profile' ? 'Home' : key === 'resume' ? 'CV' : nav[key]?.name;
	const href = (key: string) => (key === 'profile' ? `${base}/` : `${base}/${key}`);
	const here = (key: string) => {
		const path = page.url.pathname.replace(/\/$/, '');
		return key === 'profile' ? path === '' || path === base : path.endsWith('/' + key);
	};
	const live = keys.filter((key) => nav[key]?.enabled);
</script>

{#snippet link(key: string, compact = false)}
	{@const item = nav[key]}
	{#if item?.enabled}
		{@const Icon = item.icon ? getIcon(item.icon) : null}
		<a
			href={href(key)}
			onclick={() => (open = false)}
			aria-current={here(key) ? 'page' : undefined}
			class="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition {here(
				key
			)
				? 'bg-cyan-200/15 text-cyan-100 ring-1 ring-cyan-100/20'
				: 'text-slate-200 hover:bg-white/10 hover:text-white'} {compact
				? 'min-h-14 flex-col gap-1 px-2 text-xs'
				: ''}"
		>
			{#if Icon}<Icon />{/if}
			<span>{label(key)}</span>
		</a>
	{/if}
{/snippet}

<header class="fixed top-3 right-3 left-3 z-30 mx-auto max-w-7xl lg:top-4 lg:right-4 lg:left-4">
	<nav class="glass hidden items-center justify-between gap-2 px-3 py-2 lg:flex" aria-label="Main">
		<div class="flex items-center gap-1.5">
			{#each live as key}
				{@render link(key)}
			{/each}
		</div>
		<span class="hidden pr-2 text-xs tracking-[0.15em] text-slate-400 uppercase xl:inline">
			Engineering portfolio
		</span>
	</nav>

	<div class="lg:hidden">
		<button
			type="button"
			aria-expanded={open}
			aria-controls="mobile-navigation"
			onclick={() => (open = !open)}
			class="glass ml-auto flex items-center gap-2 px-4 py-2.5 font-medium text-white"
		>
			{#if nav.profile?.icon}
				{@const HomeIcon = getIcon(nav.profile.icon)}
				<HomeIcon />
			{/if}
			{open ? 'Close navigation' : 'Explore'}
			<span aria-hidden="true">{open ? '×' : '☰'}</span>
		</button>
		{#if open}
			<nav
				id="mobile-navigation"
				class="glass mt-2 grid grid-cols-3 gap-1.5 p-2"
				aria-label="Mobile"
			>
				{#each live as key}
					{@render link(key, true)}
				{/each}
			</nav>
		{/if}
	</div>
</header>
