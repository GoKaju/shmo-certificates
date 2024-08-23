import ejs from "ejs";
import path from "path";
export default class EjsService {
  async renderFile(templatePath: string, data: any): Promise<string> {
    const realPath = path.join(__dirname, templatePath);
    return await ejs.renderFile(realPath, data, { async: true });
  }
}
