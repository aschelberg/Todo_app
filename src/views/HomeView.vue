<template>
  <div class="flex flex-col container">
    <FilterInput @getFilter="updateFilter" />
    <AddTodoInput @todoAdded="addTodo" class="container" />
    <ul>
      <TodoCard
        class="cursor-pointer hover:border-[1px] hover:border-white duration-150"
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @todoCompleted="completeTodo"
        @todoArchived="archiveTodo"
      />
    </ul>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import AddTodoInput from "../components/AddTodoInput.vue";
import FilterInput from "../components/FilterInput.vue";
import TodoCard from "../components/TodoCard.vue";
import { computed, ref, watch } from "vue";
import { uid } from "uid";

const filter = ref("all");
const updateFilter = (filterType) => {
  filter.value = filterType;
};

const savedTodos = ref([]);
if (localStorage.getItem("savedTodos")) {
  savedTodos.value = JSON.parse(localStorage.getItem("savedTodos"));
}

const filteredTodos = computed(() => {
  if (filter.value === "all") {
    return savedTodos.value;
  } else if (filter.value === "incomplete") {
    return savedTodos.value.filter((todo) => !todo.archived && !todo.completed);
  } else if (filter.value === "completed") {
    return savedTodos.value.filter((todo) => todo.completed);
  } else if (filter.value === "archived") {
    return savedTodos.value.filter((todo) => todo.archived);
  }
});

const addTodo = (todoText) => {
  const todoObj = {
    id: uid(),
    text: todoText,
    createdOn: dayjs(new Date()).format('MM/DD/YYYY'),
    completed: false,
    completedOn: null,
    archived: false,
    archivedOn: null,
    dueDate: null,
    description: "placeholder",
  };

  savedTodos.value.push(todoObj);
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};

const completeTodo = (id) => {
  const todo = savedTodos.value.find((t) => t.id === id);
  todo.completed = !todo.completed;

  todo.completedOn = dayjs(new Date()).format('MM/DD/YYYY');
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};

const archiveTodo = (id) => {
  const todo = savedTodos.value.find((t) => t.id === id);
  todo.archived = !todo.archived;

  todo.archivedOn = dayjs(new Date()).format('MM/DD/YYYY');
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};
</script>
