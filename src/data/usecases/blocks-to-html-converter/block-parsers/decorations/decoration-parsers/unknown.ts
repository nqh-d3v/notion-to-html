import { ToHtml } from '../../../../../../domain/usecases/to-html';

export class UnknownDecorationToHtml implements ToHtml {
  private readonly _text: string;

  constructor(text: string) {
    this._text = text;
  }

  async convert(): Promise<string> {
    return Promise.resolve(this._text);
  }
}
