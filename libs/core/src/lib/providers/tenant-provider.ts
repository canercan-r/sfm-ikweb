import { ExistingProvider, InjectionToken } from '@angular/core';
import { TenantProvider } from '../models/provider-types';
import { TenantService } from '../services/tenant.service';

export const TENANT_PROVIDER = new InjectionToken<TenantProvider>('core.providers.tenant');

export const DefaultTenantProvider: ExistingProvider = {
  provide: TENANT_PROVIDER,
  multi: false,
  useExisting: TenantService
};
