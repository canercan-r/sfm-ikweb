import { Observable } from "rxjs";
import { ORDER_STATE } from "./enums";

export interface IOrders {
  siparisID: string;
  siparisNo: string;
  yerlestirmeTarihi: string;
  barkodNo: string;
  kargocuKulliniciAdi: string;
  siparisDurumID: number;
}

export interface IOrderCards {
  id: ORDER_STATE;
  title: string;
  value: Observable<IOrders[]>;
  yesterday: number;
  today: number;
}

