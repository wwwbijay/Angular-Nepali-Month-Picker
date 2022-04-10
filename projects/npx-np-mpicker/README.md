# Angular Nepali Month Picker
A configurable Nepali Month Picker(Bikram Sambat) built for angular appilcations. Supports latest (Angular 13) version.


## Installation
```
npm install ngx-np-mpicker
```

## Usage
Import the `NepaliMPickerModule` in your app.module.ts

```
import { NepaliMPickerModule } from 'angular-nepali-datepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NepaliMPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
then use `<np-mpicker [(ngModel)]="nepaliDate"></np-mpicker>` in your template
```
<np-mpicker></np-mpicker>
```


### Note
This package has no dependancy.

### Format
The supported date format is yyyy-mm

### License
MIT License

