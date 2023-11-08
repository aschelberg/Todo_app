<template>
  <li
    class="flex flex-row p-4 bg-todo-secondary text-white mb-3 container items-center gap-4 py-6 rounded-xl text-2xl"
  >
    <div class="flex flex-col" :class="{ greyOut : todo.deleted }">
      <div class="text-2xl max-sm:text-md">{{ todo.text }}</div>
      <div class="text-sm max-sm:hidden">Added: {{ todo.createdOn }}</div>
    </div>
    <div class="flex gap-4 flex-1 justify-end text-white text-4xl">
      <i
        class="fa-solid fa-check max-sm:text-sm text-todo-primary duration-50 cursor-pointer"
        :class="{ completed : todo.completed } "
        @click="completeTodo(todo)"
      ></i>
      <i
        class="fa-solid fa-trash max-sm:text-sm text-todo-primary duration-50 cursor-pointer"
        :class="{ deleted : todo.deleted }"
        @click="deleteTodo(todo)"
      ></i>
    </div>
  </li>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import moment from 'moment'

const props = defineProps({
  todo: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["todoCompleted", "todoDeleted"]);

const completeTodo = (todo) => {
  emit("todoCompleted", todo.id);
};

const deleteTodo = (todo) => {
  emit("todoDeleted", todo.id);
};
</script>

<style scoped>
.greyOut {
  text-decoration: line-through;
  color: grey;
  font-style:italic;
}
.completed {
  color: greenyellow;
  opacity: 1;
}
.deleted {
  color: red;
}
.hideButton {
  opacity: 0;
}
.hideButton:hover {
  opacity: 1;
}

</style>
