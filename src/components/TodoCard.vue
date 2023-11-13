<template>
  <li
    class="flex flex-row p-4 bg-todo-secondary text-white mb-3 container items-center gap-2 py-3 rounded-xl text-2xl"
  >
    <div
      class="flex flex-col flex-1 justify-between"
      :class="{ greyOut: todo.completed }"
      @click="goToTodoView(todo)"
    >
      <div class="flex text-2xl max-sm:text-sm">{{ todo.text }}</div>
      <div class="text-sm max-sm:text-xs">
        Created: {{ todo.createdOn }}
      </div>
      <!-- <div class="text-sm max-sm:text-xs">
        Due: {{ todo.dueDate }}
      </div> -->
    </div>
    <div class="flex gap-4 justify-end text-white text-4xl pr-2">
      <i
        class="fa-solid fa-check max-sm:text-sm text-todo-primary duration-50 cursor-pointer"
        :class="{ completed: todo.completed }"
        @click="completeTodo(todo)"
      ></i>
      <i
        class="fa-solid fa-box-archive max-sm:text-sm text-todo-primary duration-50 cursor-pointer"
        :class="{ archived: todo.archived }"
        @click="archiveTodo(todo)"
      ></i>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  todo: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["todoCompleted", "todoArchived", "goToEditView"]);

const completeTodo = (todo) => {
  emit("todoCompleted", todo.id);
};

const archiveTodo = (todo) => {
  emit("todoArchived", todo.id);
};

const router = useRouter();
const goToTodoView = (todo) => {
  router.push({
    name: `todoView`,
    params: { id: todo.id },
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
.archived {
  color: blue;
}
.hideButton {
  opacity: 0;
}
.hideButton:hover {
  opacity: 1;
}
</style>
