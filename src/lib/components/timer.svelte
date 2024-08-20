<script lang="ts">
	import { onDestroy, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		timeout: undefined;
		change: boolean;
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
		dispatch('change', true);
	}

	export function pause() {
		clearInterval(interval);
		interval = undefined;
		dispatch('change', false);
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
	<span role="timer">{current}</span>
{/if}
