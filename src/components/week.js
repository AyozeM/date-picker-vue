export default class week {
  constructor() {
    this.monday = null;
    this.tuesday = null;
    this.wednesday = null;
    this.thursday = null;
    this.friday = null;
    this.saturday = null;
    this.sunday = null;
  }
  setdate(date, day) {
    let d = day - 1;
    this[Object.keys(this)[d < 0 ? 6 : d]] = date;
  }
  contains(date) {
    return Object.values(this).includes(date);
  }
}
