import { getWeightedRandomItem } from './random';

export type Consonant =
	| 'B'
	| 'C'
	| 'D'
	| 'F'
	| 'G'
	| 'H'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'V'
	| 'W'
	| 'X'
	| 'Z';
export type Vowel = 'A' | 'E' | 'I' | 'O' | 'U' | 'Y';
export type Letter = Consonant | Vowel;

export type ConsonantMap = Record<Consonant, number>;
export type VowelMap = Record<Vowel, number>;

export class LetterBag {
	constructor(
		private readonly consonants: ConsonantMap,
		private readonly vowel: VowelMap
	) {}

	/**
	 * Creates a new bag of letter with a repartition for the french language.
	 * @returns A letter bag with a letter repartition for the french language.
	 */
	static new_french() {
		return new LetterBag(
			{
				B: 4,
				C: 4,
				D: 4,
				F: 4,
				G: 4,
				H: 4,
				J: 1,
				K: 1,
				L: 6,
				M: 4,
				N: 7,
				P: 3,
				Q: 1,
				R: 7,
				S: 7,
				T: 6,
				V: 2,
				W: 1,
				X: 1,
				Z: 1
			},
			{
				A: 8,
				E: 13,
				I: 6,
				O: 6,
				U: 6,
				Y: 1
			}
		);
	}

	/**
	 * Pick and remove one consonant from the bag.
	 * @returns A random consonant
	 */
	pick_consonant() {
		const item = getWeightedRandomItem(Object.entries(this.consonants), (x) => x[1])[0];
		this.consonants[item] -= 1;

		return item;
	}

	/**
	 * Pick and remove one vowel from the bag.
	 * @returns A random vowel
	 */
	pick_vowel() {
		const item = getWeightedRandomItem(Object.entries(this.vowel), (x) => x[1])[0];
		this.vowel[item] -= 1;

		return item;
	}
}
