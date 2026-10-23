<script lang="ts">
	import ListPage from '$lib/components/list-page.svelte';
	let { data } = $props();
</script>

<ListPage {data} />
