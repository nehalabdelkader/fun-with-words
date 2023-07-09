import React, { useEffect, useState } from "react";
import {
  Box,
  LinearProgress,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";

import { CategoryOptions } from "./components";

import { API } from "../../utils";

export const PracticeView = (props) => {
  const { handleFinishedPractice, handleScoreChange } = props;

  // states
  const [wordsList, setWordsList] = useState();
  const [currentState, setCurrentState] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
  });

  //handlers

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false });
  };
  const handleOpenSnackbar = (data) => {
    setSnackbar({
      open: true,
      ...data,
    });
  };

  const handleSelectingCategory = (event) => {
    setCurrentState((prev) => ({
      ...prev,
      selectedCategory: event.target.value,
    }));
  };

  const handleSubmit = () => {
    // correct answer
    let correctAnswersCount;
    if (currentState.selectedCategory === currentState.word.pos) {
      //show success snackbar
      handleOpenSnackbar({
        severity: "success",
        message: "Correct answer! GOOD JOB",
      });
      handleScoreChange(
        ((currentState.correctAnswersCount + 1) / wordsList.length) * 100
      );
      correctAnswersCount = currentState.correctAnswersCount + 1;
    } else {
      handleOpenSnackbar({
        severity: "error",
        message: "Ops! Wrong answer try again",
      });
    }

    if (currentState.index < wordsList.length - 1) {
      setCurrentState((prev) => {
        const newIndex = prev.index + 1;
        return {
          index: newIndex,
          word: wordsList[newIndex],
          selectedCategory: null,
          progess: (newIndex / wordsList.length) * 100,
          correctAnswersCount,
        };
      });
    } else {
      handleFinishedPractice();
    }
  };

  useEffect(() => {
    axios
      .get(API.WORDS)
      .then((res) => {
        setWordsList(res.data.wordsList);
        setCurrentState({
          index: 0,
          word: res.data.wordsList[0],
          selectedCategory: null,
          progess: 0,
          correctAnswersCount: 0,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {wordsList && (
        <Box>
          {/** progress bar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={currentState.progess}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${currentState.progess.toFixed(1)}%`}</Typography>
            </Box>
          </Box>

          <Box container pt={2}>
            <Typography variant="h4" sx={{ paddingY: 2 }}>
              {currentState.word.word}
            </Typography>
            {/** word categories options */}
            <CategoryOptions
              currentState={currentState}
              handleSelectingCategory={handleSelectingCategory}
            />
          </Box>

          <Box align="right">
            <Button
              variant="contained"
              disabled={!currentState.selectedCategory}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      )}
    </>
  );
};
