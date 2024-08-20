<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		timeout: undefined;
	}>();

	export let duration: number;
	export let show: boolean = false;

	export function start() {
		if (interval !== undefined) return;
		interval = setInterval(() => {
			current -= 1;
			if (current === 0) {
				pause();
				dispatch('timeout');
			}
		}, 1000);
	}

	export function pause() {
		clearInterval(interval);
		interval = undefined;
	}

	export function reset() {
		pause();
		current = duration;
	}

	let interval: number | undefined = undefined;
	let current = duration;

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{#if show}
	<span>{current}</span>
{/if}
