export class KullaniciParametreleri {
  StationID: number;
  KullaniciSifresiniDegistiremesin: boolean;
  RezervasyonEkranindaOnsatisYetkisi: boolean;
  TesisYetkisi: number;
  RezervasyonYetkisi: number;
  RezervasyonEkranindaSonIslemiGeriAlYetkisi: boolean;
  MazeretsizIptalKullanimi: boolean;
  MazeretliIptalKullanimi: boolean;
  IletisimBilgileriniGoremesin: boolean;
  AdayMusteriKayitTarihiDegistirmeYetkisi: boolean;
  IndirimEkleyebilme: boolean;
  EksureVerebilmeYetkisi: boolean;
  EksureVerebilmeYetkisiOnaylanmamis: boolean;
  OdemePlaniniManuelOlusturamasin: boolean;
  SozlesmeOdemePlaniniDetayliDegistirebilmeYetkisi: boolean;
  UyelikSozlesmesiSatisTarihiDegistirebilme: boolean;
  UyelikSatisNoktasiniDegistirebilme: boolean;
  FaturaDegistirebilme: boolean;
  FaturaPlanTarihiDegistirebilmeYetkisi: boolean;
  TahsilatDegistirebilme: boolean;
  OnaylanmamisSozlesmeIndirimYetkisi: boolean;
  SozlesmedeOnayYetkisi: boolean;
  SozlesmeOnayliOlussun: boolean;
  MisafirGetirebilmeSayisiDegistirebilmeOnaylanmamis: boolean;
  MailOrderIptalTarihiniDegistirebilme: boolean;
  UyelikBaslangicTarihiDegistirebilmeYetkisi: boolean;
  MaksimumGirisAdetiDegistirme: boolean;
  MisafirGetirebilmeSayisiDegistirebilme: boolean;
  ResimSilme: boolean;
  ResimEklebilme: boolean;
  AramaTuruDanismaniDegistirebilme: boolean;
  AramaListesineEkleyebilme: boolean;
  SatisDanismaniAtamaDegistirebilme: boolean; // Müşteri için aday için başka bir parametre var
  MusterilerEkraniSatisDanismaniAtamaYetkisi: boolean;
  UyelikBaslatmaDurumunuDegistirebilme: boolean;
  SozlesmeDurumDegistirmeYetkisi: boolean;
  ExcelAktarabilme: boolean;
  MusteriKartiBilgiAktivitesiSilebilme: boolean;
  AdayKartiAktiviteDegistirmeYetkisi: boolean;
  GlobalSilebilme: boolean;
  GecmiseAdayKartiAktiviteGirebilme: boolean;
  AramaListesiTumSubelerYetkisi: boolean;
  DigerDanismanlarinAramaListesiniGorebilme: boolean;
  SozlesmeOlusturmaYetkisi: boolean;
  StudyoDersMusteriBorcDurumuGorebilmeYetkisi: boolean;
  SozlesmeOnayliGuncellemeSuresi: number;
  TumKullanicilarinTahsilatlariniGorebilme: boolean;
  MusteriKrediKartiDuzenlemeYetkisi: boolean;
  GecmiseRezervasyonVeOnayAlinamasin: boolean;
  GecmiseRezervasyonVeOnayAlinamasinGun: number;
  SeansDurumuVeYoneticiOnayiDegistirebilmeYetkisi: boolean;
  SeansDurumuVeYoneticiOnayiDegistirebilmeGunSayisi: number;
  StudyoDersSinifOlusturmaYetkisi: boolean;
  GecmiseIslemYapilamasin: boolean;
  GecmiseIslemYapilamasinGunSayisi: number;
}

