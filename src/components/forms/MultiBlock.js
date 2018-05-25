import React from "react";
import * as rc from "recompose";
import * as R from "ramda";
import InterestBlock from "../blocks/InterestBlock";
import InterestComputer from "../blocks/InterestComputer";
import {
  Segment,
  Checkbox,
  Button,
  Header,
  Container,
  Icon
} from "semantic-ui-react";

import { parseDecimal, numberWithCommas } from "../../utilities/numbers";
import { computeCompoundInterest } from "../../utilities/interest";

const total = blocks =>
  parseDecimal(
    R.pipe(
      R.values,
      R.filter(R.propEq("debt", false)),
      R.pluck("result"),
      R.sum
    )(blocks).toFixed(2)
  ) +
  parseDecimal(
    R.pipe(
      R.values,
      R.filter(R.propEq("debt", true)),
      R.pluck("result"),
      R.map(R.negate),
      R.sum
    )(blocks).toFixed(2)
  );

const P = 5000;
const r = 5;
const n = 12;
const t = 10;
const PMT = 100;
const defaults = {
  result: computeCompoundInterest(P, r, n, t, PMT),
  P,
  r,
  n,
  t,
  PMT
};

const withTotal = rc.withStateHandlers(
  ({ total = 0, debt = false, blocks = {}, index = 0 }) => ({
    total,
    debt,
    blocks,
    index
  }),
  {
    toggleDebt: (state, props) => _ => ({ debt: !state.debt }),
    clearBlocks: () => _ => ({ blocks: {}, total: 0 }),
    addBlock: (state, props) => (
      starting = {
        debt: state.debt,
        result: defaults.result,
        P: defaults.P
      }
    ) => {
      const id = state.index;
      const blocks = {
        ...state.blocks,
        [id]: {
          ...defaults,
          debt: starting.debt,
          id,
          result: starting.result,
          created: new Date(),
          P: starting.P
        }
      };
      return {
        blocks,
        index: state.index + 1,
        total: total(blocks)
      };
    },
    removeBlock: (state, props) => uuid => {
      const blocks = R.omit([uuid], state.blocks);
      return {
        blocks,
        total: total(blocks)
      };
    },
    updateTotal: (state, props) => ({ value, id, ...rest }) => {
      const blockProps = R.pipe(
        R.pick(["P", "r", "n", "t", "PMT"]),
        R.map(parseDecimal)
      )(rest);
      const blocks = {
        ...state.blocks,
        [id]: {
          ...state.blocks[id],
          result: value,
          ...blockProps
        }
      };
      return {
        blocks,
        total: total(blocks)
      };
    },
    updateBlocks: (state, props) => newBlocks => {
      return {
        ...state,
        blocks: newBlocks,
        total: total(newBlocks)
      };
    }
  }
);

const MultiBlock = props => {
  return (
    <Container>
      <Segment>
        <Header>Resulting Equity: $ {numberWithCommas(props.total)}</Header>
        <Button
          disabled={R.keys(props.blocks).length === 0}
          color="red"
          onClick={props.clearBlocks}
        >
          Clear
        </Button>
        <Button
          style={{ minWidth: "200px" }}
          color={props.debt ? "orange" : "teal"}
          onClick={() => props.addBlock()}
        >
          Add {props.debt ? "Debt" : "Investment"}
        </Button>
        <Checkbox
          slider
          color={props.debt ? "orange" : "teal"}
          checked={props.debt}
          onChange={props.toggleDebt}
        />
      </Segment>
      {R.sortBy(R.prop("created"))(R.values(props.blocks)).map(block => {
        const Block = rc.compose(
          rc.withProps({
            ...block
          }),
          InterestComputer
        )(InterestBlock);
        return (
          <Block
            key={block.id}
            remove={props.removeBlock}
            link={starting => props.addBlock(starting)}
            updateTotal={props.updateTotal}
            updateBlock={(id, newBlock) => {
              const _newBlock = R.merge(props.blocks[id], newBlock);
              const newBlocks = R.assoc(id, _newBlock, props.blocks);
              props.updateBlocks(newBlocks);
            }}
          />
        );
      })}
    </Container>
  );
};

export default withTotal(MultiBlock);
