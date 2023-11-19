import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-excel-viewer',
  templateUrl: './excel-viewer.component.html',
  styleUrls: ['./excel-viewer.component.css'],
})
export class ExcelViewerComponent implements OnInit, OnChanges {
  @Input()
  excelFileUrl: any;

  safeUrl: any;

  constructor(protected sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log('URL :' + this.excelFileUrl);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.excelFileUrl
    );
    console.log('safeUrl :' + this.safeUrl);
  }
}
