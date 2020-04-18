import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Layout } from '../enums/layout.enum';
import { Mode } from '../enums/mode.enum';
import { PreviewService } from '../providers/preview.service';
import { Observable, Subject, scheduled } from 'rxjs';
import { Preview } from '../models/preview.model';
import { catchError, timeout } from 'rxjs/operators';

@Component({
  selector: 'unfurl-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnChanges {

  private  _url: string;
  private  _layout: Layout = Layout.Grid;
  private  _mode: Mode = Mode.Detailed;
  public loading = false;

  @Input() set url(url: string) {
    this._url = url;
    this.cdRef.markForCheck();
  };
  get url(): string {
    return this._url;
  }

  @Input() set layout(layout: Layout) {
    this._layout = layout;
    this.cdRef.markForCheck();
  };
  get layout(): Layout {
    return this._layout;
  }

  @Input() set mode(mode: Mode) {
    this._mode = mode;
    this.cdRef.markForCheck();
  };
  get mode(): Mode {
    return this._mode;
  }

  private previewSubject =  new Subject<Preview>();

  preview$: Observable<Preview> = this.previewSubject.asObservable();

  constructor(private previewService: PreviewService, private cdRef: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.url) {
      if(this.url) {
        this.loading = true;
        this.previewService.load(this.url).pipe(
          timeout(6000)
        )
        .subscribe(
          preview => {
            // We need to verify here!!
            // For testing
            // preview.image = 'google.com.wwww.edsfsd/dsfdsfsd.png'
            if (!this.previewService.verifyURL(preview)) {
              preview.image = null;
            }
            // console.log(preview)
            this.previewSubject.next(preview);
            this.loading = false;
            setTimeout(() => this.cdRef.detectChanges());
          }
        );
      }
    }
    if(changes.mode || changes.layout) {
      this.cdRef.markForCheck();
    }
  }

  ngOnInit() {

  }

}
