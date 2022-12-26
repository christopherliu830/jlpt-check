export function shuffle<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Get a value between two values
export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
}

export function lerp(value1: number, value2: number, amount: number) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

export function sum(values: number[]) {
  return values.reduce((acc, x) => acc + x, 0);
}
