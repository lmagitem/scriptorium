import { Language } from "../app/language.enum";
import { TranslatableString } from "../utils/translatable-string";


export interface IHasShortName {
  /** The short name translations of the element. */
  shortName: TranslatableString;

  /** Returns the short name of the element in the required language. */
  getShortName: (lang?: Language) => string;
}
