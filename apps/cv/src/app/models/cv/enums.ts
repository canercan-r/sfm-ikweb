import { IAskerlikDurum, IDilSeviyesi, IEhliyet } from "./interfaces";

export enum CALISMA_TERCIHI {
  TAM_ZAMANLI = 1,
  STAJ = 3
}

export enum EHLIYET_DURUM {
  YOK,
  VAR
}
export enum ASKERLIK_DURUM {
  YAPILDI = 1,
  TECILLI,
  MUAF,
  YAPILMADI
}

export enum ENGEL_DURUM {
  YOK,
  VAR
}
export enum CINSIYET_ENUM {
  ERKEK = 1,
  KADIN
}

export const EhliyetSiniflari: IEhliyet[] =
  [
    {
      ehliyetSinifID: 1,
      ehliyetSinifi: "A1"
    },
    {
      ehliyetSinifID: 2,
      ehliyetSinifi: "A2"
    },
    {
      ehliyetSinifID: 3,
      ehliyetSinifi: "A"
    },
    {
      ehliyetSinifID: 4,
      ehliyetSinifi: "B1"
    },
    {
      ehliyetSinifID: 5,
      ehliyetSinifi: "B"
    },
    {
      ehliyetSinifID: 6,
      ehliyetSinifi: "BE"
    },
    {
      ehliyetSinifID: 7,
      ehliyetSinifi: "C1"
    },
    {
      ehliyetSinifID: 8,
      ehliyetSinifi: "C1E"
    },
    {
      ehliyetSinifID: 9,
      ehliyetSinifi: "C"
    },
    {
      ehliyetSinifID: 10,
      ehliyetSinifi: "CE"
    },
    {
      ehliyetSinifID: 11,
      ehliyetSinifi: "D1"
    },
    {
      ehliyetSinifID: 12,
      ehliyetSinifi: "D1E"
    },
    {
      ehliyetSinifID: 13,
      ehliyetSinifi: "D"
    },
    {
      ehliyetSinifID: 14,
      ehliyetSinifi: "DE"
    },
    {
      ehliyetSinifID: 15,
      ehliyetSinifi: "F"
    },
    {
      ehliyetSinifID: 16,
      ehliyetSinifi: "M"
    },
    {
      ehliyetSinifID: 17,
      ehliyetSinifi: "G"
    }
  ];

export const DilSeviyeleri: IDilSeviyesi[] =
  [
    {
      seviyeLangKey: 'DilSeviyeleri.Baslangic',
      seviye: 'Başlangıç'
    },
    {
      seviyeLangKey: 'DilSeviyeleri.Orta',
      seviye: 'Orta'
    },
    {
      seviyeLangKey: 'DilSeviyeleri.Iyi',
      seviye: 'İyi'
    }
  ]

export const AskerlikDurumlari: IAskerlikDurum[] =
  [
    {
      askerlikDurumID: 1,
      askerlikDurumu: 'AskerlikDurumlari.Yapildi'
    },
    {
      askerlikDurumID: 2,
      askerlikDurumu: 'AskerlikDurumlari.Tecilli'
    },
    {
      askerlikDurumID: 3,
      askerlikDurumu: 'AskerlikDurumlari.Muaf'
    },
    {
      askerlikDurumID: 4,
      askerlikDurumu: 'AskerlikDurumlari.Yapilmadi'
    }
  ]

export const Cinsiyetler =
  [
    {
      cinsiyetID: 1,
      cinsiyet: 'CINSIYET.ERKEK'
    },
    {
      cinsiyetID: 2,
      cinsiyet: 'CINSIYET.KADIN'
    }
  ]

export const EhliyetDurumlari =
  [
    {
      ehliyetDurumID: 0,
      ehliyetDurumu: 'EhliyetDurum.YOK'
    },
    {
      ehliyetDurumID: 1,
      ehliyetDurumu: 'EhliyetDurum.VAR'
    }
  ]

export const EngelDurumlari =
  [
    {
      engelDurumID: 0,
      engelDurumu: 'EngelDurum.YOK'
    },
    {
      engelDurumID: 1,
      engelDurumu: 'EngelDurum.VAR'
    }
  ]

export const CalismaTercihleri =
  [
    {
      id: 1,
      name: 'Job.Register.TAM_ZAMANLI'
    },
    {
      id: 3,
      name: 'Job.Register.STAJ'
    }
  ]
