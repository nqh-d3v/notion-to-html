import { PageBlockToPageProps } from '../../../data/usecases/page-block-to-page-props';
import { HtmlOptions } from '../../../data/protocols/html-options/html-options';
import { OptionsHtmlWrapper } from '../../../data/usecases/html-wrapper/options-html-wrapper';
import { NotionApiContentResponsesToBlocks } from '../../../infra/usecases/to-blocks/notion-api-content-response-to-blocks';
import { makeNotionUrlToPageIdFactory, makeNotionApiPageFetcher, makeBlocksToHtml } from '../../factories';
import { NotionPage } from '../../protocols/notion-page';

export class NotionPageToHtml {
  static async convert(pageURL: string, htmlOptions: HtmlOptions = {}): Promise<NotionPage> {
    return new NotionPageToHtml()._convert(pageURL, htmlOptions);
  }

  static async parse(pageURL: string, includeFullDocument = true): Promise<string> {
    return new NotionPageToHtml()._parse(pageURL, includeFullDocument);
  }

  private async _convert(pageURL: string, htmlOptions: HtmlOptions = {}): Promise<NotionPage> {
    const pageId = makeNotionUrlToPageIdFactory(pageURL).toPageId();
    const fetcher = await makeNotionApiPageFetcher(pageId);
    const notionApiResponses = await fetcher.getNotionPageContents();
    const blocks = new NotionApiContentResponsesToBlocks(notionApiResponses).toBlocks();

    if (blocks.length === 0) return Promise.resolve({ html: '' });

    const htmlBody = await makeBlocksToHtml(blocks).convert();
    const pageProps = await new PageBlockToPageProps(blocks[0]).toPageProps();

    return {
      title: pageProps.title,
      ...(pageProps.icon && { icon: pageProps.icon }),
      ...(pageProps.coverImageSrc && { cover: pageProps.coverImageSrc }),
      html: new OptionsHtmlWrapper(htmlOptions).wrapHtml(pageProps, htmlBody),
    };
  }

  private async _parse(pageURL: string, includeFullDocument = true): Promise<string> {
    console.warn('"parse" method is now deprecated. Please, use "convert" instead.');
    const convertInfo = await this._convert(pageURL, { bodyContentOnly: !includeFullDocument });
    console.log('Convert info', convertInfo);
    return convertInfo.html;
  }
}
