import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdSidenavModule, MdCardModule, MdInputModule, MdListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdCardModule,
    MdInputModule
  ],
  exports: [
    MdToolbarModule,
    MdSidenavModule,
    MdCardModule,
    MdInputModule
  ],
  declarations: []
})
export class MaterialModule { }
