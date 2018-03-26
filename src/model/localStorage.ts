const STATE_KEY = "state";

const loadState = (): {} | undefined => {
  try {
    const serializedState: string | null = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    return undefined;
  }
};

const saveState = (state: {}): void => {
  try {
    const serializedState: string = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};

export { loadState, saveState };
