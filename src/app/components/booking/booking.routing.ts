import { Routes } from '@angular/router';

import { BookingComponent } from './booking.component';

export const StarterRoutes: Routes = [
  {
    path: '',
    component: BookingComponent,
	data: {
      title: 'Booking Page',
      // urls: [
      //   { title: 'Dashboard', url: '/dashboard' },
      //   { title: 'Booking Page' }
      // ]
    }
  }
];
