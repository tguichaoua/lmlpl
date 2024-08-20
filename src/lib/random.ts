/**
 * Returns a random item from `items` using a weighted algorithm.
 * @param items The list of item to choose from.
 * @param getWeight A callback that returns the weight associated to an item.
 * @returns The randomly selected item.
 */
export function getWeightedRandomItem<T>(items: readonly T[], getWeight: (item: T) => number): T {
	const weights = items.reduce((acc, item, i) => {
		const w = getWeight(item);
		acc.push(w + (acc[i - 1] ?? 0));
		return acc;
	}, [] as number[]);
	const random = Math.random() * (weights.at(-1) ?? 0);
	return items[weights.findIndex((weight) => weight > random)];
}
