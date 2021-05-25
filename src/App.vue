<template>
  <Task :tasks="tasks" />
</template>

<script>
import Task from "./components/Task.vue";
const baseUrl = "http://localhost:3000/todo/";
import axios from "axios";

export default {
  name: "App",
  components: {
    Task,
  },
  data() {
    return {
      tasks: {},
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      const response = await axios.get(baseUrl + "get");
      this.tasks = response?.data ?? [];
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
