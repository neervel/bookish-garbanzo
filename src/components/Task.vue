<template>
<div class="allTasks">
  <div class="task" v-for="task in tasks" :key="task['id']">
      <h1 class="task__title">{{task['title']}}</h1>
      <p class="task__desc">Description: {{task['description']}}</p>
      <span>IsComplete: {{task['isComplete']}}</span>
      <p class="task__id">ID: {{task['_id']}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    tasks: Object,
  }
}
</script>