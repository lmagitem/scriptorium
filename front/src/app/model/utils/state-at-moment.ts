/** Does the content of this state has to replace, be added or be removed to the actor's generic content */
export enum StateBehavior {
  REPLACE,
  ADD,
  REMOVE,
}

/** Contains the value of a piece of state and the behavior it's supposed to have. */
export interface StateEntry {
  behavior: StateBehavior;
  value: any;
}

export interface StateAtMoment {
  /** The moment at which the actor's state became the linked one. */
  moment: Date;
  /** The state in which the actor was at the linked moment.
   *  The keys are the names of the properties that have to be changed by the state entries. */
  state: Map<string, StateEntry>;
}
