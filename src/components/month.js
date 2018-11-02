import week from './week';

export default class month {
  constructor(month, year) {

    this.allMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    this.month = month;
    this.year = year;
    this.lastDate = this.lastdate();
    this.weeks = [];
    this.completeMonth();
  }
  updateMonth() {
    this.weeks = [];
    this.completeMonth();
  }

  completeMonth() {
    let actualweek = new week();
    for (let i = 1; i <= this.lastDate; i++) {
      let auxDate = new Date(`${this.month + 1}-${i}-${this.year}`);
      actualweek.setdate(auxDate, auxDate.getDay());
      if (auxDate.getDay() == 0) {
        this.weeks.push(actualweek);
        actualweek = new week();
      }
    }
    if (!this.weeks[this.weeks.length - 1].contains(this.lastDate)) {
      this.weeks.push(actualweek);
    }
  }

  lastdate() {
    let date;
    switch (this.month) {
      case 1:
        date =
          this.year % 4 && (this.year % 100 != 0 || this.year % 400 == 0)
            ? 29
            : 28;
        break;
      case 3: case 5: case 8: case 10:
        date = 30;
        break;
      default:
        date = 31;
        break;
    }
    return date;
  }

  monthName() {
    return this.allMonths[this.month]
  }
}
