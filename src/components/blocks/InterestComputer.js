import React from "react";
import { withStateHandlers } from "recompose";
import { parseDecimal } from "../../utilities/numbers";
import {
  computeCompoundInterest,
  computeSimpleInterest
} from "../../utilities/interest";

const InterestComputer = withStateHandlers(
  ({ result, P, r, n, t, PMT, ...props }) => {
    return {
      result:
        props.type === "simple"
          ? computeSimpleInterest(props.debt)(P, r, n, 0, PMT)
          : computeCompoundInterest(P, r, n, t, PMT),
      P,
      r,
      n,
      t,
      PMT,
      type: props.type || "compound",
      computer: type =>
        type === "simple"
          ? computeSimpleInterest(props.debt)
          : computeCompoundInterest
    };
  },
  {
    toggleType: (
      { type, P, r, n, t, PMT, computer },
      { updateTotal, updateBlock, id }
    ) => _ => {
      const newType = type === "simple" ? "compound" : "simple";
      const result = computer(newType)(P, r, n, t, PMT);
      updateBlock(id, { type: newType });
      updateTotal({ value: result, id, P, r, n, t, PMT });
      return {
        type: newType,
        result
      };
    },
    updateP: (
      { _, r, n, t, PMT, result, computer, type },
      { updateTotal, id, ...props }
    ) => ({ target: { value } }) => {
      const result = computer(type)(value, r, n, t, PMT);
      updateTotal({ value: result, id, P: value, r, n, t, PMT });
      return {
        P: parseDecimal(value),
        result
      };
    },
    updater: (
      { P, _, n, t, PMT, result, computer, type },
      { updateTotal, id, ...props }
    ) => ({ target: { value } }) => {
      const result = computer(type)(P, value, n, t, PMT);
      updateTotal({ value: result, id, P, r: value, n, t, PMT });
      return {
        r: value,
        result
      };
    },
    updaten: (
      { P, r, _, t, PMT, result, computer, type },
      { updateTotal, id, ...props }
    ) => ({ target: { value } }) => {
      const result = computer(type)(P, r, value, t, PMT);
      updateTotal({ value: result, id, P, r, n: value, t, PMT });
      return {
        n: value,
        result
      };
    },
    updatet: (
      { P, r, n, _, PMT, result, computer, type },
      { updateTotal, id, ...props }
    ) => ({ target: { value } }) => {
      const result = computer(type)(P, r, n, value, PMT);
      updateTotal({ value: result, id, P, r, n, t: value, PMT });
      return {
        t: value,
        result
      };
    },
    updatePMT: (
      { P, r, n, t, _, result, computer, type },
      { updateTotal, id, ...props }
    ) => ({ target: { value } }) => {
      const result = computer(type)(P, r, n, t, value);
      updateTotal({ value: result, id, P, r, n, t, PMT: value });
      return {
        PMT: value,
        result
      };
    }
  }
);

export default InterestComputer;
