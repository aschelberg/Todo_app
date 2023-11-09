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
import EditTodo from "../components/EditTodo.vue";
import { computed, ref, watch } from "vue";
import { uid } from "uid";
import moment from "moment";

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
    return savedTodos.value.filter((todo) => !todo.deleted && !todo.completed);
  } else if (filter.value === "completed") {
    return savedTodos.value.filter((todo) => todo.completed);
  } else if (filter.value === "deleted") {
    return savedTodos.value.filter((todo) => todo.deleted);
  }
});

const addTodo = (todoText) => {
  const todoObj = {
    id: uid(),
    text: todoText,
    createdOn: moment().format(),
    completed: false,
    completedOn: null,
    deleted: false,
    deletedOn: null,
    dueDate: null,
    description: "placeholder",
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
  todo.deleted = !todo.deleted;

  todo.deletedOn = useDateFormat(new Date(), "MMM DD, YYYY");
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};
</script>
