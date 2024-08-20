<script lang="ts">
	import { LetterBag, type Letter } from '$lib/letter';

	import Timer from '$lib/components/timer.svelte';
	import LetterTile from '$lib/components/letterTile.svelte';
	import Button from '$lib/components/button.svelte';

	import Icon from '@iconify/svelte';

	const LETTER_COUNT = 9;
	const TIMER_DURATION = 45;

	let timer: Timer;
	let audio: HTMLAudioElement;

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

	let letter_bag = LetterBag.new_french();
	let letters: (Letter | '')[] = new Array(LETTER_COUNT).fill('');
	let current_letter = 0;

	let selected_letter_indices: number[] = [];

	function generate_selected_text(selected_letter_indices: number[]) {
		let text = selected_letter_indices.reduce((acc, selected_index) => {
			const l = letters[selected_index];
			return (acc += l);
		}, '');

		if (text.length < LETTER_COUNT) {
			text = text + ' '.repeat(LETTER_COUNT - text.length);
		}

		return text;
	}

	$: selected_text = generate_selected_text(selected_letter_indices);

	function push_letter(l: Letter) {
		letters[current_letter] = l;
		current_letter += 1;

		audio.src = `/letters/${l}.mp3`;
		audio.play();
	}

	function on_timeout() {
		audio.src = `/timeout.mp3`;
		audio.play();
		timer_is_finished = true;
	}

	function on_letter_tile_click(index: number) {
		if (phase === 'drawing' || phase === 'running') return;

		const letterIndex = selected_letter_indices.indexOf(index);

		if (letterIndex === -1) {
			selected_letter_indices.push(index);
		} else {
			selected_letter_indices.splice(letterIndex, 1);
		}
		selected_letter_indices = selected_letter_indices;
	}

	function start() {
		timer.start();
		selected_letter_indices = [];
	}

	function reset() {
		audio.pause();
		audio.currentTime = 0;

		timer.reset();

		timer_is_finished = false;
		timer_is_running = false;

		letter_bag = LetterBag.new_french();
		letters = letters.fill('');
		current_letter = 0;
		selected_letter_indices = [];
	}
</script>

<div class="flex h-dvh items-center justify-center">
	<main class="flex flex-col items-center gap-3">
		<div class="flex flex-row items-center justify-center">
			<div class="select-none border border-black px-2 font-mono text-2xl font-bold">
				<pre>{selected_text}</pre>
			</div>
			<div class="relative left-4 w-0">
				<div class="flex w-fit flex-row gap-1">
					<button
						class="aspect-square w-7"
						on:click={() => {
							selected_letter_indices.splice(-1, 1);
							selected_letter_indices = selected_letter_indices;
						}}><Icon class="m-auto" icon="weui:back-filled" /></button
					>
					<button class="aspect-square w-7" on:click={() => (selected_letter_indices = [])}
						><Icon class="m-auto" icon="material-symbols:close" /></button
					>
				</div>
			</div>
		</div>
		<div class="flex flex-row justify-center gap-2">
			{#each letters as letter, i}
				<LetterTile
					{letter}
					selected={selected_letter_indices.includes(i)}
					on:click={() => on_letter_tile_click(i)}
				/>
			{/each}
		</div>
		<div class="w-fit text-4xl">
			<Timer
				duration={TIMER_DURATION}
				bind:this={timer}
				on:change={(e) => (timer_is_running = e.detail)}
				on:timeout={on_timeout}
				show
			/>
		</div>
		<div class="flex w-full flex-col gap-2 text-2xl">
			{#if phase === 'drawing'}
				<div class="strech flex w-full flex-row gap-2">
					<Button
						theme="yellow"
						class="w-full"
						on:click={() => push_letter(letter_bag.pick_vowel())}>Voyelle</Button
					>
					<Button
						theme="purple"
						class="w-full"
						on:click={() => push_letter(letter_bag.pick_consonant())}>Consonne</Button
					>
				</div>
			{:else}
				<Button theme="blue" disabled={phase !== 'wait'} on:click={start}>Démarrer</Button>
			{/if}

			<Button theme="red" outlined on:click={reset}>Reset</Button>
		</div>
	</main>
</div>

<audio bind:this={audio} />
