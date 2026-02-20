<script setup>
  import Layout from '../components/LayoutPage.vue';
  import DataTable from '../components/table/DataTable.vue';
</script>

<template>
  <Layout>
    <template #body>
      <section class="section-wrapper">
        <DataTable />
      </section>
    </template>
  </Layout>
</template>