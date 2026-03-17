import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class B64OperationsManagerService {
  public b64EncodeUnicode(str: string): string {
    if (window && 'btoa' in window && 'encodeURIComponent' in window) {
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(('0x' + p1) as any))
      );
    } else {
      console.warn('b64EncodeUnicode requirements: window.btoa and window.encodeURIComponent functions');
      return null;
    }
  }

  public b64DecodeUnicode(str: string): string {
    if (window && 'atob' in window && 'decodeURIComponent' in window) {
      let decoded = decodeURIComponent(
        Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      if (decoded.startsWith('"')) {
        decoded = decoded.substring(1);
      }
      if (decoded.endsWith('"')) {
        decoded = decoded.substring(0, decoded.length - 1);
      }
      return decoded;
    } else {
      console.warn('b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions');
      return null;
    }
  }
}
