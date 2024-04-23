<template>
  <div>
    <Suspense>
      <EditTodo @editsAdded="updateEdits" />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";
import EditTodo from "../components/EditTodo.vue";

const savedTodos = ref([]);
if (localStorage.getItem("savedTodos")) {
  savedTodos.value = JSON.parse(localStorage.getItem("savedTodos"));
}

const updateEdits = (edits) => {
  const todo = savedTodos.value.find((t) => t.id === edits.id);
  todo.text = edits.title;
  todo.description = edits.description;
  todo.dueDate = moment(edits.dueDate).format("L");
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos.value));
};
</script>
