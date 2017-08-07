import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdSidenavModule, MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdCardModule
  ],
  exports: [
    MdToolbarModule,
    MdSidenavModule,
    MdCardModule
  ],
  declarations: []
})
export class MaterialModule { }
