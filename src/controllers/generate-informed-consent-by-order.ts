export interface GenerateInformedConsentByOrderDto {
  order: string;
  templateCode: string;
}

export class GenerateInformedConsentByOrder {
  async execute(dto: GenerateInformedConsentByOrderDto) {
    throw new Error("Method not implemented.");
  }
}
