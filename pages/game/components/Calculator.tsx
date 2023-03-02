import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ReactNode, useState, useEffect, useCallback, memo } from "react"

type Props = {
  onSubmit: (number: number) => boolean
}

const Button = ({
  children,
  onClick,
  color,
}: {
  color?: "red" | "green"
  children: ReactNode
  onClick: () => void
}) => (
  <Box
    onClick={onClick}
    height={"auto"}
    style={{ background: color || "grey" }}
  >
    <Typography variant='h5' align='center'>
      {children}
    </Typography>
  </Box>
)

const Calculator = ({ onSubmit }: Props) => {
  const [enteredNumbers, setEnteredNumbers] = useState<Array<number>>([])
  const [wrongAnswer, setWrongAnswer] = useState<boolean>(false)
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

  const handleClickNumber = useCallback(
    (newNumber: number) => {
      setEnteredNumbers([...(wrongAnswer ? [] : enteredNumbers), newNumber])
      setWrongAnswer(false)
    },
    [enteredNumbers, wrongAnswer]
  )

  const handleClickSubmit = useCallback(() => {
    if (!enteredNumbers.length) {
      return
    }
    const enteredNumber = parseInt(enteredNumbers.join(""))
    const correct = onSubmit(enteredNumber)

    if (correct) {
      setEnteredNumbers([])
    } else {
      setWrongAnswer(true)
    }
  }, [enteredNumbers, onSubmit])

  const handleClickReset = () => {
    setWrongAnswer(false)
    setEnteredNumbers([])
  }

  const handlekeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()

      if (e.repeat) {
        return
      }

      //TODO Event fires multiple timea causeig problems
      const current = e.key
      const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      if (values.includes(current)) {
        let value = current
        handleClickNumber(parseInt(value))
        return
      }

      if (current.toLowerCase() === "backspace") {
        handleClickReset()
        return
      }
      if (current.toLowerCase() === "enter") {
        handleClickSubmit()
        return
      }
    },
    [handleClickNumber, handleClickSubmit]
  )

  useEffect(() => {
    document.addEventListener("keydown", handlekeyDown)
    return () => {
      document.removeEventListener("keydown", handlekeyDown)
    }
  }, [handlekeyDown])

  return (
    <>
      <Typography variant='h2' color={wrongAnswer ? "red" : "inherit"}>
        = {enteredNumbers.join("")}
      </Typography>
      <Grid container spacing={2}>
        {numbers.map((number) => (
          <Grid key={number} item xs={4}>
            <Button onClick={() => handleClickNumber(number)}>{number}</Button>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Button color={"red"} onClick={handleClickReset}>
            Slett
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button color={"green"} onClick={handleClickSubmit}>
            Svar
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default memo(Calculator)
