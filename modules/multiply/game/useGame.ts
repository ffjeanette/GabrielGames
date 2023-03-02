import { useEffect, useCallback, useMemo, useState } from "react";

export const getNumbers = (limit: number): Array<number> => [
  ...Array(limit).keys(),
];

const maxNumbersByLevel: {
  [key: number]: number;
} = {
  1: 10, //TODO: Update to 10
};

type Props = {
  level: number;
  onGameFinished: () => void;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const successSounds = [
  "/lyd/Opptak-005.aac",
  "/lyd/Opptak-006.aac",
  "/lyd/Opptak-007.aac", //du fikk en pokemon
  "/lyd/Opptak-008.aac",
  "/lyd/Opptak-009.aac",
];

const failSound = ["/lyd/Opptak-004.aac", "/lyd/Opptak-010.aac"];

const useGame = ({ level, onGameFinished }: Props) => {
  const [gameNumbers, setGameNumbers] = useState<Array<number>>([]);

  const [audioPath, setAutoPath] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);

  const prevGames = useMemo(() => new Set<string>(), []);

  const maxNumber = maxNumbersByLevel[level];
  const leftSide = getNumbers(maxNumber);
  const rightSide = getNumbers(maxNumber);

  const getRandomNumbers = useCallback(
    () => [
      leftSide[getRandomInt(maxNumber)],
      rightSide[getRandomInt(maxNumber)],
    ],
    [leftSide, maxNumber, rightSide]
  );

  const getNewNumbers = useCallback((): number[] | null => {
    const allNumbersPlayed = prevGames.size === maxNumber * 2;

    if (allNumbersPlayed) {
      prevGames.clear();
      setGameNumbers([]);
      return null;
    }

    const randomNumbers = getRandomNumbers();

    const alreadyPlayed = prevGames.has(randomNumbers.toString());

    if (alreadyPlayed) {
      return getNewNumbers();
    } else {
      return randomNumbers;
    }
  }, [getRandomNumbers, maxNumber, prevGames]);

  const handleAnswerIncorrect = useCallback(() => {
    const newSound = failSound[getRandomInt(failSound.length - 1)];
    setAutoPath(newSound);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 4000);
    return false;
  }, []);

  const handleAnswerCorrect = useCallback(() => {
    const newSound = successSounds[getRandomInt(4)];
    setAutoPath(newSound);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false));

    const nextNumbers = getNewNumbers();

    if (!nextNumbers) {
      onGameFinished();
      return;
    }

    setGameNumbers(nextNumbers);

    return true;
  }, [getNewNumbers, onGameFinished]);

  const onAnswer = useCallback(
    (answer: number) => {
      if (!gameNumbers.length) {
        console.log("somethings up, fix me!");
      }
      const correctAnswer = gameNumbers.reduce((a, b) => a * b);
      return !(answer === correctAnswer)
        ? handleAnswerIncorrect()
        : handleAnswerCorrect();
    },
    [gameNumbers, handleAnswerCorrect, handleAnswerIncorrect]
  );

  useEffect(() => {
    if (!gameNumbers.length) {
      return;
    }
    prevGames.add(gameNumbers.toString());
  }, [gameNumbers, prevGames]);

  useEffect(() => {
    const audio = typeof Audio !== "undefined" && new Audio(audioPath);
    if (!audio) return;

    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying, audioPath]);

  useEffect(() => {
    const nextNumbers = getNewNumbers();

    if (!nextNumbers) {
      return;
    }
    setGameNumbers(nextNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    onAnswer,
    gameNumbers,
  };
};

export default useGame;
