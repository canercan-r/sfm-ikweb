
export interface IDashBoardData {
  siteIkametBilgileri: IDashboardSiteIkametBilgileri;
  olayKayitlari: IDashboardOlaylar[];
  ziyaretKayitlari: IDashBoardZiyaretKaydi[];
  blokRandevulari: IDashboardBlokRandevulari[];
  ziyaretciSayilari: IDashboardZiyaretSayisi[];
}
export interface IDashBoardZiyaretKaydi {
  ziyaretID: number | null;
  bolumNo: string;
  gelinenKisi: string;
  ziyaretciAdi: string;
  ziyaretciSoyadi: string;
  ziyaretciPlakaNo: string;
  kayitYapanPersonel: string;
  girisTarihi: string | null;
  blokNo: string;
}

export interface IDashboardOlaylar {
  olayTuru: string;
  olayTurID: number;
  tarih: Date | null;
  olayID: number;
}

export interface IDashboardOlaylarGroup {
  olayTuru: string;
  olayTurID: number;
  olaySayisi: number;
}

export interface IDashboardSiteIkametBilgileri {
  oturanMalSahibi: number | null;
  oturanKiraci: number | null;
  bosDaire: number | null;
  toplamKisiSayisi: number | null;
}
export interface IDashboardBlokRandevulari {
  randevuID: number | null;
  tarih: string | null;
  bolumNo: string;
  adiSoyadi: string;
  randevuTuru: string;
  aciklama: string;
  ikametTuru: string;
}

export interface IDashboardZiyaretSayisi {
  kayitTuruTanimi: string;
  tarih: Date;
  sayi: number;
  kayitTuru: number;
}

export interface IAktifBolumKayitlari {
  id: number;
  kisiAdi: string;
  mulkiyetDurumu: string;
  baslangicTarihi: string;
  ikametEdiliyor: string;
  kullanimOrani: string;
  hesapNo: string;
  bakiye: number;
  isAktif: boolean;
  blokNo: string;
  bolumNo: string;
  bolumAdi: string;
  bolumTipi: string;
  blokKatNo: string;
  brutAlan: string;
  finans: string;
  ekstre: string;
  kisiPicture: string;
}

export interface IIkametEdenKisiler {
  id: number;
  kisiNo: number;
  kisiAdi: string;
  yakinlik: string;
  baslangicTarihi: string;
  bitisTarihi: string;
}

export interface ITalepler {
  id: number;
  tarih: string;
  talepAlmaSekli: string;
  talepNo: string;
  bildiren: string;
  durumu: string;
  talepTuru: string;
  kategori: string;
  altKategori: string;
  aciklama: string;
  yapilan: string;
  isBitisTarihi: string;
}

export interface IOlaylar {
  id: number;
  olayTuru: string;
  lokasyon: string;
  aciklama: string;
}

export interface IUyeAraclari {
  id: number;
  plaka: string;
  kayitliKisi: string;
  marka: string;
  model: string;
  renk: string;
  ruhsatNo: string;
}

export interface IZiyaretciler {
  id: number;
  gelinenKisi: string;
  kayitTuru: string;
  sektor: string;
  firma: string;
  ziyaretci: string;
  gelinenTarih: string;
  cikilanTarih: string;
  plaka: string;
  ziyaretciSayisi: number;
  aciklama: string;
}

export interface IBlokRandevusu {
  id: number;
  randevuSebebi: string;
  kisi: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  kaydedilenPersonel: string;
  aciklama: string;
  durumu: string;
  sonucAciklamasi: string;
}

export interface IRezervasyon {
  id: number;
  kisi: string;
  mekan: string;
  tarih: string;
  saat: string;
  durum: string;
  aciklama: string;
}

export interface IKayipEsya {
  id: number;
  turu: string;
  kaybedenPersonel: string;
  esya: string;
  aciklama: string;
}

export interface IDosya {
  id: number;
  olay: string;
  aciklama: string;
}

export interface IDurumDegisiklikleri {
  id: number;
  tarih: string;
  aciklama: string;
  durumu: string;
  degistirenKullanici: string;
}

export interface IMailSmsGonder {
  id: number;
  sablonTuru: string;
  sablonKodu: string;
  sablonAdi: string;
  sablonKonusu: string;
}

export interface IBildirimGonderimi {
  id: number;
  adiSoyadi: string;
  bos1: number;
  bos2: number;
  bos3: number;
  paraBirimi: string;
  bos4: string;
  bos5: string;
  mailAdresi: string;
  bos6: string;
  bos7: string;
}

export interface IAramaYap {
  id: number;
  iletisimDilKodu: string;
  adres: string;
  email: string;
  cepNo: string;
  bagimsizBolum: string;
  telefonNo: string;
  uyruk: string;
}

export interface IAramaKaydi {
  id: number;
  dilKodu: string;
  sablon: string;
}

export interface ITahsilat {
  id: number;
  altHesap: string;
  bakiye: number;
  kapatilacakTutar: number;
}

export interface IEkstreDetay {
  id: number;
  fisNo: string;
  tarih: string;
  vade: string;
  fisTuru: string;
  altHesapTuru: string;
  aciklama: string;
  borc: number;
  alacak: number;
  bakiye: number;
  bakiyeDurumu: string;
}

export interface IAltHesapBakiye {
  id: number;
  altHesapTuru: string;
  borc: number;
  alacak: number;
  bakiye: number;
}

export interface IAltHesapBakiyeDetay {
  id: number;
  tarih: string;
  vade: string;
  borcToplam: number;
  kalanBorc: number;
  aciklama: string;
}

