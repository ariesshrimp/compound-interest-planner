import React from "react";
import {
  Button,
  Input,
  Label,
  Header,
  Container,
  Segment
} from "semantic-ui-react";
import { parseDecimal, numberWithCommas } from "../../utilities/numbers";

const InterestBlock = props => {
  return (
    <Segment>
      <Container fluid>
        <Label>
          <Header color={props.debt ? "orange" : "teal"} size="medium">
            $ {numberWithCommas(parseDecimal(props.result))}
          </Header>
        </Label>
        <Button
          size="small"
          basic
          color="red"
          onClick={() => props.remove(props.id)}
        >
          X
        </Button>
        <Button
          size="small"
          basic
          color="teal"
          onClick={() =>
            props.link({
              result: props.result,
              debt: props.debt,
              P: props.result
            })
          }
        >
          +
        </Button>
        <Input
          labelPosition="right"
          value={parseDecimal(props.P)}
          onChange={event => {
            props.updateP(event);
          }}
          type="number"
          placeholder="starting value"
          label={{ basic: true, content: "Principle $" }}
          fluid
          attached="bottom"
        />
        <Input
          labelPosition="right"
          type="number"
          value={props.r}
          onChange={event => {
            props.updater(event);
          }}
          fluid
          attached="bottom"
          label={{ basic: true, content: "% Annual Interest Rate" }}
        />
        <Input
          labelPosition="right"
          type="number"
          value={props.n}
          onChange={event => {
            props.updaten(event);
          }}
          fluid
          attached="bottom"
          label={{ basic: true, content: "Times Compounded per Year" }}
        />
        <Input
          labelPosition="right"
          type="number"
          value={props.t}
          onChange={event => {
            props.updatet(event);
          }}
          fluid
          attached="top"
          label={{ basic: true, content: "Years to Calculate" }}
        />
        <Input
          labelPosition="right"
          type="number"
          value={props.PMT}
          onChange={event => {
            props.updatePMT(event);
          }}
          fluid
          attached="top"
          label={{ basic: true, content: "Periodic Contribution" }}
        />
      </Container>
    </Segment>
  );
};

export default InterestBlock;
