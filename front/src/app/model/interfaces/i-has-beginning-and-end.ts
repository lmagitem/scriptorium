export interface IHasBegginingAndEnd {
  /** The date before which this object didn't exist. */
  beggining: Date | undefined;
  /** The date after which this object wouldn't exist. */
  end: Date | undefined;
}
