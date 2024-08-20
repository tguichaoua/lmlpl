<script lang="ts" context="module">
	export type ButtonTheme = 'red' | 'green' | 'blue' | 'yellow' | 'purple';
</script>

<script lang="ts">
	let clazz: string | undefined = undefined;
	export { clazz as class };

	export let theme: ButtonTheme = 'blue';
	export let outlined: boolean = false;
	export let disabled: boolean = false;

	// NOTE: code is ugly but tailwind will tree-shaking classes that didn't appear in source code.
	// TODO: replace this by some tailwind custom style or component.

	function solid_theme(theme: ButtonTheme) {
		return theme === 'red'
			? 'text-white bg-red-600 hover:bg-red-700'
			: theme === 'green'
				? 'text-white bg-green-600 hover:bg-green-700'
				: theme === 'blue'
					? 'text-white bg-blue-600 hover:bg-blue-700'
					: theme === 'yellow'
						? 'text-white bg-yellow-400 hover:bg-yellow-500 '
						: theme === 'purple'
							? 'text-white bg-purple-600 hover:bg-purple-700'
							: '';
	}

	function outline_theme(theme: ButtonTheme) {
		return theme === 'red'
			? 'hover:text-white border border-red-700  border-red-500 text-red-500 hover:bg-red-500'
			: theme === 'green'
				? 'hover:text-white  border border-green-700  border-green-500 text-green-500 hover:bg-green-500'
				: theme === 'blue'
					? 'hover:text-white  border border-blue-700  border-blue-500 text-blue-500 hover:bg-blue-500'
					: theme === 'yellow'
						? 'hover:text-white border hover:bg-yellow-500 border-yellow-300 text-yellow-300 hover:bg-yellow-400'
						: theme === 'purple'
							? 'hover:text-white border border-purple-700 border-purple-500 text-purple-500 hover:bg-purple-500'
							: '';
	}

	$: theme_class = disabled
		? 'border border-gray-200 bg-gray-100 text-blue-700'
		: outlined
			? outline_theme(theme)
			: solid_theme(theme);
</script>

<button type="button" class="{clazz ?? ''} {theme_class}" {disabled} on:click>
	<slot />
</button>

<style>
	button {
		cursor: pointer;
		border-radius: 6px;
		padding: 8px 12px;
		font-weight: bold;
		font-weight: 500;
		text-align: center;
	}

	button:disabled {
		cursor: not-allowed;
	}
</style>
