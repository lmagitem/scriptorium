import { Language } from "../app/language.enum";
import { TranslatableString } from "../utils/translatable-string";


export interface IHasShortDescription {
  /** The short description translations of the element. */
  shortDescription: TranslatableString;

  /** Returns the short description of the element in the required language. */
  getShortDescription: (lang?: Language) => string;
}
