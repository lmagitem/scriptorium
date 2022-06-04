import { LanguageEnum, Language } from "../app/language.enum";


export const UNNAMED = '[Unnamed]';
export const DEFAULT_TRANSLATED_STRING = {
  lang: LanguageEnum.EN,
  string: UNNAMED,
};

/** A simple key-value pair where the key is a language and the value a string, presumed to be written in that language. */
export interface TranslatedString {
  lang: Language;
  string: string;
}

/** An object that is able to contain multiple strings in different languages.
 *  Call "toString(lang)" with the desired {@link LanguageEnum} to get a specific translation. */
export class TranslatableString {
  private content = new Map<Language, string>();

  constructor(translations: TranslatedString[]) {
    translations?.forEach((t) => this.content.set(t.lang, t.string));
  }

  toString(lang?: Language): string {
    let result = lang !== undefined ? this.content.get(lang) : undefined;
    if (result === undefined) {
      for (const key of this.content.keys()) {
        result = this.content.get(key);
        if (result !== undefined) {
          break;
        }
      }
    }
    return result === undefined ? UNNAMED : result;
  }
}