export interface IInsanKaynaklariPersonel {
  id: number;
  kurum: string;
  projeKodu: string;
  projeAdi: string;
  sicilNo: string;
  adi: string;
  soyadi: string;
  haklarinBaslangicTarihi: string;
  calismaSekli: string;
  pozTipi: string;
  pozKodu: string;
  pozisyon: string;
  tcNo: string;
  dogumTarihi: string;
  kisiFoto: string;
}

export interface IPuantaj {
  puantajID: number;
  kurum: string;
  projeKodu: string;
  projeAdi: string;
  hizmetTuru: string;
  ay: string;
  yil: string;
  durumu: string;
  tam: string;
  kisiSayisi: string;
  segment: string;
  segmentYonetici: string;
  operasyonBaskani: string;
  sfmSorumlusu: string;
}

export interface IGunlukPuantaj {
  gunlukPuantajID: number;
  puantajID: string;
  sicilNo: string;
  adi: string;
  soyadi: string;
  calismaSekli: string;
  aylikKilitli: boolean;
  girisTarihi: string;
  cikisTarihi: string;
  gunler: Array<Record<number, string>>;
  kisiFoto: string;
  haklarinBaslangicTarihi: string;
}

export interface IGunlukPuantajFazlaMesai {
  id: number;
  gunlukPuantajID: string;
  kayitNo: string;
  turu: string;
}

export interface IGunlukPuantajParmakIzi {
  id: number;
  gunlukPuantajID: string;
  haklarinBaslangicTarihi: string;
  aktifMi: boolean;
  vardiyaTuru: string;
  turu: string;
  saat: string;
  kayitDurumu: string;
  cihaz: string;
  fotograf: string;
}

export interface IAylikPuantaj {
  id: number;
  puantajID: string;
  adi: string;
  soyadi: string;
  calismaSekli: string;
  odemeTipi: string;
  pozisyonu: string;
  girisTarihi: string;
  toplamKazanc: number;
  brutMaas: number;
  hesaplamaSekli: string;
  yolYardimi: string;
  brutYol: number;
  brutEkOdeme: number;
  yaklasikNet: number;
  cikisTarihi: string;
}

export interface IAylikPuantajEvrakKontrol {
  id: number;
  puantajID: string;
  adi: string;
  soyadi: string;
  evrakTuru: string;
  gun: string;
  projeEvrakKontrol: boolean;
  muhasebeEvrakKontrol: boolean;
  aciklama: string;
  operasyonNot: string;
  muhasebeNot: string;
}

export interface IAylikPuantajDosyalar {
  id: number;
  puantajID: string;
  eklenmeTarihi: string;
  dosyaAdi: string;
  dosyaBoyutu: string;
  dosyaTuru: string;
  aciklama: string;
  path: string;
  gecerlilikTarihi: string;
  ekleyen: string;
}

export interface IAylikPuantajDurumDegisiklikleri {
  id: number;
  puantajID: string;
  personel: string;
  tarihi: string;
  projePuantajDurumu: string;
}

export interface IAylikPuantajEkOdemeler {
  id: number;
  puantajID: string;
  sicilNo: string;
  personel: string;
  ekOdemeTuruKodu: string;
  ekOdemeTuru: string;
  brut: number;
  aciklama: string;
  personelID: string;
}

export interface IAylikPuantajEkOdemeTuruKodu {
  id: number;
  puantajID: string;
  ekOdemeID: string;
  personelID: string;
  puantajEkOdemeTuruKodu: string;
  puantajEkOdemeTuruAdi: string;
  negatifDegerGirilebilir: boolean;
  aciklamaMecburi: boolean;
  yillikIzin: boolean;
}

export interface IAylikPuantajFazlaMesaiBilgileri {
  id: number;
  puantajID: string;
  sicilNo: string;
  adiSoyadi: string;
  calismaSekli: string;
  fazlaMesaiNedeni: string;
  musteriyeFaturalanacak: boolean;
  fazlaMesaiTuru: string;
  oran: string;
  sureSaat: string;
  fazlaMesaiTutar: number;
  sgkStatusu: string;
}

export interface IAylikPuantajEksikKayitlar {
  id: number;
  puantajID: string;
  adi: string;
  soyadi: string;
  eksikGun: string;
}

export interface IAylikPuantajYillikIzinDurumu {
  id: number;
  puantajID: string;
  calismaSekli: string;
  sicilNo: string;
  tcKimlik: string;
  personel: string;
  pozisyon: string;
  pt: string;
  kurum: string;
  projeKodu: string;
  projeAdi: string;
  operasyonBaskani: string;
  direktor: string;
  direktorYardimcisi: string;
}

export interface IPuantajKontrol {
  id: number;
  puantajID: string;
  turu: string;
  kayitNo: string;
  personelSayisi: number;
  calisanTutari: number;
  fazlaMesaiTutari: number;
}

export interface IEkipmanSayim {
  id: number;
  puantajID: string;
  tarih: string;
  projeID: number;
  personelID: number;
  aciklama: string;
  ekipmanNo: string;
  malzemeGrubu: string;
  ekipmanAdi: string;
  ekipmanDetayi: string;
  durumBilgisi: string;
  projeKodu: string;
}

export interface IVardiyaBilgi {
  id: number;
  puantajID: string;
  proje: string;
  projeninAdresi: string;
  adi: string;
  soyadi: string;
  adresi: string;
  il: string;
  ilce: string;
  vardiyaTuru: string;
  isBasiSaati: string;
}

export interface IKidemKontrol {
  id: number;
  puantajID: string;
  hesaplamaTuruID: number;
  kurumAdi: string;
  personel: string;
  projeAdi: string;
  pozisyon: string;
  calismaSekli: string;
  hakBaslangicTarihi: string;
  cikisTarihi: string;
  brutMaas: number;
  digerHaklar: number;
  toplamKidemGunu: string;
  brutKidemTazminati: number;
  kidem: number;
}