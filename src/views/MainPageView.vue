<script setup>
  import Layout from '../components/LayoutPage.vue';
  /* import TodoListView from './TodoListView.vue'; */
</script>

<template>
  <Layout>
    <template #header>
      <div class="navbar-wrapper">
        <nav>
          <RouterLink to="/" class="link">Home</RouterLink>
          <RouterLink to="/blog" class="link">Blog</RouterLink>
          <RouterLink to="/todo-list" class="link">To do List</RouterLink>
          <RouterLink to="/list" class="link">List</RouterLink>
        </nav>
      </div>
    </template>
  </Layout>
  <!-- <TodoListView/> -->
</template>

<style scoped>
  .navbar-wrapper {
    display: flex;
    justify-content: center;
    gap: 24px;
    min-width: 760px;
    background: #4e4b4b;
    padding: 12px;
    border-radius: 40px;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    box-shadow: 0 5px gray;
  }

  nav {
    display: flex;
    gap: 1em;
    font-size: 24px;
    line-height: 32px;
  }

  .link {
    color: white;
    text-decoration: none;
  }
</style>