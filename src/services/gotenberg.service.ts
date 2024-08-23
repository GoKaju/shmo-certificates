import { HtmlConverter } from "chromiumly";
export interface PrintPdfDto {
  index: string;
  header: string;
  footer: string;
  properties?: PageProperties;
}

export class GotenbergService {
  async build(
    data: PrintPdfDto,
    options: {
      buffer?: Boolean;
      waitDelay?: string;
    } = {
      buffer: false,
      waitDelay: "1s",
    }
  ): Promise<string | Buffer> {
    const htmlConverter = new HtmlConverter();

    const buffer = await htmlConverter.convert({
      header: Buffer.from(data.header),
      html: Buffer.from(data.index),
      footer: Buffer.from(data.footer),
      properties: {
        printBackground: true,
        ...data?.properties,
      },
      waitDelay: options.waitDelay,
    });

    return options.buffer ? buffer : buffer.toString("base64");
  }
}

type PageProperties = {
  size?: {
    width: number; // Paper width, in inches (default 8.5)
    height: number; //Paper height, in inches (default 11)
  };
  margins?: {
    top: number; // Top margin, in inches (default 0.39)
    bottom: number; // Bottom margin, in inches (default 0.39)
    left: number; // Left margin, in inches (default 0.39)
    right: number; // Right margin, in inches (default 0.39)
  };
  preferCssPageSize?: boolean; // Define whether to prefer page size as defined by CSS (default false)
  printBackground?: boolean; // Print the background graphics (default false)
  omitBackground?: boolean; // Hide the default white background and allow generating PDFs with transparency (default false)
  landscape?: boolean; // Set the paper orientation to landscape (default false)
  scale?: number; // The scale of the page rendering (default 1.0)
  nativePageRanges?: { from: number; to: number }; // Page ranges to print
};
