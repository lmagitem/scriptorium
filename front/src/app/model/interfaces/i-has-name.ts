import { Language } from "../app/language.enum";
import { TranslatableString } from "../utils/translatable-string";


export interface IHasName {
  /** The name translations of the element. */
  name: TranslatableString | string;

  /** Returns the name of the element in the required language. */
  getName: (lang?: Language) => string;
}
