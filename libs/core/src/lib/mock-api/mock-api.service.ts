import { Injectable } from '@angular/core';
import { UsersTable } from '@mock-api';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockAPIService implements InMemoryDbService {
  constructor() { }

  /**
   * Create Mock DB and API
   */
  createDb(): {} | Observable<{}> {
    const db = {
      // auth module
      users: UsersTable.users,
    };
    return db;
  }
}
