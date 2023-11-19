import { Injectable } from '@angular/core';
import { PDFDocument, PDFField, PDFForm } from 'pdf-lib';
import { Observable, catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  private loadPdf(pdfBytes: Uint8Array): Promise<PDFDocument> {
    return PDFDocument.load(pdfBytes);
  }

  extractPDFFormFields(pdfBytes: Uint8Array): Observable<string[]> {
    return from(this.loadPdf(pdfBytes)).pipe(
      map((pdfDoc: PDFDocument) => this.extractPDFFields(pdfDoc)),
      catchError((error: any) => {
        console.error('Error loading or extracting PDF', error);
        return [];
      })
    );
  }
  extractPDFFields(pdfDoc: PDFDocument): any {
    const formFields: string[] = [];
    const form = pdfDoc.getForm();
    if (form instanceof PDFForm) {
      const fields = form.getFields();
      fields.forEach((field: PDFField) => {
        formFields.push(field.getName());
      });
    }
    return formFields;
  }
}
