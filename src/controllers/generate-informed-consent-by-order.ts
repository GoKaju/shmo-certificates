// import chalk from "chalk";
import { MysqlService } from "../services/mysql.service";
import EjsService from "../services/ejs.service";
import { GotenbergService, PrintPdfDto } from "../services/gotenberg.service";

export interface GenerateInformedConsentByOrderDto {
  order: string;
  templateCode: string;
}

export class GenerateInformedConsentByOrder {
  async execute(dto: GenerateInformedConsentByOrderDto): Promise<{
    name: string;
    mimeType: string;
    data: Buffer;
  }> {
    const gotenbergService = new GotenbergService();
    const ejsService = new EjsService();
    const mysqlService = new MysqlService();
    try {
      const patientData = await mysqlService.getPatientDataByOrder(dto.order);

      const templates: PrintPdfDto = {
        index: await ejsService.renderFile(
          "../templates/informed-consent-body.ejs",
          {
            ...patientData,
          }
        ),
        header: await ejsService.renderFile(
          "../templates/informed-consent-header.ejs",
          {}
        ),
        footer: await ejsService.renderFile(
          "../templates/informed-consent-footer.ejs",
          {}
        ),
        properties: {
          printBackground: true,
          margins: {
            top: 0.7,
            bottom: 1,
            left: 0.2,
            right: 0.2,
          },
          size: {
            width: 8.5,
            height: 11,
          },
        },
      };

      const pdf = (await gotenbergService.build(templates, {
        buffer: true,
        waitDelay: "1s",
      })) as Buffer;

      return {
        name: "consentimiento-informado.pdf",
        mimeType: "application/pdf",
        data: pdf,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
