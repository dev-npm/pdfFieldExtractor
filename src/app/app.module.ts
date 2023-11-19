import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PdfService } from 'src/services/pdf.service';
import { ExcelViewerComponent } from './components/excel-viewer/excel-viewer.component';

@NgModule({
  declarations: [AppComponent, ExcelViewerComponent],
  imports: [BrowserModule],
  providers: [PdfService],
  bootstrap: [AppComponent],
})
export class AppModule {}
