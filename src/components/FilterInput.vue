<template>
  <!-- Add list/completed/deleted icon for full list -->
  <div class="flex container flex-1 gap-4 justify-center text-2xl py-4 text-white w-[75%] max-sm:flex-col max-sm:text-sm">
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('all')"
      
      :class="{ showAll: filter === 'all' }"
    >
      All
    </button>
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('incomplete')"
      :class="{ showAll: filter === 'incomplete' }"
    >
      Incomplete
    </button>
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('completed')"
      :class="{ hideCompleted: filter === 'completed' }"
    >
      Completed
    </button>
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('archived')"
      :class="{ archived: filter === 'archived' }"
    >
      Archived
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filter = ref('all')
const updateFilter = (filterType) => {
  emit("getFilter", filterType);
};

const emit = defineEmits(["getFilter"]);
</script>
