<template>
  <header class="flex flex-col justify-center sticky top-0 bg-todo-primary shadow-lg font-medium my-1">
    <nav
      class="container flex flex-col sm:flex-row items-center text-white gap-4 py-8"
    >
      <RouterLink
        :to="{ name: 'home' }"
      >
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-house text-2xl"></i>
          <p class="text-4xl">Todo List</p>
        </div>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup></script>