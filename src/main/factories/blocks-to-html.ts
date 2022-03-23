import { Block } from '../../data/protocols/blocks';
import { BlocksToHTML } from '../../data/usecases/blocks-to-html-converter';
import { BlockDispatcher } from '../../data/usecases/blocks-to-html-converter/block-dispatcher';
import { ListBlocksWrapper } from '../../data/usecases/blocks-to-html-converter/list-blocks-wrapper';

export const makeBlocksToHtml = (blocks: Block[]): BlocksToHTML => {
  const dispatcher = new BlockDispatcher();
  const listBlocksWrapper = new ListBlocksWrapper();
  return new BlocksToHTML(blocks, dispatcher, listBlocksWrapper);
};
