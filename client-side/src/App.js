import { useState } from "react";
import { Container } from "@mui/material";

import { RankView, PracticeView } from "./components";

function App() {
  // states
  // shared score state between PracticeView and RankView
  const [score, setScore] = useState(0);
  const [showPracticeView, setShowPracticeView] = useState(true);

  // handlers
  // shows RankView on finishing parctice words
  const handleFinishedPractice = () => {
    setShowPracticeView(false);
  };

  // updates score state
  const handleScoreChange = (value) => {
    setScore(value);
  };

  // handle Try again button click
  // shows Practice View when you click on Try again button
  const handleTryAgain = () => {
    setShowPracticeView(true);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
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
