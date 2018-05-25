import React from "react";
import { withStateHandlers } from "recompose";
import { parseDecimal } from "../../utilities/numbers";
import { computeCompoundInterest } from "../../utilities/interest";

const InterestComputer = withStateHandlers(
  ({ result, P, r, n, t, PMT, ...props }) => {
    return {
      result: computeCompoundInterest(P, r, n, t, PMT),
      P,
      r,
      n,
      t,
      PMT
    };
  },
  {
    updateP: ({ _, r, n, t, PMT, result }, { updateTotal, id, ...props }) => ({
      target: { value }
    }) => {
      const result = computeCompoundInterest(value, r, n, t, PMT);
      updateTotal({ value: result, id, P: value, r, n, t, PMT });
      return {
        P: parseDecimal(value),
        result
      };
    },
    updater: ({ P, _, n, t, PMT, result }, { updateTotal, id, ...props }) => ({
      target: { value }
    }) => {
      const result = computeCompoundInterest(P, value, n, t, PMT);
      updateTotal({ value: result, id, P, r: value, n, t, PMT });
      return {
        r: value,
        result
      };
    },
    updaten: ({ P, r, _, t, PMT, result }, { updateTotal, id, ...props }) => ({
      target: { value }
    }) => {
      const result = computeCompoundInterest(P, r, value, t, PMT);
      updateTotal({ value: result, id, P, r, n: value, t, PMT });
      return {
        n: value,
        result
      };
    },
    updatet: ({ P, r, n, _, PMT, result }, { updateTotal, id, ...props }) => ({
      target: { value }
    }) => {
      const result = computeCompoundInterest(P, r, n, value, PMT);
      updateTotal({ value: result, id, P, r, n, t: value, PMT });
      return {
        t: value,
        result
      };
    },
    updatePMT: ({ P, r, n, t, _, result }, { updateTotal, id, ...props }) => ({
      target: { value }
    }) => {
      const result = computeCompoundInterest(P, r, n, t, value);
      updateTotal({ value: result, id, P, r, n, t, PMT: value });
      return {
        PMT: value,
        result
      };
    }
  }
);

export default InterestComputer;
