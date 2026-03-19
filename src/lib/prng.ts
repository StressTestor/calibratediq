// mulberry32 seeded PRNG
// Returns a function that produces numbers in [0, 1)
export function createPRNG(seed: number) {
  let state = seed | 0;
  return {
    // Returns float in [0, 1)
    next(): number {
      state |= 0;
      state = (state + 0x6d2b79f5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    // Returns integer in [min, max)
    nextInt(min: number, max: number): number {
      return min + Math.floor(this.next() * (max - min));
    },
    // Shuffle array in place (Fisher-Yates)
    shuffle<T>(arr: T[]): T[] {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = this.nextInt(0, i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    // Pick n random items from array
    pick<T>(arr: T[], n: number): T[] {
      const copy = [...arr];
      this.shuffle(copy);
      return copy.slice(0, n);
    }
  };
}

// Generate a seed from current time + random
export function generateSeed(): number {
  return (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
}

// Encode seed as base36 string for compact URLs
export function encodeSeed(seed: number): string {
  return seed.toString(36);
}

// Decode seed from base36 string
export function decodeSeed(str: string): number {
  return parseInt(str, 36);
}
