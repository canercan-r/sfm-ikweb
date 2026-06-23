import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { TaleplerAPIService } from '@ikweb-services/apis/talepler-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { IGridCellEventArgs } from '@infragistics/igniteui-angular';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-tedarik',
  templateUrl: './tedarik.component.html',
  styleUrl: './tedarik.component.scss',
})
export class TedarikComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContentTedarikNav', { read: ElementRef }) public scrollContentTedarikNav: ElementRef<any>;
  @ViewChild('tedarikTalepleriGrid', { static: false }) tedarikTalepleriGrid: MockGridComponent;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Talepler.Tedarik.Title' }
  ]);

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private readonly _cdr: ChangeDetectorRef,
    private _router: Router,
    private readonly _modal: NgbModal,
    private _taleplerApiService: TaleplerAPIService
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
  }

  ngAfterViewInit(): void {
    this.buildGrid();
  }

  tedarikTalebiDetayinaGit(clickEvent: IGridCellEventArgs) {
    const row = clickEvent.cell.row.data;
    this._router.navigate(['/talepler/tedarik-talepleri', row.id], {
      state: { projeAdi: row.projeAdi }
    });
  }

  buildGrid() {
    if (!this.tedarikTalepleriGrid) return;

    this._taleplerApiService.getTedarikTalepleri().subscribe((data) => {
      this.tedarikTalepleriGrid.data = data
      this.tedarikTalepleriGrid.totalCount = data.length
    })
    this.tedarikTalepleriGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Talepler_TedarikTalepleri)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.tedarikTalepleriGrid.columnField = [
      { field: 'projeKodu', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '' },
      { field: 'kurum', colRef: null, append: false, width: '200' },
      { field: 'hizmetTuru', colRef: null, append: false, width: '' },
      { field: 'projeSorumlusu', colRef: null, append: false, width: '' },
      { field: 'direktor', colRef: null, append: false, width: '' },
      { field: 'direktorYardimcisi', colRef: null, append: false, width: '' }
    ];
  }
}
