import { useFormik } from "formik";
import {
  Grid,
  Button,
  capitalize,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";

const RadioInput = ({ option }: { option: string }): ReactElement => {
  return (
    <FormControlLabel
      value={option.toLowerCase()}
      control={<Radio />}
      label={option}
    />
  );
};

const NumberInput = ({
  id,
  label,
  name,
  onChange,
  error,
}: {
  id: string;
  label: string;
  name: string;
  onChange: (e: ChangeEvent) => void;
  error?: boolean;
}): ReactElement => {
  return (
    <TextField
      id={id}
      label={label}
      color="secondary"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      name={name}
      onChange={onChange}
      error={error}
      style={{ width: "310px" }}
    />
  );
};

interface initialValues {
  gaugeSt: number;
  gaugeWidth: number;
  finalWidth: number;
  currentSt: number;
  numberSt: number;
}

const Calculator = (): ReactElement => {
  const [option, setOption] = useState("increase");
  const [results, setResults] = useState<string | null>(null);
  const [inTheRound, setInTheRound] = useState(false);
  const plusOne = inTheRound ? 0 : 1;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOption((event.target as HTMLInputElement).value);
  };

  const calculateGauge = (
    myGaugeSt: number,
    myGaugeWidth: number,
    finalWidth: number
  ) => {
    return (myGaugeSt * finalWidth) / myGaugeWidth;
  };

  const divideStitches = (values: initialValues) => {
    return values.currentSt / (values.numberSt + plusOne);
  };

  const hasRemainder = (values: initialValues) => {
    return values.currentSt % (values.numberSt + plusOne);
  };

  const extraStiches = (values: initialValues, extraSt: number) => {
    return hasRemainder(values) ? `K${extraSt}, ` : "";
  };

  const centerStiches = (values: initialValues) => {
    const segmentSize = Math.floor(divideStitches(values));
    const extraSt =
      values.currentSt - segmentSize * (values.numberSt + plusOne);
    const divideExtraSt = Math.ceil(extraSt / 2);

    if (option === "increase") {
      return `${extraStiches(values, divideExtraSt)}[K${segmentSize} 1 inc] x ${
        values.numberSt
      } K${segmentSize} ${extraStiches(values, extraSt - divideExtraSt)}}`;
    }

    return `${extraStiches(values, divideExtraSt)}[K${
      segmentSize - 2
    } 1 dec] x ${values.numberSt} K${segmentSize} ${extraStiches(
      values,
      extraSt - divideExtraSt
    )}}`;
  };

  const centerStichesInTheRound = (values: initialValues) => {
    const segmentSize = Math.floor(divideStitches(values));

    if (option === "increase") {
      return `[K${segmentSize} 1 inc] x ${values.numberSt}`;
    }

    return `[K${segmentSize - 2} 1 dec] x ${values.numberSt}`;
  };

  const handleOnSubmit = (values: initialValues) => {
    if (option === "gauge") {
      const st = calculateGauge(
        values.gaugeSt,
        values.gaugeWidth,
        values.finalWidth
      );
      setResults(`Cast on ${st} stiches`);
    } else if (inTheRound) {
      setResults(centerStichesInTheRound(values));
    } else {
      setResults(centerStiches(values));
    }
  };

  const formik = useFormik({
    initialValues: {
      gaugeSt: 0,
      gaugeWidth: 0,
      finalWidth: 0,
      currentSt: 0,
      numberSt: 0,
    },
    onSubmit: (values) => {
      handleOnSubmit(values);
    },
  });

  return (
    <>
      <Grid
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        noValidate
        autoComplete="off"
      >
        <FormLabel id="row-radio-buttons-group-label">Choose action</FormLabel>
        <RadioGroup
          row
          aria-labelledby="row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={option}
          onChange={handleChange}
          style={{ marginRight: "0", marginTop: "0" }}
        >
          <RadioInput option="Increase" />
          <RadioInput option="Decrease" />
          <RadioInput option="Gauge" />
        </RadioGroup>
        {option === "gauge" ? (
          <>
            <NumberInput
              name="gaugeSt"
              onChange={formik.handleChange}
              error={formik.touched.gaugeSt && Boolean(formik.errors.gaugeSt)}
              id="gauge-st-input"
              label="Gauge Stitch Count"
            />
            <NumberInput
              name="gaugeWidth"
              onChange={formik.handleChange}
              error={
                formik.touched.gaugeWidth && Boolean(formik.errors.gaugeWidth)
              }
              id="gauge-width-input"
              label="Gauge width"
            />
            <NumberInput
              name="finalWidth"
              onChange={formik.handleChange}
              error={
                formik.touched.finalWidth && Boolean(formik.errors.finalWidth)
              }
              id="final-width-input"
              label="Final width"
            />
          </>
        ) : (
          <>
            <NumberInput
              name="currentSt"
              onChange={formik.handleChange}
              error={
                formik.touched.currentSt && Boolean(formik.errors.currentSt)
              }
              id="current-st-input"
              label="Current Stitch Count"
            />
            <NumberInput
              name="numberSt"
              onChange={formik.handleChange}
              error={formik.touched.numberSt && Boolean(formik.errors.numberSt)}
              id="number-st-input"
              label={`Number of Stitches to ${capitalize(option)}`}
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
          </>
        )}
        <Button
          className="d-block"
          variant="contained"
          color="secondary"
          type="submit"
        >
          Submit
        </Button>
      </Grid>
      <Grid>
        <p className="pt-2">{results}</p>
      </Grid>
    </>
  );
};

export default Calculator;
