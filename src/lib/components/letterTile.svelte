<script lang="ts">
	export let letter: string;
	export let selected: boolean = false;
</script>

<button
	class="aspect-[2/3] w-[50px] select-none rounded-sm border-2 border-black text-center font-mono text-6xl"
	class:bg-yellow-400={selected}
	on:click
>
	{letter}
</button>
