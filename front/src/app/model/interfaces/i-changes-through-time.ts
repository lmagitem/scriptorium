import { StateAtMoment } from "../utils/state-at-moment";


export interface IChangesThroughTime {
  /** History of changes for this actor. */
  history: StateAtMoment[];

  /** Adds the given state from the object's history. */
  addToHistory: (state: StateAtMoment) => boolean;
  /** Removes the given state from the object's history. */
  removeFromHistory: (state: StateAtMoment) => boolean;
  /** Clears the entire history of the object. */
  clearHistory: () => void;
  /** Returns the object's state at the given date, the closest state before the date, or undefined. */
  findAtDate: (moment: Date) => StateAtMoment | undefined;
}
