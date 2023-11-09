<template>
  <li
    class="flex flex-row p-4 bg-todo-secondary text-white mb-3 container items-center gap-2 py-3 rounded-xl text-2xl"
  >
    <div
      class="flex flex-col flex-1"
      :class="{ greyOut: todo.deleted }"
      @click="goToTodoView(todo)"
    >
      <div class="text-2xl max-sm:text-sm">{{ todo.text }}</div>
      <div class="text-sm max-sm:text-xs">
        Created: {{ moment(todo.createdOn).fromNow() }}
      </div>
      <!-- <div class="text-sm max-sm:text-xs">
        Due: {{ moment(todo.dueDate).format('L') }}
      </div> -->
    </div>
    <div class="flex gap-4 justify-end text-white text-4xl pr-2">
      <i
        class="fa-solid fa-check max-sm:text-sm text-todo-primary duration-50 cursor-pointer"
        :class="{ completed: todo.completed }"
        @click="completeTodo(todo)"
      ></i>
      <i
        class="fa-solid fa-trash max-sm:text-sm text-todo-primary duration-50 cursor-pointer"
        :class="{ deleted: todo.deleted }"
        @click="deleteTodo(todo)"
      ></i>
    </div>
  </li>
</template>

<script setup>
import moment from "moment";
import { useRouter } from "vue-router";

const props = defineProps({
  todo: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["todoCompleted", "todoDeleted", "goToEditView"]);

const completeTodo = (todo) => {
  emit("todoCompleted", todo.id);
};

const deleteTodo = (todo) => {
  emit("todoDeleted", todo.id);
};

const router = useRouter();
const goToTodoView = (todo) => {
  router.push({
    name: "todoView",
    query: {
      title: todo.text,
      id: todo.id,
      description: todo.description,
      dueDate: todo.dueDate,
    },
  });
};
</script>

<style scoped>
.greyOut {
  text-decoration: line-through;
  color: grey;
  font-style: italic;
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
