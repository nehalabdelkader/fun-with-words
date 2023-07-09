import { useState } from "react";
import { Container } from "@mui/material";

import { RankView, PracticeView } from "./components";

function App() {
  // states
  const [score, setScore] = useState(0);
  const [showPracticeView, setShowPracticeView] = useState(true); 

  // handlers
  const handleFinishedPractice = () => {
    setShowPracticeView(false);
  };

  const handleScoreChange = (value) => {
    setScore(value);
  };

  const handleTryAgain = () => {
    setShowPracticeView(true);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4}}>
        {showPracticeView ? (
          <PracticeView
            handleFinishedPractice={handleFinishedPractice}
            handleScoreChange={handleScoreChange}
          />
        ) : (
          <RankView score={score} handleTryAgain={handleTryAgain} />
        )}
    </Container>
  );
}

export default App;
