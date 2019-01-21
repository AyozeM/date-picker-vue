<template>
 <section>
   <h1>Susolandiaa</h1>
   <calendar></calendar>
 </section>
</template>

<script>
import calendar from "./components/calendar";
export default {
  components:{calendar},
  name: "app",
  data() {
    return {};
  },
  methods:{
    captureDates(dates){
      console.log(dates);

    }
  }
};
</script>
