<template>
  <!-- Add list/completed/deleted icon for full list -->
  <div class="flex container gap-4 flex-1 justify-center text-2xl py-4 text-white">
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('all')"
      :class="{ showAll: filter === 'all' }"
    >
      All
    </button>
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('hideCompleted')"
      :class="{ hideCompleted: filter === 'hideCompleted' }"
    >
      Hide Completed
    </button>
    <button
      class="bg-todo-secondary hover:text-todo-secondary hover:bg-white focus:bg-white focus:text-black duration-150 cursor-pointer py-2 px-4 rounded-lg"
      @click="updateFilter('deleted')"
      :class="{ deleted: filter === 'deleted' }"
    >
      Deleted
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["getFilter"]);

const filter = ref("all")
const updateFilter = (filterType) => {
  filter.value = filterType
  emit("getFilter", filterType);
};
</script>
