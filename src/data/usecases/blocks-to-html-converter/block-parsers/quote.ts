import { blockToInnerHtml } from '../../../helpers/block-to-inner-html';
import { Block } from '../../../protocols/blocks';
import { ToHtml } from '../../../../domain/usecases/to-html';
import { FormatToStyle } from '../../../usecases/format-to-style';

export class QuoteBlockToHtml implements ToHtml {
  private readonly _block: Block;

  constructor(block: Block) {
    this._block = block;
  }

  async convert(): Promise<string> {
    const style = new FormatToStyle(this._block.format).toStyle();
    return Promise.resolve(`<blockquote${style}>${await blockToInnerHtml(this._block)}</blockquote>`);
  }
}
