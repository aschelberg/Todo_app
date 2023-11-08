<template>
  <SiteNavigation />
  <div class="flex flex-col container">
    <FilterInput @getFilter="updateFilter" />
    <AddTodoInput @todoAdded="addTodo" class="container" />

    <ul class="container">
      <TodoCard
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @todoCompleted="completeTodo"
        @todoDeleted="deleteTodo"
      />
    </ul>
  </div>
</template>

<script setup>
import { useDateFormat } from "@vueuse/core";
import AddTodoInput from "../components/AddTodoInput.vue";
import FilterInput from "../components/FilterInput.vue";
import TodoCard from "../components/TodoCard.vue";
import { computed, ref, watch } from "vue";
import { uid } from "uid";
import SiteNavigation from "../components/SiteNavigation.vue";

const filter = ref("all");
const updateFilter = (filterType) => {
  filter.value = filterType;
};

const savedTodos = ref([]);
if (localStorage.getItem("savedTodos")) {
  savedTodos.value = JSON.parse(localStorage.getItem("savedTodos"));
}

// watch(savedTodos, () => {
//   localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
// });

const filteredTodos = computed(() => {
  if (filter.value === "all") {
    return savedTodos.value;
  } else if (filter.value === "hideCompleted") {
    return savedTodos.value.filter((todo) => !todo.completed);
  } else if (filter.value === "deleted") {
    return savedTodos.value.filter((todo) => todo.deleted);
  }
});

const addTodo = (todoText) => {
  const todoObj = {
    id: uid(),
    text: todoText,
    createdOn: useDateFormat(new Date(), "MMM DD, YYYY"),
    completed: false,
    completedOn: null,
    deleted: false,
    deletedOn: null,
  };

  savedTodos.value.push(todoObj);
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};

const completeTodo = (id) => {
  const todo = savedTodos.value.find((t) => t.id === id);
  todo.completed = !todo.completed;

  todo.completedOn = useDateFormat(new Date(), "MMM DD, YYYY");
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};

const deleteTodo = (id) => {
  const todo = savedTodos.value.find((t) => t.id === id);
  if (todo.deleted) {
    const todoIndex = savedTodos.value.findIndex((t) => t.id === id);
    savedTodos.value.splice(todoIndex, 1);
  }
  todo.deleted = true;

  todo.deletedOn = useDateFormat(new Date(), "MMM DD, YYYY");
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};
</script>
