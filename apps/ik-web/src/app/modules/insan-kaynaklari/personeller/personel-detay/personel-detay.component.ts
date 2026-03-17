import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IInsanKaynaklariPersonel } from '@ikweb-models/components';
import { PersonellerAPIService } from '@ikweb-services/apis/personeller-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { PageStackService } from '@lib-common';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-personel-detay',
  templateUrl: './personel-detay.component.html',
  styleUrl: './personel-detay.component.scss',
})
export class PersonelDetayComponent implements OnInit {
  @ViewChild('scrollContentPersonelNav', { read: ElementRef }) public scrollContentPersonelNav: ElementRef<any>;
  personel: IInsanKaynaklariPersonel

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'InsanKaynaklari.Personeller.PersonelKarti' },
  ]);

  navItems = [
    'Genel',
    'EgitimBilgileri',
    'Diger',
    "OG",
    "Sertifikalar",
    "IsKazalari",
    "AldigiEgitimler",
    "GirdigiSinavlar",
    "PerformansDegerlendirmesi",
    "Puantajlar"
  ]

  tabHistory: string[] = [];

  navActiveId = this.navItems[0];

  constructor(
    private route: ActivatedRoute,
    private _personelApi: PersonellerAPIService,
    readonly _sharedHelper: SharedHelperService,
    private readonly _cdr: ChangeDetectorRef,
    public _pageStack: PageStackService,
  ) { }

  ngOnInit(): void {
    const personelID = this.route.snapshot.paramMap.get('personelID');

    this._personelApi.getPersonel(personelID).subscribe({
      next: (res) => {
        this.personel = res;
      }
    });

    if (this.navActiveId) {
      this.tabHistory.push(this.navActiveId);
    }

    this._sharedHelper.initScrollComponent();
  }

  controlPrev(element: Element) {
    element.scrollTo({ left: (this.scrollContentPersonelNav.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  controlNext(element: Element) {
    element.scrollTo({ left: (this.scrollContentPersonelNav.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  navChanged(event: NgbNavChangeEvent) {
    const next = event.nextId;

    if (this.tabHistory[this.tabHistory.length - 1] !== next) {
      this.tabHistory.push(next);
    }

    this.navActiveId = next;
    this._cdr.detectChanges();
  }

  onBackClicked() {
    if (this.tabHistory.length < 2) {
      this._pageStack.goBack();
      return;
    }

    this.tabHistory.pop();
    const previousTab = this.tabHistory[this.tabHistory.length - 1];

    this.navActiveId = previousTab;
  }

}
