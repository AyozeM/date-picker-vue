import week from './week';

export default class month {
  /**
   * Crea un nuevo mes
   * @param {Number} month numero del mes menos uno (formato array)
   * @param {Number} year Año del que se quiere el mes, formato de 4 numeros
   */
  constructor(month, year, weekends = true) {
    this.allMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    this.month = month;
    this.year = year;
    this.lastDate = this.lastdate();
    this.weeks = [];
    this.weekends = weekends;
    this.completeMonth();
  }

  /**
   * Actualiza las semanas del mes actual
   */
  updateMonth() {
    this.weeks = [];
    this.completeMonth();
  }

  /**
   * Rellena las semanas del mes actual
   */
  completeMonth() {
    let actualweek = new week(this.weekends);
    for (let i = 1; i <= this.lastDate; i++) {
      let auxDate = new Date(`${this.month + 1}-${i}-${this.year}`);
      actualweek.setdate(auxDate, auxDate.getDay());

      if (auxDate.getDay() == 0) {
        this.weeks.push(this.clearWeekends(actualweek));
        actualweek = new week(this.weekends);
      }
    }
    if (!this.weeks[this.weeks.length - 1].contains(this.lastDate)) {
      this.weeks.push(this.clearWeekends(actualweek));
    }
  }

  clearWeekends(week){
    if(!this.weekends){
      delete(week.saturday);
      delete(week.sunday);
    }
    return week;
  }
  /**
   * Obtiene el total de dias de un mes concreto
   * @param {Number} month numero del mes menos uno (formato array)
   */
  lastdate(month = this.month) {
    let date;
    switch (month) {
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

  /**
   * Obtiene el nombre del mes
   */
  monthName() {
    return this.allMonths[this.month]
  }

  /**
   * Obtiene el dia siguiente a la fecha especificada
   * @param {Date} date fecha
   */
  nextDate(date) {
    let m = date.getMonth();
    let y = date.getFullYear();
    let tmd = this.lastdate(m);
    let d = date.getDate();
    if (d + 1 > tmd) {
      d = 1;
      m ++;
    } else {
      d++;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    return new Date(`${m+1}/${d}/${y}`);
  }


  /**
   * Obtiene la lista de dias entre dos fechas
   * @param {Array} dates rango de fechas en ms
   */
  daysBetween(dates) {
    dates = dates.sort().map(e => new Date(e));
    let x = this.nextDate(dates[0]);
    let actualMonth = x.getMonth();
    let actualYear = x.getFullYear();
    let middleDates = [];
    let initDate = x.getDate();
    let totalDates = actualMonth != dates[1].getMonth() ? this.lastdate(dates[0].getMonth()) : dates[1].getDate();

    for (let i = initDate; i <= totalDates; i++) {
      middleDates.push(new Date(`${actualMonth + 1}/${i}/${actualYear}`))
      if (i == totalDates && actualMonth != dates[1].getMonth()) {
        i = 0;
        actualMonth++;
        if (actualMonth > 11) {
          actualMonth = 0
          actualYear++;
        }
        totalDates = actualMonth != dates[1].getMonth() ? this.lastdate(actualMonth) : dates[1].getDate();
      }
    }
    middleDates.pop();
    return middleDates.map(e => e.getTime());
  }
}
