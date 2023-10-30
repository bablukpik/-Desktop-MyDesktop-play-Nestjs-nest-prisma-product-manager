import { Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class FileReaderProvider {
  // filePath = your-json-file.json
  async readJSONFile(filePath: string): Promise<any> {
    const rawData = await fs.promises.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);
    return jsonData;
  }
}
