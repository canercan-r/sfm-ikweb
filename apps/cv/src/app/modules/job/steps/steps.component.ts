import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { PageLink } from '@cv-layout/core/page-info.service';
import { AskerlikDurumlari, Cinsiyetler, DilSeviyeleri, EHLIYET_DURUM, ENGEL_DURUM, EhliyetDurumlari, EngelDurumlari, ICandidateLangs, IGenelFormData, IJobApplicationsFormData, IRegisterFormData, IYetkinlikFormData } from '@cv-models/cv';
import { JobAPIService } from '@cv-services/apis/job-api.service';
import { PdfReaderService } from '@cv-services/pdf-reader.service';
import { SharedService } from '@cv-services/shared.service';
import { IComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { AlertService } from '@lib-common';
import { TranslateService } from '@ngx-translate/core';
import { formatISO } from 'date-fns';
import { BehaviorSubject, catchError, firstValueFrom, of, shareReplay } from 'rxjs';

const _1MB: number = 1024 * 1024;

@Component({
  selector: 'cv-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsComponent implements OnInit {

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Job.Register.Title', path: '/home' },
  ]);

  isLoading = false;

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild("cvFile") fileInput: ElementRef;

  engel_durum = ENGEL_DURUM;
  ehliyet_durum = EHLIYET_DURUM;

  fileToUpload: File;

  registerFormData: IRegisterFormData;

  readonly egitimDurumlari$ = this._jobAPI.getEgitimDurumlari$.pipe(shareReplay(1));
  readonly diller$ = this._jobAPI.getDiller$.pipe(shareReplay(1));
  readonly uyruklar$ = this._jobAPI.getUyruklar$.pipe(shareReplay(1));

  readonly ehliyetler = this._jobAPI.getEhliyetler();
  readonly askerlikDurumlari = this._jobAPI.getAskerlikDurumlari();
  readonly dilSeviyeleri = this._jobAPI.getDilSeviyeleri();

  dilSeviyeleriArr = DilSeviyeleri.map(item => ({
    seviye: item.seviye,
    seviyeLangKey: this.translate.instant(item.seviyeLangKey)
  }));

  askerlikDurumArr = AskerlikDurumlari.map(item => ({
    askerlikDurumID: item.askerlikDurumID,
    askerlikDurumu: this.translate.instant(item.askerlikDurumu)
  }));

  readonly cinsiyetler = this._jobAPI.getCinsiyetler();
  readonly ehliyetDurumlari = this._jobAPI.getEhliyetDurumlari();
  readonly engelDurumlari = this._jobAPI.getEngelDurumlari();

  cinsiyetlerArr = Cinsiyetler.map(item => ({
    cinsiyetID: item.cinsiyetID,
    cinsiyet: this.translate.instant(item.cinsiyet)
  }));

  ehliyetDurumArr = EhliyetDurumlari.map(item => ({
    ehliyetDurumID: item.ehliyetDurumID,
    ehliyetDurumu: this.translate.instant(item.ehliyetDurumu)
  }));

  engelDurumlariArr = EngelDurumlari.map(item => ({
    engelDurumID: item.engelDurumID,
    engelDurumu: this.translate.instant(item.engelDurumu)
  }));

  genelForm = this._fb.group({
    cinsiyetID: new FormControl(
      { value: null, disabled: false },
      [Validators.required]),
    dogumTarihi: new FormControl(
      { value: null, disabled: false },
      [Validators.required]),
    uyrukID: new FormControl(
      { value: null, disabled: false },
      [Validators.required]),
    eposta: new FormControl(
      { value: null, disabled: false },
      Validators.compose([
        // Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])),

  });

  egitimForm = this._fb.group({
    egitimDurumID: new FormControl(
      { value: null, disabled: false },
      // [Validators.required]
    ),
    dilID: new FormControl(
      { value: null, disabled: false },
      [Validators.required]),
    dilSeviyesi: this._fb.array([]),
  });

  yetkinlikForm = this._fb.group({
    ehliyetDurumID: new FormControl(
      { value: null, disabled: true },
      //[Validators.required]
    ),
    ehliyetSinifi: new FormControl(
      { value: null, disabled: true },
      //[Validators.required]
    ),
    askerlikDurumID: new FormControl(
      { value: null, disabled: true },
      //[Validators.required]
    ),
    engelDurumID: new FormControl(
      { value: null, disabled: false },
      [Validators.required]),
    engelDurumu: new FormControl(
      { value: null, disabled: false },
      [Validators.required]),
    ozgecmis: new FormControl(
      { value: null, disabled: false }),
    cvFile: new FormControl(
      { value: null, disabled: false }),
    kvkkOnay: new FormControl(
      { value: null, disabled: false }, [Validators.requiredTrue]),

  });

  get cinsiyetCtrl() {
    return this.genelForm.get('cinsiyetID') as FormControl;
  }
  get askerlikDurumuCtrl() {
    return this.yetkinlikForm.get('askerlikDurumID') as FormControl;
  }

  get ehliyetDurumIDCtrl() {
    return this.yetkinlikForm.get('ehliyetDurumID') as FormControl;
  }

  get ehliyetSiniflariCtrl() {
    return this.yetkinlikForm.get('ehliyetSinifi') as FormControl;
  }

  get engelDurumIDCtrl() {
    return this.yetkinlikForm.get('engelDurumID') as FormControl;
  }

  get engelDurumuCtrl() {
    return this.yetkinlikForm.get('engelDurumu') as FormControl;
  }

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _jobAPI: JobAPIService,
    private readonly _alert: AlertService,
    private readonly _router: Router,
    private readonly pdfReader: PdfReaderService,
    private readonly translate: TranslateService,
    public readonly sharedService: SharedService
  ) {
    const state = this._router.getCurrentNavigation()?.extras?.state;
    if (!!state) {
      this.registerFormData = state["data"];
    }
    else {
      this._router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.ehliyetDurumIDCtrl.valueChanges.subscribe((ehliyetDurumID) => {
      ehliyetDurumID
        ? this.ehliyetSiniflariCtrl.enable({ emitEvent: false })
        : this.ehliyetSiniflariCtrl.disable({ emitEvent: false });
    });

    this.engelDurumIDCtrl.valueChanges.subscribe((engelDurumID) => {
      engelDurumID
        ? this.engelDurumuCtrl.enable({ emitEvent: false })
        : this.engelDurumuCtrl.disable({ emitEvent: false });
    });

    // this.cinsiyetCtrl.valueChanges.subscribe((cinsiyetID) => {
    //   cinsiyetID === CINSIYET_ENUM.ERKEK ? this.askerlikDurumuCtrl.enable() : this.askerlikDurumuCtrl.disable()
    //   this._cdr.detectChanges();
    // });

    this.askerlikDurumuCtrl.disable();
  }

  previous() {
    this.stepper.previous();
    this._cdr.detectChanges();
  }

  next() {
    this.stepper.next();
    this._cdr.detectChanges();
  }

  async send() {
    this.isLoading = true;
    this._cdr.detectChanges();
    try {
      const genelFormVal = { ...this.genelForm.getRawValue() as IGenelFormData };
      genelFormVal.dogumTarihi = formatISO(genelFormVal.dogumTarihi as Date);

      const egitimForm = this.egitimForm.getRawValue();
      const yetkinlikRaw = this.yetkinlikForm.getRawValue();
      const cvBase64 =
        yetkinlikRaw.cvFile
          ? yetkinlikRaw.cvFile.substring(
            yetkinlikRaw.cvFile.indexOf('base64,') + 'base64,'.length
          )
          : null;

      const yetkinlikForm: IYetkinlikFormData = {

        ...(this.askerlikDurumuCtrl.enabled && {
          askerlikDurumID: yetkinlikRaw.askerlikDurumID
        }),

        ehliyetiVar: yetkinlikRaw.ehliyetDurumID === this.ehliyet_durum.VAR,
        ehliyetSinifi: yetkinlikRaw.ehliyetSinifi
          ? (yetkinlikRaw.ehliyetSinifi as string[]).join(',')
          : '',

        engeliVar: yetkinlikRaw.engelDurumID === this.engel_durum.VAR,
        engelDurumu: yetkinlikRaw.engelDurumu,
        ozgecmis: yetkinlikRaw.ozgecmis,
        cvFile: cvBase64
      };

      const dilForm = this.dilSeviyesi.getRawValue() as ICandidateLangs[];
      let data = "";
      if (yetkinlikForm.cvFile != null) {
        try {
          const binStr = atob(yetkinlikForm.cvFile)
          data = await this.pdfReader.readPdf(binStr);
        } catch (err) {
          console.log('PDF parsed err: ' + err)
        }
      }

      let formData: IJobApplicationsFormData = {
        ...this.registerFormData,
        idNo: this.registerFormData.idNo?.toString(),
        ...genelFormVal,
        ...yetkinlikForm,
        egitimDurumID: egitimForm.egitimDurumID,
        diller: dilForm,
        dosyaAdi: this.fileToUpload?.name,
        dosyaBoyutu: this.fileToUpload?.size,
        dosyaTipi: this.fileToUpload?.type,
        cvContent: data
      }

      this._jobAPI.saveApplication(formData).pipe(
        catchError((err) => {
          this._alert.show({
            text: err.message,
            title: 'Global.ErrorOccured',
            type: 'error',
            overlayClose: false
          })
          return of(false);
        })
      ).subscribe(res => {
        if (res) {
          this._router.navigate(['/home/register/formSaved'], {
            queryParams: {},
          });
          this._alert.show({ title: 'Msg.ApplicationRTitle', text: 'Msg.ApplicationRecieved' });
        } else {
          this.isLoading = false;
          this._cdr.detectChanges();
        }
      });
    } catch {
      this.isLoading = false;
      this._cdr.detectChanges();
    }
  }

  async getLangState(dilID) {
    return (await firstValueFrom(this.diller$)).find(x => x.dilID == dilID).dil
  }

  async dilSelectionChange(event: IComboSelectionChangingEventArgs) {

    const selectedLangs = event.newSelection as { dilID: number; dil: string }[];
    const diller = await firstValueFrom(this.diller$);

    const formArray = this.dilSeviyesi;
    formArray.clear();

    for (const lang of selectedLangs) {

      const dilObj = diller.find(d => Number(d.dilID) === Number(lang.dilID));
      if (!dilObj) continue;

      formArray.push(
        this._fb.group({
          dilID: [lang.dilID],
          dil: [dilObj.dil],
          dilSeviyesi: ["", Validators.required],
        })
      );
    }
  }

  get dilSeviyesi() {
    return this.egitimForm.controls["dilSeviyesi"] as FormArray;
  }
  getFormGroup(langForm) {
    return langForm as FormGroup;
  }

  getControl(langForm, control) {
    return (langForm as FormGroup).controls[control].value;
  }

  handleFileInput(_event: any) {
    const file = (_event.target.files as FileList).item(0);
    if (file.size > this._jobAPI.maxFileSize) {
      const fileLenght = file.size;
      this._alert.show({ text: this.translate.instant('Msg.BigFileError', { DosyaBoyutu: (fileLenght / _1MB).toFixed(2), DosyaSiniri: (this._jobAPI.maxFileSize / _1MB).toFixed(2) }), type: 'error' });
      this.fileInput.nativeElement.value = null;
      return;
    }
    this.fileToUpload = file;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      const cvFile = event.target.result as string;
      this.yetkinlikForm.get('cvFile').setValue(cvFile);
      this._cdr.detectChanges();
    };
    reader.onerror = (event: any) => {
      this._alert.show({ title: 'Global.ErrorOccured', text: 'Msg.CannotReadPdf', type: 'error' });
    };
    reader.readAsDataURL(this.fileToUpload);
  }

}
