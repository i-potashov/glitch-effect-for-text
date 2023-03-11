import { getDecrRndString, getIncRndString, getRndFromArr, getRndString } from '../utils/random';
import { FC, useEffect, useState } from 'react';

type TextSymbolWriterProps = {
  words: string[];
  symbols: string;
  steps: number;
  intervals: number[];
  freezeTimer: number;
  componentStyle: string;
};

const TextSymbolWriter: FC<TextSymbolWriterProps> = ({
  words,
  symbols,
  steps,
  intervals,
  freezeTimer,
  componentStyle,
}) => {
  const symbolsArr: string[] = Array.from(symbols);
  const [wordState, setWordState] = useState<string>(words[0]);
  const [loopTrigger, setLoopTrigger] = useState<boolean>(false);

  useEffect(() => {
    const wordsArr: string[] = [...words, words[0]];
    const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const stepsTmpArr: number[] = Array.from({ length: steps });
    const chanceRangeArr: number[] = [];
    stepsTmpArr.reduce((acc, v, i) => {
      if (i === Math.floor(steps / 2)) acc = 0.3;
      acc = acc + 0.5 / (steps / 2);
      return (chanceRangeArr[i] = +acc.toFixed(2));
    }, 0.3);

    const revealText: () => Promise<void> = async () => {
      for (let i = 0; i < wordsArr.length - 1; i++) {
        await timer(freezeTimer / 2);
        setWordState(wordsArr[i]);
        const nextWord: string = wordsArr[i + 1];
        const lengthCheck: boolean = wordsArr[i].length <= nextWord.length;

        const wordDiff: number = lengthCheck
          ? nextWord.length - wordsArr[i].length
          : wordsArr[i].length - nextWord.length;

        let letterCounter: number = wordsArr[i].length;
        const letterCounterInc: number = wordDiff / steps;

        for (let a = 0; a < steps; a++) {
          const changedWord: string[] = lengthCheck
            ? Array.from({ length: nextWord.length }, (value, index) => (wordsArr[i][index] ? wordsArr[i][index] : ''))
            : Array.from(wordsArr[i]);
          const targetWord: string[] = lengthCheck
            ? Array.from(nextWord)
            : Array.from({ length: wordsArr[i].length }, (value, index) => (nextWord[index] ? nextWord[index] : ''));

          if (a < Math.floor(steps / 2)) {
            setWordState(
              lengthCheck
                ? getIncRndString(changedWord, letterCounter, chanceRangeArr[a], symbolsArr).join('').trim()
                : getDecrRndString(changedWord, letterCounter, chanceRangeArr[a], symbolsArr).join('').trim()
            );
            letterCounter = lengthCheck ? letterCounter + letterCounterInc : letterCounter - letterCounterInc;
            await timer(getRndFromArr(intervals));
          } else {
            setWordState(getRndString(targetWord, letterCounter, chanceRangeArr[a], symbolsArr).join('').trim());
            letterCounter = lengthCheck ? letterCounter + letterCounterInc : letterCounter - letterCounterInc;
            await timer(getRndFromArr(intervals));
          }
        }
        setWordState(nextWord);
        await timer(freezeTimer / 2);
      }
      setLoopTrigger(!loopTrigger);
    };
    revealText();
  }, [loopTrigger]);
  return <div className={componentStyle} dangerouslySetInnerHTML={{ __html: wordState }} />;
};

export default TextSymbolWriter;
