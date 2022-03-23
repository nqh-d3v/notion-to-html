import { blockToInnerHtml } from '../../../helpers/block-to-inner-html';
import { Block } from '../../../protocols/blocks';
import { ToHtml } from '../../../../domain/usecases/to-html';
import { FormatToStyle } from '../../../usecases/format-to-style';
import { indentBlocksToHtml } from '../../../helpers/blocks-to-html';

export class TextBlockToHtml implements ToHtml {
  private readonly _block: Block;

  constructor(block: Block) {
    this._block = block;
  }

  async convert(): Promise<string> {
    const style = new FormatToStyle(this._block.format).toStyle();
    const childrenHtml = await indentBlocksToHtml(this._block.children);

    return Promise.resolve(`<p${style}>${await blockToInnerHtml(this._block)}${childrenHtml}</p>`);
  }
}
