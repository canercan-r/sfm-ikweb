import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  privateKey = '38cb9adaa4bf4256978bc5a63c1ea58c';

  constructor() { }

  encrypt(value) {
    try {
      const _key = CryptoJS.enc.Utf8.parse(this.privateKey);
      const _iv = CryptoJS.enc.Utf8.parse(this.privateKey);
      const _encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), _key, {
        keySize: 128 / 8,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return _encrypted.toString();
    } catch (ex) {
      console.error('Encryption error:', ex);
      return value;
    }
  }

  decrypt(value) {
    try {
      const _key = CryptoJS.enc.Utf8.parse(this.privateKey);
      const _iv = CryptoJS.enc.Utf8.parse(this.privateKey);
      const _decrypted = CryptoJS.AES.decrypt(value, _key, {
        keySize: 128 / 8,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return _decrypted.toString(CryptoJS.enc.Utf8);
    } catch (ex) {
      console.error('Decryption error:', ex);
      return value;
    }
  }
}