export class NovaParametreleri {
  constructor(
    public YerelParaBirimiID: number = 0,
    public YerelParaBirimiKur: number = 0,
    public YerelParaBirimi: string = '',
    public KurGirisiParaBirimiID: number = 0,
    public OntanimliOdemeTipi: number = 0,
    public TahsilatinTamamiYapilmadanSatisYapilamasin: boolean = false,
    public OtomatikTahsilatOlustur: boolean = false,
    public OtelEntegrasyonuVar: boolean = false,
    public OtelEntegrasyonundaFaturaNumericKontroluOlsun: boolean = false,
    public MusteriRiskLimitiKullanimi: boolean = false,
    public MusteriVarsayilanRiskLimiti: number = 0,
    public FaturalanmamislarRiskLimitineDahil: boolean = false,
    public OtelOdaHesabiID: number = 0,
    public OdaHesabiParaBirimiID: number = 0,
    public VarsayilanSatisNoktasiID: number = 0,
    public OntanimliMekanID: number = 0,
    public RezervasyonEkraniOtomatikYenileme: boolean = false,
    public RezervasyonYapabilmeKontrolSuresi: number = 0,
    public OdemeMerkezindeAciklamaMecburOlsun: boolean = false,
    public BirimFiyatiListeFiyatindanYuksekOlamaz: boolean = false,
    public PersoneleSatisYapilabilir: boolean = false,
    public GecmiseIslemYapilmasin: boolean = false,
    public GecmiseIslemYapilamasinGunSayisi: number = 0,
    public IndirimYapilincaAciklamaZorunludur: boolean = false,
    public AdisyonBirlestirmeKullan: boolean = false,
    public FaturaVeyaAdisyonNoAlanlariDegistirebilir: boolean = false,
    public YeniAdisyonEnSonGirilenDegereGoreAtansin: boolean = false,
    public AdisyonNoVeFaturaNumarasiBosGelsin: boolean = false,
    public SatisiYapanPersonelSatisDanismanidir: boolean = false,
    public SatistaTahsilatUyarisiVer: boolean = false,
    public EarsiveGecisTarihi: string,
    public EArsivBaglantiTipi: number = 0,
    public MaxUrunIndirimOrani: number = 0,
    public MaxPaketIndirimOrani: number = 0,
    public MaxServisIndirimOrani: number = 0,
    public MaxPHIndirimOrani: number = 0,
    public MaxStudyoDersPaketIndirimOrani: number = 0,
    public RaporlamaParaBirimiID: number = 0,
    public SilinenPlanlarIptallereGelsin: boolean = false,
    public PlanIptallerindeSureKullanimi: boolean = false,
    public PlanIptallerindeSureKullanimiSure: number = 0,
    public PlanIptallerindeLimitKullanimi: boolean = false,
    public PlanIptallerindeLimitKullanimiAylik: number = 0,
    public MesaiBaslangicSaati: string,
    public MesaiBitisSaati: string,
    public RezervasyonEkraniZamanDilimi: number = 0,
    public MusteriMailFormatiKontroluYapilmasin: boolean = false,
    public OnTanimliMusteriGrubuID: number = 0,
    public AquaWeatherID: string = '318251',
    public IlAdi: string = 'İstanbul',
    public RezervasyonEkranlarindaEkstreBaslangicAySayisi: number = 0,
    public VarsayilanMusteriOtelMusterisidir: boolean = false,
    public SozlesmeNumaralariDegistirilemesin: boolean = false,
    public OnayKullanimi: boolean = false,
    public MobilDevEntegrasyon: boolean = false,
    public MuhasebeEntegrasyonuTurID: number = 0,
    public VarsayilanCihazIP: string = '',
    public VarsayilanCihazID: number = 0,
    public NovaRabbitServisAdresi: string = '',
    public RabbitServisKullaniciAdi: string = '',
    public RabbitServisKullaniciSifre: string = '',
    public NovaGecisMonitor: boolean = false,
    public UyelikMusteriOnayiKullanilsin: boolean = false,
    public SozlesmedeCocukUstYasi: number = 0,
    public VarsayilanCinsiyet: number = 0,
    public UyelikSozlesmesiBaslatmaDurumuID: number = 0,
    public TelefonMask: string = '',
    public GecisKontrolsuzGunlukUyeGirisCikisEkrani: boolean = false,
    public FixPlanKullanimi = false,
    public EArsivKullanicisi: boolean = false,
    public EarsivOtomatikSeciliGelsin: boolean = false,
    public OnlineDevirSozlesmeKullanimi: boolean = false,
    public OtomatikPlanla: boolean = false,
    public HesKoduEntegrasyonuVar: boolean = false,
    public OdemePlaniVeFaturaPlaniOtomatikAyarlanmasin: boolean = false,
    public HostName: string = '',
    public FiyatListesiOnayKullaninimi: boolean = false,
    public ServisOnayindaQROnayiIstensin: boolean = false,
    public ServisOnayindaBiometrikOnayIstensin: boolean = false,
    public ServisOnayindaKartliOnayIstensin: boolean = false,
    public ServisOnayindaSmsOnayiIstensin: boolean = false,
    public MerkezSubeID: number = 0,
    public UyelikDondurmaUcretiPHizmetID: number = 0,
    public UyelikNakilUcretiPHizmetID: number = 0,
    public SozlesmeYenilemeSureliOlsun: boolean = false,
    public TCKimlikNoKontrolu: boolean = false,
    public SiraliPrimSistemiKullanilsin: boolean = false,
    public EntegrasyondaOdaListesiGoster: boolean = false,
    public UlkeID: number = 0,
    public UyelikGuncellemeTipi: number = 0,
    public PaketlerdeSiparisKullanimi: boolean = false,
    public EAVarsayilanGonderimSekli: number = 0,
    public YeniSatisOtomatikFaturaKesilmesin: boolean = false,
  ) { }
}
