<template>
  <section>
    <b-row>
      <b-col class="text-center" @click="changeMonth(pastMonth)"><fa icon="angle-left"/></b-col>
      <b-col class="text-center">{{paintMonth.monthName()}} {{actualYear}}</b-col>
      <b-col class="text-center" @click="changeMonth(nextMonth)"><fa icon="angle-right"/></b-col>
    </b-row>
    <b-row>
      <b-col v-for="(name,i) in daysName" :key="i" class="border text-center" :class="{'text-danger': name == daysName[6]}">{{name}}</b-col>
    </b-row>
    <b-row  v-for="(week,i) in paintMonth.weeks" :key="i">
        <b-col v-for="(day,key,y) in week" :key="y+Math.random()"
        class="border text-center day"
        :class="{'text-danger':key == 'sunday','bg-secondary':day == null,'border-secondary':day == null,'range':day != null && middleDates.includes(day.getTime()),'rangeExtreme':day != null && selectedDates.includes(day.getTime()),}"
        @click="selectDate(day)">
          <span v-if="day != null">{{day.getDate()}}</span>
        </b-col>
    </b-row>
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
  .bg-secondary {
    background-color: #e4e5e6 !important;
  }
  .border-secondary {
    border-color: #e4e5e6 !important;
  }
  .day:hover {
    background-color: var(--primary);
    color: var(--light);
  }
  .rangeExtreme{
    background-color: var(--primary);
    color:var(--light);
    border-color: var(--primary) !important;
  }
  .range{
    background-color: var(--info);
    color:var(--light);
    border-color: var(--info) !important;
  }
</style>
