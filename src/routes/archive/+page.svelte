<script lang="ts">
	import { base } from '$app/paths';
	import ListPage from '$lib/components/list-page.svelte';
	import Calculator from '$lib/components/calculator.svelte';
	let { data } = $props();
	const documentUrl = `${base}/documents/flange-coupling-calculations.pdf`;
</script>

<main class="w-full pb-8">
	<section class="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-8 lg:pt-14">
		<div
			class="relative overflow-hidden rounded-[2rem] border border-cyan-100/15 bg-gradient-to-br from-[#102b50] via-[#0b1c35] to-[#101a38] p-6 shadow-2xl shadow-blue-950/30 sm:p-9"
		>
			<div
				class="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
				aria-hidden="true"
			></div>
			<div class="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
				<div class="max-w-2xl">
					<p class="text-sm font-semibold tracking-[0.18em] text-cyan-200 uppercase">
						Design notebook · Mechanical engineering
					</p>
					<h1 class="mt-3 text-4xl font-bold text-white sm:text-5xl">
						Flange coupling calculations
					</h1>
					<p class="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
						The calculation document for the rigid flange coupling design. Read it here or open a
						copy in a separate tab.
					</p>
					<div class="mt-5 flex flex-wrap gap-2">
						<span
							class="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200"
							>37.5 kW</span
						>
						<span
							class="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200"
							>180 rpm</span
						>
						<span
							class="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-200"
							>Safety factor 1.5</span
						>
					</div>
				</div>
				<div class="flex shrink-0 flex-wrap gap-2">
					<a
						class="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
						href={documentUrl}
						target="_blank"
						rel="noopener"
					>
						Open full document <span aria-hidden="true">↗</span>
					</a>
					<a
						class="rounded-full bg-cyan-200 px-5 py-2.5 text-sm font-semibold text-[#07182b] transition hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
						href={documentUrl}
						download="Flange-Coupling-Calculations.pdf"
					>
						Download PDF ↓
					</a>
				</div>
			</div>
			<div class="relative mt-7 overflow-hidden rounded-2xl border border-white/15 bg-[#081426]">
				<iframe
					src="{documentUrl}#view=FitH"
					title="Flange coupling calculations PDF"
					class="h-[65vh] min-h-[28rem] w-full sm:h-[72vh]"
				></iframe>
			</div>
			<p class="relative mt-3 text-xs leading-5 text-slate-400">
				If the preview is unavailable in your browser, use “Open full document” or download the PDF.
			</p>
		</div>
	</section>

	<ListPage {data} />
	<div class="mx-auto w-full max-w-4xl px-4 pb-10"><Calculator /></div>
</main>
