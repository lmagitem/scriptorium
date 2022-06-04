/** Available languages. */
export enum LanguageEnum {
  FR = 'fr',
  EN = 'en',
  ES = 'es',
  DE = 'de',
  IT = 'it',
}

/** Available languages. */
export const AllLanguages = [
  LanguageEnum.FR,
  LanguageEnum.EN,
  LanguageEnum.ES,
  LanguageEnum.DE,
  LanguageEnum.IT,
];

/** Available languages. */
export type Language =
  | LanguageEnum.FR
  | LanguageEnum.EN
  | LanguageEnum.ES
  | LanguageEnum.DE
  | LanguageEnum.IT;
