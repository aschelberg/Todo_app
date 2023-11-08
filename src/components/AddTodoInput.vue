<template>
  <main class="flex flex-col container text-white font-medium">
    <form class="flex pt-4 mb-8" @submit.prevent="addTodo">
      <input
        type="text"
        name="text"
        v-model="todoText"
        placeholder="Enter a new Todo"
        class="flex flex-1 py-2 px-1 bg-transparent border-b text-2xl w-full focus:outline-none"
      />
      <button
        class="py-2 px-1 border-b text-2xl hover:text-todo-secondary hover:rounded-md duration-150 cursor-pointer"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["todoAdded"])

const todoText = ref("");
const addTodo = () => {
  if (!todoText.value) {
    return
  };
  emit("todoAdded", todoText.value)
  todoText.value = ""
};

</script>