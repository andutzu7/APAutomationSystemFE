import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  months!: string[];
  years!: string[];
  @Output() newItemEvent = new EventEmitter<string>();
  selectedMonth!: string;
  selectedYear!: number;

  ngOnInit() {
    this.months = Array.from({ length: 12 }, (_, i) => new Date(0, i + 1, 0).toLocaleString('default', { month: 'long' }));

    const now = new Date();
    const startYear = now.getFullYear();
    this.selectedMonth = now.toLocaleString('default', { month: 'long' });
    this.selectedYear = startYear;
    this.years = Array.from({ length: 3 }, (_, i) => new Date(startYear - i + 1, 0, 0).toLocaleString('default', { year: 'numeric' }));
  }

  emitValueChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (this.months.includes(selectElement.value)) {
        const converted_month:string= this.convertMonthStringToNumeric(selectElement.value);
        this.newItemEvent.emit(converted_month);
    }
    else {
      if (this.years.includes(selectElement.value)) {
        this.newItemEvent.emit(selectElement.value);
      }
    }

  }
  convertMonthStringToNumeric(monthString: string): string{
    const months: { [key: string]: string} = {
      "January": '1',
      "February": '2',
      "March": '3',
      "April": '4',
      "May": '5',
      "June": '6',
      "July": '7',
      "August": '8',
      "September": '9',
      "October": '10',
      "November": '11',
      "December": '12',
    }
    return months[monthString];
  }

}

