<script lang="ts">
	let P = $state(37.5);
	let N = $state(180);
	let SF = $state(1.5);
	const W = $derived(P * 1000);
	const w = $derived((2 * Math.PI * N) / 60);
	const T = $derived(w > 0 ? W / w : 0);
	const Td = $derived(SF * T);
	const f = (x: number, d = 2) => x.toLocaleString('en', { maximumFractionDigits: d });
</script>

<section class="glass mt-4 p-5">
	<h2 class="text-2xl font-semibold">Torque calculator: flange coupling</h2>
	<div class="mt-3 flex flex-wrap gap-4">
		<label class="flex flex-col text-sm">Power P (kW)<input type="number" min="0" step="0.5" bind:value={P} class="glass mt-1 w-28 px-2 py-1" /></label>
		<label class="flex flex-col text-sm">Speed N (rpm)<input type="number" min="1" step="1" bind:value={N} class="glass mt-1 w-28 px-2 py-1" /></label>
		<label class="flex flex-col text-sm">Safety factor<input type="number" min="1" step="0.1" bind:value={SF} class="glass mt-1 w-28 px-2 py-1" /></label>
	</div>
	<pre class="mt-4 overflow-x-auto font-mono text-sm leading-7">Step 1: power in watts
P = {f(P, 3)} kW × 1000 = {f(W, 1)} W

Step 2: angular speed
ω = 2πN / 60 = 2π × {f(N, 1)} / 60 = {f(w, 3)} rad/s

Step 3: shaft torque
T = P / ω = {f(W, 1)} / {f(w, 3)} = {f(T, 1)} N·m

Step 4: design torque
Td = SF × T = {f(SF, 2)} × {f(T, 1)} = {f(Td, 1)} N·m</pre>
</section>
