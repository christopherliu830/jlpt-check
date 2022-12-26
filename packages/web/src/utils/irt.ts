// Zeta is a set of parameters per question that indicate the shape of the
// P(theta) curve under the 3 Parameter Model.
type Zeta = {
  a: number;
  b: number;
  c?: number;
};

function irf(zeta: Zeta, theta: number) {
  const { a, b } = zeta;
  const c = zeta.c ?? 0;
  return c + (1 - c) / (1 + Math.exp(-a * (theta - b)));
}

export function estimateAbility(responses: number[], zeta: Zeta[], iterations: number) {
  if (responses.every((r) => r === 1)) {
    return Number.POSITIVE_INFINITY;
  }

  if (responses.every((r) => r === 0)) {
    return Number.NEGATIVE_INFINITY;
  }

  let theta = 1;

  function estimate() {
    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < responses.length; i++) {
      const a = zeta[i].a;
      const p = irf(zeta[i], theta);
      const q = 1 - p;

      numerator += a * (responses[i] - p);
      denominator += a * a * p * q;
    }

    const delta = numerator / denominator;
    return delta;
  }

  for (let i = 0; i < iterations; i++) {
    const delta = estimate();
    theta += delta;
  }

  return theta;
}

estimateAbility(
  [1, 1, 1],
  [
    { b: -1, a: 1 },
    { b: 0, a: 1.2 },
    { b: 1, a: 0.8 },
  ],
  10
);
