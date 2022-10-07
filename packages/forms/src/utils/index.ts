// Export the main utils here
export * from './date';
export * from './uuid';

// One-liners

/** Get Wrapped Number */
export const wrap = (m = 1, n = 0) => n >= 0 ? n % m : (n % m + m) % m

/** Generate number wrapper */
export const genWrap = (m = 1) => (n = 0) => n >= 0 ? n % m : (n % m + m) % m

export type ArrayItemGetter<U = any> = <T = U>(arr: T[], ...args: any) => T

/** Get random item */
export const getRandomItem: ArrayItemGetter = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 * Get approximate item from floating point number
 *
 * Intended use case is for supplying a pseudorandom number
 */
export const getItemFloat: ArrayItemGetter = (arr, i: number) => arr[Math.floor(i * arr.length)]

/** Array accession that supports loops */
export const getLoopItem: ArrayItemGetter = (arr, i: number) => arr[wrap(arr.length, i)]