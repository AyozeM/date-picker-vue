<template>
  <b-container>
    <calendar @date-checked="captureDates"></calendar>
  </b-container>
</template>

<script>
import calendar from "./components/calendar";
export default {
  components: { calendar },
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
