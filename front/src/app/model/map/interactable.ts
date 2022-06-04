import { Language } from '../app/language.enum';
import { IHasId } from '../interfaces/i-has-id';
import { IHasName } from '../interfaces/i-has-name';
import { IHasPosition } from '../interfaces/i-has-position';
import { Coordinates } from '../utils/coordinates';
import {
  TranslatableString,
  DEFAULT_TRANSLATED_STRING,
} from '../utils/translatable-string';
import { Element } from './element';

/** Class for objects that can be interacted with. */
export abstract class Interactable
  extends Element
  implements IHasPosition, IHasId, IHasName
{
  /** This object's id. */
  readonly id: number;
  /** The name translations of the element. */
  name: TranslatableString | string;
  /** The current position of the object. */
  position: Coordinates = { x: 0, y: 0 };

  constructor(params?: {
    id?: number;
    name?: TranslatableString | string;
    position?: Coordinates;
  }) {
    super();
    this.id = params?.id !== undefined ? params.id : -1;
    this.name =
      params?.name !== undefined
        ? params.name
        : new TranslatableString([DEFAULT_TRANSLATED_STRING]);
    this.position =
      params?.position !== undefined ? params.position : this.position;
  }

  /** Returns the name of the element in the required language. */
  getName: (lang?: Language) => string = (lang?: Language) =>
    typeof this.name === 'string' ? this.name : this.name.toString(lang);
  /** Returns current sprite of the object. */
  abstract getSpriteUrl: (zoom?: number) => string | undefined;
}
