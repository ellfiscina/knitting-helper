import { Grid, Button, Checkbox, FormControlLabel } from "@mui/material";
import { debug } from "console";
import { ChangeEvent, ReactElement, useState } from "react";
import { calculatorFormValues } from "../services/types";
import NumberInput from "./numberInput";
import ResultBox from "./resultBox";

const Calculator = (): ReactElement => {
  const [results, setResults] = useState<string | null>(null);
  const [inTheRound, setInTheRound] = useState(false);
  const [values, setValues] = useState<calculatorFormValues>({
    currentSt: 0,
    finalSt: 0,
  });
  const plusOne = inTheRound ? 0 : 1;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  const divideStitches = (numberSt: number) => {
    const st = values.currentSt / (numberSt + plusOne);
    return Math.floor(st);
  };

  const hasRemainder = () => {
    return values.currentSt % (values.finalSt + plusOne);
  };

  let extraStiches = (extraSt: number) => {
    return hasRemainder() ? `K${extraSt} ` : "";
  };

  const centerStiches = (numberSt: number) => {
    let extraBeg = "";
    let extraEnd = "";
    const segmentSize = divideStitches(numberSt);
    const repeat =
      values.currentSt < values.finalSt
        ? `K${segmentSize} M1`
        : `K${segmentSize - 2} dec 1`;

    if (!inTheRound) {
      const extraSt = values.currentSt - segmentSize * (numberSt + plusOne);
      const divideExtraSt = Math.ceil(extraSt / 2);

      extraBeg = extraStiches(divideExtraSt);
      extraEnd = ` K${segmentSize + extraSt - divideExtraSt}`;
    }

    return `${extraBeg}[${repeat}] x ${numberSt}${extraEnd}`;
  };

  const handleOnSubmit = () => {
    const numberSt = Math.abs(values.currentSt - values.finalSt);
    setResults(centerStiches(numberSt));
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
          name="finalSt"
          onChange={handleChange}
          id="number-st-input"
          label="Desired Number of Stitches"
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
