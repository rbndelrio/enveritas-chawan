import { useEffect, useState } from 'react';

export function useFive(number = 5) {
  const [five, setFive] = useState(number);

  function set(value: number) {
    if (value !== 5) {
      console.log("why would you do me like this" + '?'.repeat(value - 5))
    }
    setFive(value);
  }

  useEffect(() => {
    // console.log("It's %d time", five)

    return () => {
      // console.log("Thanks for the %d", five)
    };
  });

  return { five, set };
}