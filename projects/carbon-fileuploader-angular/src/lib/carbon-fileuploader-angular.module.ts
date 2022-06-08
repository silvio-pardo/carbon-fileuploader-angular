import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarbonFileuploaderAngularComponent } from './carbon-fileuploader-angular.component';
import { TrashCanModule } from '@carbon/icons-angular/dist';

@NgModule({
  declarations: [
    CarbonFileuploaderAngularComponent
  ],
  imports: [
    CommonModule,
    TrashCanModule
  ],
  exports: [
    CarbonFileuploaderAngularComponent
  ]
})
export class CarbonFileuploaderAngularModule { }
