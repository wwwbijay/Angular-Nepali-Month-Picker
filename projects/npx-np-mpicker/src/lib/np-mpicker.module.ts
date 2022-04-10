import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NpMPickerComponent } from './np-mpicker.component';
import { ToNpPipe } from './to-np.pipe';

@NgModule({
  declarations: [
    ToNpPipe,
    NpMPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    NpMPickerComponent
  ]
})
export class NepaliMPickerModule { }
