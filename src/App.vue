<template>
 <section>
   <calendar @date-checked="captureDates"></calendar>
   <pre>
     {{$data}}
   </pre>
 </section>
</template>

<script>
import calendar from "./components/calendar";
export default {
  components:{calendar},
  name: "app",
  data() {
    return {
      dates:null
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
section{
  width: 50vw;
}
</style>
