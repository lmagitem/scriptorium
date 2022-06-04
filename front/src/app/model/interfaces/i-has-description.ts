import { Language } from "../app/language.enum";
import { TranslatableString } from "../utils/translatable-string";

export interface IHasDescription {
  /** The description translations of the element. */
  description: TranslatableString;

  /** Returns the description of the element in the required language. */
  getDescription: (lang?: Language) => string;
}
