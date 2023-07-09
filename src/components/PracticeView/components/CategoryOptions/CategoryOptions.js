import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { WORD_CATEGORIES } from "../../utils";

// component to display current word and category options list
export const CategoryOptions = (props) => {
  const { currentState, handleSelectingCategory } = props;

  return (
    <RadioGroup
      row
      value={currentState.selectedCategory}
      onChange={handleSelectingCategory}
    >
      {WORD_CATEGORIES.map((category) => {
        return (
          <FormControlLabel
            value={category}
            control={<Radio />}
            label={category}
          />
        );
      })}
    </RadioGroup>
  );
};
