export const PC_KEYPRESS = 'PC_KEYPRESS';

export function pcKeypress(charCode: number, timestamp: number) {
  return {
    payload: {
      charCode,
      timestamp
    },
    type: PC_KEYPRESS
  };
}

