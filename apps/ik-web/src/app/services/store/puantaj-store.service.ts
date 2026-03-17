import { Injectable } from '@angular/core';
import { IPuantaj } from '@ikweb-models/components';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PuantajStoreService {

    private puantajIDSource = new BehaviorSubject<string | null>(null);
    puantajID$ = this.puantajIDSource.asObservable();

    private selectedPuantajSource = new BehaviorSubject<IPuantaj | null>(null);
    selectedPuantaj$ = this.selectedPuantajSource.asObservable();

    setPuantajID(id: string) {
        this.puantajIDSource.next(id);
    }

    getPuantajID() {
        return this.puantajIDSource.value;
    }

    setSelectedPuantaj(p: IPuantaj) {
        this.selectedPuantajSource.next(p);
    }

    getSelectedPuantaj() {
        return this.selectedPuantajSource.value;
    }
}