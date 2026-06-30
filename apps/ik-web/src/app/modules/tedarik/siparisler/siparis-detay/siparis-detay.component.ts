import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ITedarikSiparisMalzemeleri, ITedarikSiparisTeslimFisleri, ITedarikSiparisUygunsuzluklar } from '@ikweb-models/components';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  align?: 'end';
}

@Component({
  selector: 'ikweb-siparis-detay',
  templateUrl: './siparis-detay.component.html',
  styleUrl: './siparis-detay.component.scss',
})
export class SiparisDetayComponent implements OnChanges {
  @Input() siparisId: string;
  @Input() malzemeleri: ITedarikSiparisMalzemeleri[] = [];
  @Input() uygunsuzluklar: ITedarikSiparisUygunsuzluklar[] = [];
  @Input() teslimFisleri: ITedarikSiparisTeslimFisleri[] = [];

  activeTab = 'malzeme';

  readonly malzemeColumns: TableColumn<ITedarikSiparisMalzemeleri>[] = [
    { key: 'malzemeAdi',           label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.malzemeAdi' },
    { key: 'birimi',               label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.birimi' },
    { key: 'siparisMiktari',       label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.siparisMiktari',       align: 'end' },
    { key: 'teslimEdilenMiktar',   label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.teslimEdilenMiktar',   align: 'end' },
    { key: 'teslimAlinanMiktar',   label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.teslimAlinanMiktar',   align: 'end' },
    { key: 'faturaMiktari',        label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.faturaMiktari',        align: 'end' },
    { key: 'uygunsuzlukSayisi',    label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.uygunsuzlukSayisi',    align: 'end' },
    { key: 'acikUygunsuzlukSayisi',label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Malzemeler.acikUygunsuzlukSayisi',align: 'end' },
  ];

  readonly uygunsuzlukColumns: TableColumn<ITedarikSiparisUygunsuzluklar>[] = [
    { key: 'uygunsuzlukNo',     label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Uygunsuzluklar.uygunsuzlukNo' },
    { key: 'tarih',             label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Uygunsuzluklar.tarih' },
    { key: 'uygunsuzlukDurumu', label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Uygunsuzluklar.uygunsuzlukDurumu' },
    { key: 'uygunsuzlukTuru',   label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Uygunsuzluklar.uygunsuzlukTuru' },
    { key: 'aciklama',          label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_Uygunsuzluklar.aciklama' },
  ];

  readonly teslimFisleriColumns: TableColumn<ITedarikSiparisTeslimFisleri>[] = [
    { key: 'teslimAlindi',   label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.teslimAlindi' },
    { key: 'fisNo',          label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.fisNo' },
    { key: 'fisTarihi',      label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.fisTarihi' },
    { key: 'malzemeKodu',    label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.malzemeKodu' },
    { key: 'malzemeAdi',     label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.malzemeAdi' },
    { key: 'siparisMiktari', label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.siparisMiktari', align: 'end' },
    { key: 'teslimMiktari',  label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.teslimMiktari',  align: 'end' },
    { key: 'ekipmanKodu',    label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.ekipmanKodu' },
    { key: 'ureticiSeriNo',  label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.ureticiSeriNo' },
    { key: 'NFCEtiketNo',    label: 'IKWEB.Gridler.IKWeb_Tedarik_Siparisler_TeslimFisleri.NFCEtiketNo' },
  ];

  filteredMalzemeleri: ITedarikSiparisMalzemeleri[] = [];
  filteredUygunsuzluklar: ITedarikSiparisUygunsuzluklar[] = [];
  filteredTeslimFisleri: ITedarikSiparisTeslimFisleri[] = [];

  constructor(private _router: Router) {}

  ngOnChanges(): void {
    this.filteredMalzemeleri = this.malzemeleri.filter(m => m.siparisID === this.siparisId);
    this.filteredUygunsuzluklar = this.uygunsuzluklar.filter(u => u.siparisID === this.siparisId);
    this.filteredTeslimFisleri = this.teslimFisleri.filter(t => t.siparisID === this.siparisId);
  }

  goToUygunsuzlukFormu(type: 'teslimat' | 'hizmet' | 'kalite'): void {
    this._router.navigate(['/tedarik/siparisler/uygunsuzluk-formu', type]);
  }
}
