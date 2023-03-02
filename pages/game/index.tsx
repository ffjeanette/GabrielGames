import { useCallback } from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { routes } from "modules/multiply/util/routes";
import useUserSettings from "modules/multiply/hooks/useUserSettings";
import Calculator from "modules/multiply/game/components/Calculator";
import Top from "modules/multiply/game/components/Top";
import useGame from "modules/multiply/game/useGame";

const GamePage = () => {
  const router = useRouter();

  const handleGameFinished = () => {
    router.push(routes.gamefinished);
  };

  const { gameNumbers, onAnswer } = useGame({
    level: 1,
    onGameFinished: handleGameFinished,
  });
  const { setUserSettings, userSettings } = useUserSettings();

  const handleSubmitAnswer = useCallback(
    (answer: number) => {
      const answerCorrect = onAnswer(answer);
      if (answerCorrect) {
        const newGameCount = userSettings.countGames + 1;
        setUserSettings([["countGames", newGameCount]]);
        return true;
      } else {
        return false;
      }
    },
    [onAnswer, setUserSettings, userSettings.countGames]
  );

  return (
    <>
      <Top />
      {!!gameNumbers.length && (
        <>
          <Box>
            <Typography variant="h1">
              {gameNumbers[0]} x {gameNumbers[1]}
            </Typography>
          </Box>
          <Box maxWidth={320}>
            <Calculator onSubmit={handleSubmitAnswer} />
          </Box>
        </>
      )}
    </>
  );
};

export default GamePage;
