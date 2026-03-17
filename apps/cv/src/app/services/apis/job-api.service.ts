import { Injectable } from '@angular/core';
import { AskerlikDurumlari, CalismaTercihleri, Cinsiyetler, DilSeviyeleri, EhliyetDurumlari, EhliyetSiniflari, EngelDurumlari, IAskerlikDurum, IBrandingDatas, IBrandingDatasFilter, IDepartman, IDil, IDilSeviyesi, IEgitimDurum, IEhliyet, IFormDataFilter, IFormDatas, IGorevTanim, IJobApplicationsFormData, IMekan, IUyruk } from '@cv-models/cv';
import { AlertService } from '@lib-common';
import { DataService, IResponseWrapper, UrlBuilderService } from '@lib-core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BaseAPIService } from './base-api.service';

enum JobAPI {
  GET_FORM_DATAS = "GetFormDatas",
  GET_BRAND_DATA = "GetBrandingDatas",

  SAVE_APPLICATION = "SaveApplication"
}

@Injectable({ providedIn: 'root' })
export class JobAPIService extends BaseAPIService<JobAPI> {


  private readonly _formDatas$ = new BehaviorSubject<IFormDatas>(null);
  readonly formDatas$ = this._formDatas$.asObservable();

  readonly getMekanlar$: Observable<IMekan[]> = this._formDatas$.pipe(map(datas => datas == null || datas.mekanlar == null ? [] : datas.mekanlar));
  readonly getDepartmanlar$: Observable<IDepartman[]> = this._formDatas$.pipe(map(datas => datas == null || datas.departmanlar == null ? [] : datas.departmanlar));
  readonly getGorevTanimlari$: Observable<IGorevTanim[]> = this._formDatas$.pipe(map(datas => datas == null || datas.gorevTanimlari == null ? [] : datas.gorevTanimlari));

  readonly getDiller$: Observable<IDil[]> = this._formDatas$.pipe(map(datas => datas == null || datas.diller == null ? [] : datas.diller));
  readonly getEgitimDurumlari$: Observable<IEgitimDurum[]> = this._formDatas$.pipe(map(datas => datas == null || datas.egitimDurumlari == null ? [] : datas.egitimDurumlari));
  readonly getUyruklar$: Observable<IUyruk[]> = this._formDatas$.pipe(map(datas => datas == null || datas.uyruklar == null ? [] : datas.uyruklar));

  get maxFileSize() {
    return this._formDatas$.value?.maxFileSize;
  }
  constructor(_url: UrlBuilderService, protected readonly _backend: DataService,
    private _alert: AlertService) {
    super(_url, _backend, 'JobURL');
  }

  getFormDatas(body: IFormDataFilter): Observable<IFormDatas> {
    return this.post<IResponseWrapper<IFormDatas>>(JobAPI.GET_FORM_DATAS, body).pipe(this.unboxError, tap(datas => {
      this._formDatas$.next(datas);
    }));
  }

  getBrandingDatas(body: IBrandingDatasFilter): Observable<IBrandingDatas> {
    return this.post<IResponseWrapper<IBrandingDatas>>(JobAPI.GET_BRAND_DATA, body).pipe(this.unboxError);
  }

  saveApplication(formData: IJobApplicationsFormData) {
    return this.post<IResponseWrapper<boolean>>(
      JobAPI.SAVE_APPLICATION,
      {
        request: {
          data: {
            ...formData,
            idNo: String(formData.idNo),
          }
        }
      }
    ).pipe(this.unboxError);
  }

  getAskerlikDurumlari(): IAskerlikDurum[] {
    return AskerlikDurumlari;
  }

  getEhliyetler(): IEhliyet[] {
    return EhliyetSiniflari;
  }

  getDilSeviyeleri(): IDilSeviyesi[] {
    return DilSeviyeleri;
  }

  getCinsiyetler() {
    return Cinsiyetler;
  }

  getEhliyetDurumlari() {
    return EhliyetDurumlari;
  }

  getEngelDurumlari() {
    return EngelDurumlari;
  }

  getCalismaTercihleri() {
    return CalismaTercihleri;
  }
}
