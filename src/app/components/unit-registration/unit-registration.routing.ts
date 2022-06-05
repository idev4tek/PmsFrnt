import { Routes } from '@angular/router';

import { UnitRegistrationComponent } from './unit-registration.component';

export const UnitRegistrationRoutes: Routes = [
  {
    path: '',
    component: UnitRegistrationComponent,
	data: {
      title: 'Unit Registration Page',
      // urls: [
      //   { title: 'Dashboard', url: '/dashboard' },
      //   { title: 'Booking Page' }
      // ]
    }
  }
];
