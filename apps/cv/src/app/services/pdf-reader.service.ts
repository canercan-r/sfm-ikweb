import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js';
  }
  public async readPdf(rawData): Promise<string> {
    const pdf = await pdfjsLib.getDocument({ data: rawData }).promise;
    const countPromises = []; // collecting all page promises
    for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      countPromises.push(textContent.items.map((s) => (s as TextItem).str).join(''));
    }
    const pageContents = await Promise.all(countPromises);
    return pageContents.join('');
  }
}
