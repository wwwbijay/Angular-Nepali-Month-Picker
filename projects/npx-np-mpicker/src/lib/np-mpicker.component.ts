import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  Input,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';
import { NpMPickerService } from './np-mpicker.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  NepaliDate,
  MonthData,
  DaysMapping,
  MonthMapping,
  DateFormatter,
} from './types';
import { daysMapping, monthsMapping } from './mapping';

@Component({
  selector: 'np-mpicker',
  templateUrl: './np-mpicker.component.html',
  styleUrls: ['./np-mpicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NpMPickerComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NpMPickerComponent implements OnInit, ControlValueAccessor {
  nepaliDateToday: NepaliDate = { month: 0, year: 0 };
  currentNepaliDate: NepaliDate = { month: 0, year: 0 };
  selectedDate!: NepaliDate;
  formattedDate = '';
  currentDate: any;

  displayDate!: string;

  years: number[] = [];

  currentMonthData!: any;

  daysMapping: DaysMapping = daysMapping;

  monthsMapping: MonthMapping = monthsMapping;

  isOpen = false;

  hideInput = false;

  alwaysVisible = false;

  @Input()
  theme!: string;

  @Input()
  language: 'en' | 'ne' = 'ne';

  @Input() hasFuture: Boolean = true;

  @Input() format: string = 'yy-mm-dd';

  monthDisplayType: 'default' | 'modern' | 'short' = 'default';

  dayDisplayType: 'default' | 'short' = 'short';

  monthFormatter: DateFormatter = (selectedDate: NepaliDate) => {
    
    const mm =
      selectedDate.month < 10
        ? '0' + (selectedDate.month + 1)
        : selectedDate.month + 1;

     switch(this.format){
      case 'dd-mm-yy':
        return `$${mm}/${this.selectedDate.year}`;
      default:
        return `${this.selectedDate.year}/${mm}`;
    }   
  };

  initialized: boolean = false;

  yearSelector: Boolean = false;
  monthSelector: Boolean = true;

  ysStartYear: any;
  ysEndYear: any;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  constructor(
    public _nepaliDate: NpMPickerService,
    private eRef: ElementRef
  ) {
    this.currentDate = new Date();
    this.nepaliDateToday = _nepaliDate.engToNepDate(
      this.currentDate.getDate(),
      this.currentDate.getMonth(),
      this.currentDate.getFullYear()
    );
  }

  ngOnInit() {
    this.setCurrentDate();
    this.ysStartYear = this.currentNepaliDate.year - 10;
    this.ysEndYear = this.currentNepaliDate.year + 9;
    this.populateYears();
  }

  populateYears() {
    this.years = [];
    for (let i = this.ysStartYear; i <= this.ysEndYear; i++) {
      this.years.push(i);
    }
  }
  selectYear(e: any) {
    this.currentNepaliDate.year = this.ysStartYear + e;

    const newDate = {
      day: 1,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };

    this.currentDate = this._nepaliDate.nepToEngDate(
      1,
      newDate.month,
      newDate.year
    );
    
    this.gotoMonthSelector();
  }

  formatMonthValue() {
    if (this.selectedDate) {
      this.formattedDate = this.monthFormatter(this.selectedDate);
    }
  }
  propagateChange = (_: any) => {};
  propagateTouch = (_: any) => {};
  writeValue(value: any) {
    this.propagateChange(this.selectedDate);
    if (value) {
      this.selectedDate = value;
      this.currentNepaliDate = value;
      this.formatMonthValue();
    }
  }
  registerOnTouched() {}
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  setCurrentDate() {
    if (!this.selectedDate) {
      this.currentNepaliDate = this._nepaliDate.engToNepDate(
        this.currentDate.getDate(),
        this.currentDate.getMonth(),
        this.currentDate.getFullYear()
      );
    } else {
      const { month, year } = this.selectedDate;
      this.currentNepaliDate = this._nepaliDate.engToNepDate(1 , month, year);
      this.currentDate = this._nepaliDate.nepToEngDate(
        this.selectedDate.year,
        this.selectedDate.month,
        1
      );
    }
  }


  selectMonthYear(month: number) {
    this.selectedDate = { ...this.currentNepaliDate, month };
    this.formatMonthValue();
    this.close();
    this.propagateChange(this.selectedDate);
  }

  prevMonth() {
    if (this.currentNepaliDate.month <= 0) {
      this.currentNepaliDate.month = 11;
      this.currentNepaliDate.year--;
    } else {
      this.currentNepaliDate.month--;
    }

    const newNepaliDate = {
      day: 1,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };
    this.currentDate = this._nepaliDate.nepToEngDate(
      newNepaliDate.day,
      newNepaliDate.month,
      newNepaliDate.year
    );


  }

  nextMonth() {
    if (this.currentNepaliDate.month >= 11) {
      this.currentNepaliDate.month = 0;
      this.currentNepaliDate.year++;
    } else {
      this.currentNepaliDate.month++;
    }

    const newDate = {
      day: 1,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };
    this.currentDate = this._nepaliDate.nepToEngDate(
      newDate.day,
      newDate.month,
      newDate.year
    );

  }


  prevYear() {
    if (this.currentNepaliDate.year <= 2001) {
      this.currentNepaliDate.year = 2001;
    } else {
      this.currentNepaliDate.year--;
    }

    const newNepaliDate = {
      day: 1,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };
    this.currentDate = this._nepaliDate.nepToEngDate(
      newNepaliDate.day,
      newNepaliDate.month,
      newNepaliDate.year
    );


  }

  nextYear() {
    if (this.currentNepaliDate.month >= 2099) {
      this.currentNepaliDate.year = 2099;
    } else {
      this.currentNepaliDate.year++;
    }

    const newDate = {
      day: 1,
      month: this.currentNepaliDate.month,
      year: this.currentNepaliDate.year,
    };
    this.currentDate = this._nepaliDate.nepToEngDate(
      newDate.day,
      newDate.month,
      newDate.year
    );

  }
  prevYearRange(){
    let start = this.ysStartYear - 20
    this.ysEndYear =  this.ysEndYear - 20;

    if (start <= 2001) {
      this.ysStartYear = 2001;
      this.ysEndYear =  2001 + 19;
    } else {
      this.ysStartYear = start;
    }

    this.populateYears();
  }

  nextYearRange(){
    let start = this.ysStartYear + 20
    let end =  this.ysEndYear + 20;

    if (end >=  2099) {
      this.ysEndYear = 2099;
      this.ysStartYear =  2099 - 19;
    } else {
      this.ysStartYear = start;
      this.ysEndYear = end;
    }
    this.populateYears();
  }

  toggleOpen() {
    if (!this.alwaysVisible) {
      this.isOpen = !this.isOpen;
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    //this.setCurrentDate();
  }

  gotoYearSelector(){
    this.yearSelector = true;
    this.monthSelector = false;
  }
  gotoMonthSelector(){
    this.yearSelector = false;
    this.monthSelector = true;
  }
}
