<template>
 <section>
   <calendar @date-checked="captureDates" :weekends="weekends" :disable="['01-18-2019']"></calendar>
<!--    <pre>
     {{$data}}
   </pre> -->
 </section>
</template>

<script>
import calendar from "./components/calendar";
export default {
  components:{calendar},
  name: "app",
  data() {
    return {
      dates:null,
      weekends:false
    };
  },
  methods:{
    captureDates(dates){
      console.log(dates);
      this.dates = dates;
    }
  }
};
</script>

<style scoped>
*{
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section{
  width: 50vw;
}
</style>
