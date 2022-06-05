import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { HorizontalMenuItems } from './menu-items/horizontal-menu-items';

import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CurrencyMaskDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CurrencyMaskDirective
  ],
  providers: [MenuItems, HorizontalMenuItems]
})
export class SharedModule { }
