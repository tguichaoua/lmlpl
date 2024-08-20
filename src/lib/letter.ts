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

/**
 * A map of consonants with their associated weight of being chosen.
 */
export const CONSONANTS: Readonly<ConsonantMap> = {
	B: 1,
	C: 1,
	D: 1,
	F: 1,
	G: 1,
	H: 1,
	J: 1,
	K: 1,
	L: 1,
	M: 1,
	N: 1,
	P: 1,
	Q: 1,
	R: 1,
	S: 1,
	T: 1,
	V: 1,
	W: 1,
	X: 1,
	Z: 1
};

/**
 * A map of vowel with their associated weight of being chosen.
 */
export const VOWELS: Readonly<VowelMap> = {
	A: 1,
	E: 1,
	I: 1,
	O: 1,
	U: 1,
	Y: 1
};

export function random_consonant(): Consonant {
	return getWeightedRandomItem(Object.entries(CONSONANTS), (x) => x[1])[0];
}

export function random_vowel(): Vowel {
	return getWeightedRandomItem(Object.entries(VOWELS), (x) => x[1])[0];
}
