<script lang="ts" context="module">
	export type ButtonTheme = 'red' | 'green' | 'blue' | 'yellow' | 'purple';
</script>

<script lang="ts">
	let clazz: string | undefined = undefined;
	export { clazz as class };

	export let theme: ButtonTheme = 'blue';
	export let outlined: boolean = false;

	// NOTE: code is ugly but tailwind will tree-shaking classes that didn't appear in source code.
	// TODO: replace this by some tailwind custom style or component.

	function solid_theme(theme: ButtonTheme) {
		return theme === 'red'
			? `text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700`
			: theme === 'green'
				? `text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700`
				: theme === 'blue'
					? `text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700`
					: theme === 'yellow'
						? `text-white bg-yellow-400 hover:bg-yellow-500 `
						: theme === 'purple'
							? `text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700`
							: '';
	}

	function outline_theme(theme: ButtonTheme) {
		return theme === 'red'
			? `hover:text-white text-red-700 border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500`
			: theme === 'green'
				? `hover:text-white text-green-700 border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500`
				: theme === 'blue'
					? `hover:text-white text-blue-700 border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500`
					: theme === 'yellow'
						? `hover:text-white text-yellow-400 border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400`
						: theme === 'purple'
							? `hover:text-white text-purple-700 border border-purple-700 hover:bg-purple-800 dark:border-purple-500 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-500`
							: '';
	}

	$: theme_class = outlined ? outline_theme(theme) : solid_theme(theme);
</script>

<button type="button" class="{clazz ?? ''} {theme_class}" on:click>
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
</style>
