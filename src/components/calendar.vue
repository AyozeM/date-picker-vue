<template>
  <section>
    <header class="row">
      <div class="col text-center button"  @click="changeMonth(pastMonth)">&#60;</div>
      <div class="col text-center">{{actualYear}}</div>
      <div class="col text-center button" @click="changeMonth(nextMonth)">&#62;</div>
    </header>
    <div class="row">
      <div class="col text-center" v-for="(name,i) in daysName" :key="i" :class="{'danger': name == daysName[6]}">{{name}}</div>
    </div>
    <div class="row" v-for="(week,i) in paintMonth.weeks" :key="i">
      <div class="col text-center day" v-for="(day,key,y) in week" :key="y+Math.random()"
        :class="{'danger': key == 'sunday', 'disable':day == null,'range':day != null && middleDates.includes(day.getTime()),'rangeExtreme':day != null && selectedDates.includes(day.getTime()),}"
        @click="selectDate(day)">
          <span v-if="day != null">{{day.getDate()}}</span>
      </div>
    </div>
  </section>
</template>
<script>
import month from "./month";
export default {
  created() {
    let aux = new Date();
    this.actualMonth = aux.getMonth();
    this.actualYear = aux.getFullYear();
  },
  data() {
    return {
      daysName: ["L", "M", "W", "J", "V", "S", "D"],
      actualMonth: null,
      actualYear: null,
      selectedDates: [],
      middleDates:[]
    };
  },
  methods: {
    changeMonth(month) {
      this.actualMonth = month;
    },
    selectDate(date) {
      if(this.selectedDates.length > 1){
        this.selectedDates = [];
      }
      this.selectedDates.push(date.getTime());
      if(this.selectedDates.length > 1){
        this.middleDates = this.paintMonth.daysBetween(this.selectedDates);
      }else{
        this.middleDates = [];
      }
      this.$emit('date-checked',this.selectedDates.map(e=>new Date(e)));
    }
  },
  computed: {
    paintMonth() {
      return new month(this.actualMonth, this.actualYear);
    },
    nextMonth() {
      let auxMonth;
      if (this.actualMonth == 11) {
        auxMonth = 0;
        this.actualYear++;
      } else {
        auxMonth = this.actualMonth + 1;
      }
      return auxMonth;
    },
    pastMonth() {
      let auxMonth;
      if (this.actualMonth == 0) {
        auxMonth = 11;
        this.actualYear--;
      } else {
        auxMonth = this.actualMonth - 1;
      }
      return auxMonth;
    }
  }
};
</script>
<style scoped>
  section{
    --primary:#007BFF;
    --light:#F8F9FA;
    --info:#17A2B8;
    --danger:#DC3545;
    --secondary:#e4e5e6;
  }
  .bg-secondary {
    background-color:var(--secondary);
  }
  .border-secondary {
    border-color: var(--secondary);
  }
  .day:not(.disable):hover {
    background-color: var(--primary);
    color: var(--light);
  }
  .disable{
    background-color:var(--secondary);
    border-color: var(--secondary);
  }
  .rangeExtreme{
    background-color: var(--primary);
    color:var(--light);
    border-color: var(--primary);
  }
  .range{
    background-color: var(--info);
    color:var(--light);
    border-color: var(--info);
  }
  .day,.button{
    cursor: pointer;
  }
  .danger{
    color:var(--danger)
  }

  .row{
    display:flex;
  }
  .col{
    flex-basis: calc(100%/7);
    padding: 1%;
  }
  header .col{
    flex-grow: 1;
  }
  .text-center{
    text-align:center;
  }
</style>
