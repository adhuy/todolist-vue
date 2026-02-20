<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">User Table</h2>

    <div className="overflow-auto rounded-2xl border border-gray-300">
      <table class="w-full">
        <thead class="bg-gray-100 rounded-lg">
          <tr>
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Nama</th>
            <th class="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="user in users" :key="user.id">
            <td class="border px-4 py-2">{{ user.id }}</td>
            <td class="border px-4 py-2">{{ user.name }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="mt-4 text-gray-500">
      Loading data...
    </div>

    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :sibling-count="2"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUsers } from "../../api/fakeApi";
import Pagination from "./Pagination.vue";

const users = ref([]);
const loading = ref(false);

const currentPage = ref(1);
const limit = 10;
const totalPages = ref(1);

async function loadData(page = 1) {
  loading.value = true;

  const res = await fetchUsers(page, limit);

  users.value = res.data;
  totalPages.value = Math.ceil(res.total / limit);
  currentPage.value = page;

  loading.value = false;
}

function handlePageChange(page) {
  loadData(page);
}

onMounted(() => loadData());
</script>
