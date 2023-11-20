import { Component } from '@angular/core';
import { PdfService } from 'src/services/pdf.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'D1PDFFieldExtractor';
  pdfFile: any;
  formFields: any;
  jsonData: any;
  EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  excelBlobUrl: any;

  public constructor(protected pdfservice: PdfService) {}

  onFileSelected(event: any): void {
    this.pdfFile = event.target.files[0];
  }

  extractFields(): void {
    if (this.pdfFile) {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const pdfBytes = new Uint8Array(e.target?.result as ArrayBuffer);
        this.formFields = await this.pdfservice
          .extractPDFFormFields(pdfBytes)
          .toPromise();
        this.jsonData = JSON.parse(JSON.stringify(this.formFields));
        this.exportToExcel();
      };
      fileReader.readAsArrayBuffer(this.pdfFile);
    }
  }
  exportToExcel() {
    const fileName = this.pdfFile?.name;
    const dataArray = [
      ['Field Names from PDF'],
      ...this.jsonData.map((item: any) => [item]),
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    XLSX.writeFile(wb, fileName + '.xlsx');
    // const data: Blob = new Blob([excelBuffer], { type: this.EXCEL_TYPE });
    // this.excelBlobUrl = URL.createObjectURL(data);
  }
}
