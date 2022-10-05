import { Grid, Button } from "@mui/material";
import { ChangeEvent, ReactElement, useState } from "react";
import { gaugeFormValues } from "../services/types";
import NumberInput from "./numberInput";
import ResultBox from "./resultBox";

const Gauge = (): ReactElement => {
  const [results, setResults] = useState<string | null>(null);
  const [values, setValues] = useState<gaugeFormValues>({
    gaugeSt: 0,
    gaugeWidth: 0,
    finalWidth: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const calculateGauge = (
    myGaugeSt: number,
    myGaugeWidth: number,
    finalWidth: number
  ) => {
    return (myGaugeSt * finalWidth) / myGaugeWidth;
  };

  const handleOnSubmit = () => {
    const st = calculateGauge(
      values.gaugeSt,
      values.gaugeWidth,
      values.finalWidth
    );
    setResults(`Cast on ${st} stiches`);
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
          name="gaugeSt"
          onChange={handleChange}
          id="gauge-st-input"
          label="Gauge Stitch Count"
        />
        <NumberInput
          name="gaugeWidth"
          onChange={handleChange}
          id="gauge-width-input"
          label="Gauge width"
        />
        <NumberInput
          name="finalWidth"
          onChange={handleChange}
          id="final-width-input"
          label="Final width"
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

export default Gauge;
