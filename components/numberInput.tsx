import { TextField } from "@mui/material";
import { ChangeEvent, ReactElement } from "react";

const NumberInput = ({
  id,
  label,
  name,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
      style={{ width: "310px" }}
    />
  );
};

export default NumberInput;
