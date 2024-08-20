<script lang="ts">
	import { random_consonant, random_vowel, type Letter } from '$lib/letter';

	import Timer from '$lib/components/timer.svelte';
	import LetterTile from '$lib/components/letterTile.svelte';
	import Button from '$lib/components/button.svelte';

	let timer: Timer;
	let timeout_audio: HTMLAudioElement;

	$: phase =
		current_letter < letters.length
			? ('drawing' as const)
			: timer_is_finished
				? ('stop' as const)
				: !timer_is_running
					? ('wait' as const)
					: ('running' as const);

	let timer_is_running = false;
	let timer_is_finished = false;
	let letters: (Letter | '')[] = new Array(9).fill('');
	let current_letter = 0;

	function push_letter(l: Letter) {
		letters[current_letter] = l;
		current_letter += 1;
	}

	function onTimeout() {
		timeout_audio.play();
		timer_is_finished = true;
	}

	function reset() {
		timeout_audio.pause();
		timeout_audio.currentTime = 0;

		timer.reset();

		timer_is_finished = false;
		timer_is_running = false;
		letters = letters.fill('');
		current_letter = 0;
	}
</script>

<div class="flex h-dvh items-center justify-center">
	<main class="flex flex-col items-center">
		<div class="flex flex-row justify-center gap-2">
			{#each letters as letter}
				<LetterTile {letter} />
			{/each}
		</div>
		<div class="mt-5 w-fit text-4xl">
			<Timer
				duration={40}
				bind:this={timer}
				on:change={(e) => (timer_is_running = e.detail)}
				on:timeout={onTimeout}
				show
			/>
		</div>
		<div class="mt-5 flex w-full flex-col gap-2 text-2xl">
			{#if phase === 'drawing'}
				<div class="strech flex w-full flex-row gap-2">
					<Button theme="yellow" class="w-full" on:click={() => push_letter(random_vowel())}
						>Voyelle</Button
					>
					<Button theme="purple" class="w-full" on:click={() => push_letter(random_consonant())}
						>Consonne</Button
					>
				</div>
			{:else}
				<Button theme="blue" disabled={phase !== 'wait'} on:click={() => timer.start()}
					>Démarrer</Button
				>
			{/if}

			<Button theme="red" outlined on:click={reset}>Reset</Button>
		</div>
	</main>
</div>

<audio
	src="https://freesound.org/data/previews/536/536420_4921277-lq.mp3"
	bind:this={timeout_audio}
/>
