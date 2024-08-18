import { Entries } from 'type-fest';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface ObjectConstructor {
		entries<T extends object>(o: T): Entries<T>;
	}
}

export {};
