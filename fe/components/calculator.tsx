import { Grid, Button, Checkbox, FormControlLabel } from "@mui/material";
import { ChangeEvent, ReactElement, useState } from "react";
import { calculatorFormValues } from "../services/types";
import NumberInput from "./numberInput";
import ResultBox from "./resultBox";

const Calculator = ({ increase }: { increase?: boolean }): ReactElement => {
  const [results, setResults] = useState<string | null>(null);
  const [inTheRound, setInTheRound] = useState(false);
  const [values, setValues] = useState<calculatorFormValues>({
    currentSt: 0,
    numberSt: 0,
  });
  const plusOne = inTheRound ? 0 : 1;
  console.log(values);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  const divideStitches = () => {
    const st = values.currentSt / (values.numberSt + plusOne);
    console.log(values.numberSt + plusOne);
    return Math.floor(st);
  };

  const hasRemainder = () => {
    return values.currentSt % (values.numberSt + plusOne);
  };

  const extraStiches = (extraSt: number) => {
    return hasRemainder() ? `K${extraSt} ` : "";
  };

  const centerStiches = () => {
    const segmentSize = divideStitches();
    const extraSt =
      values.currentSt - segmentSize * (values.numberSt + plusOne);
    const divideExtraSt = Math.ceil(extraSt / 2);

    const extraBeg = extraStiches(divideExtraSt);
    const extraEnd = extraSt - divideExtraSt;
    const repeat = increase
      ? `K${segmentSize} M1`
      : `K${segmentSize - 2} dec 1`;

    return `${extraBeg}[${repeat}] x ${values.numberSt} K${
      segmentSize + extraEnd
    }`;
  };

  const centerStichesInTheRound = () => {
    const segmentSize = divideStitches();
    const repeat = increase
      ? `K${segmentSize} M1`
      : `K${segmentSize - 2} dec 1`;

    return `[${repeat}] x ${values.numberSt}`;
  };

  const handleOnSubmit = () => {
    if (inTheRound) {
      setResults(centerStichesInTheRound());
    } else {
      setResults(centerStiches());
    }
  };

  return (
    <>
      <Grid
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        noValidate
        autoComplete="off"
      >
        <NumberInput
          name="currentSt"
          onChange={handleChange}
          id="current-st-input"
          label="Current Stitch Count"
        />
        <NumberInput
          name="numberSt"
          onChange={handleChange}
          id="number-st-input"
          label={`Number of Stitches to ${increase ? "Increase" : "Decrease"}`}
        />

        <FormControlLabel
          style={{ margin: 0 }}
          className="d-block"
          control={
            <Checkbox
              color="secondary"
              checked={inTheRound}
              onChange={(e) => setInTheRound(e.target.checked)}
            />
          }
          label="Knitted in the round"
        />
        <Button
          className="d-block"
          variant="contained"
          color="secondary"
          type="button"
          onClick={handleOnSubmit}
        >
          Submit
        </Button>
      </Grid>
      <ResultBox results={results} />
    </>
  );
};

export default Calculator;
