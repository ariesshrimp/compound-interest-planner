export const computeCompoundInterest = (P, _r, n, t, PMT) => {
  const r = _r / 100;
  const computeA = () => P * (1 + r / n) ** (n * t);
  const computeB = () => PMT * (((1 + r / n) ** (n * t) - 1) / (r / n));
  const result = computeA() + computeB();
  return result;
};

export const computeSimpleInterest = debt => (P, _r, n, _, PMT) => {
  const r = _r / 100;
  const result = PMT * 12 * ((1 + r - (1 / (1 + r)) ** (n - 1)) / r);
  return debt ? P - result : result;
};
