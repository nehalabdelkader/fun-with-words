import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { API } from "../../utils";

export const RankView = (props) => {
  const { handleTryAgain, score } = props;

  const [rank, setRank] = useState();

  // rank GET request
  const getRank = () => {
    axios
      .get(API.RANK, {
        params: {
          score,
        },
      })
      .then((res) => setRank(res.data.rank))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // get rank on component mount
    getRank();
  }, []);

  return (
    <>
      {rank && (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4">Your rank is: {rank}</Typography>
          <Button variant="contained" onClick={handleTryAgain}>
            Try Again!
          </Button>
        </Box>
      )}
    </>
  );
};
