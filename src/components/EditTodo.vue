<template>
  <div
    class="flex flex-col container bg-gray-600 rounded-md p-4 m-auto w-[75%] h-[50%] gap-4"
  >
    <!-- title -->
    <div class="flex flex-col text-white text-2xl mb-4 w-full gap-1">
      <h2 class="flex-1 text-white text-xl">Edit todo title: </h2>
      <input type="text" id="newTitle" name="newTitle" class="rounded-[4px] px-2 py-1 text-black" v-model="todoTitle"/>
    </div>
    <!-- description -->
    <div class="flex flex-col gap-1 pb-3">
      <p class="text-white text-xl">Enter description below:</p>
      <textarea
        name="newBody"
        id="newBody"
        cols="30"
        rows="3"
        class="rounded-[4px] px-2 py-1"
        v-model="todoDescription"
      >
      </textarea>
    </div>
    <!-- dueDate -->
    <div class="flex flex-col justify-between gap-1">
      <label for="due" class="text-white items-center text-xl">Due Date:</label>
      <input
        type="date"
        id="due"
        name="due-date"
        class="text-xl rounded-md px-2 py-1"
        v-model="todoDueDate"
      />
    </div>
    <!-- submit element -->
    <button
      class="bg-todo-secondary text-white hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer mt-4 py-2 px-4 rounded-lg"
      @click="setTodoEdits()"
    >
      Submit
    </button>

    <!-- delete button element -->
    <button
      class=" text-white bg-red-500 hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer mt-2 py-2 px-4 rounded-lg"
      @click="removeTodo()"
    >
      Remove
    </button>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useDateFormat } from "@vueuse/shared";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import moment from 'moment'
const route = useRoute();
const router = useRouter();

const savedTodos = ref([])
const currentTodo = ref([])
if (localStorage.getItem("savedTodos")) {
  savedTodos.value = JSON.parse(localStorage.getItem("savedTodos"));
  currentTodo.value = savedTodos.value.find((t) => t.id === route.params.id)
}

const todoTitle = ref(currentTodo.value.text)
const todoDescription = ref(currentTodo.value.description);
const todoDueDate = ref(currentTodo.value.dueDate);

const setTodoEdits = () => {
  const todo = savedTodos.value.find((t) => t.id === route.params.id);
  todo.text = todoTitle.value;
  todo.description = todoDescription.value;
  todo.dueDate = todoDueDate.value
  
  localStorage.setItem('savedTodos',JSON.stringify(savedTodos.value));
  router.push({
    name: "home",
  });
};

const removeTodo = () => {
  const todoIndex = savedTodos.value.findIndex((t) => t.id === route.params.id);
  savedTodos.value.splice(todoIndex, 1)
  localStorage.setItem('savedTodos',JSON.stringify(savedTodos.value));
  router.push({
    name: "home",
  })
}
</script>
