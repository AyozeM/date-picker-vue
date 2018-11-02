<template>
  <b-container>
    <calendar></calendar>
  </b-container>
</template>

<script>
import calendar from "./components/calendar";
export default {
  components: { calendar },
  name: "app",
  data() {
    return {};
  }
};
</script>
