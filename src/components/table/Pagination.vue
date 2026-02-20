<template>
  <div class="flex items-center gap-2 mt-4 flex-wrap">
    <!-- Prev -->
    <button
      class="px-3 py-1 border rounded"
      :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
    >
      Prev
    </button>

    <!-- Page Numbers -->
    <template v-for="(page, index) in pages" :key="index">
      <span
        v-if="page === '...'"
        class="px-3 py-1 text-gray-500"
      >
        ...
      </span>

      <button
        v-else
        @click="changePage(page)"
        class="px-3 py-1 border rounded"
        :class="
          page === currentPage
            ? 'bg-blue-500 text-white'
            : 'hover:bg-gray-100'
        "
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button
      class="px-3 py-1 border rounded"
      :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  siblingCount: {
    type: Number,
    default: 1, // halaman di kiri & kanan current
  },
});

const emit = defineEmits(["page-change"]);

function changePage(page) {
  emit("page-change", page);
}

/**
 * Generate pagination with ellipsis
 */
const pages = computed(() => {
  const pages = [];
  const { currentPage, totalPages, siblingCount } = props;

  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  // First page
  if (leftSibling > 1) {
    pages.push(1);
  }

  // Left ellipsis
  if (leftSibling > 2) {
    pages.push("...");
  }

  // Middle pages
  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  // Right ellipsis
  if (rightSibling < totalPages - 1) {
    pages.push("...");
  }

  // Last page
  if (rightSibling < totalPages) {
    pages.push(totalPages);
  }

  return pages;
});
</script>
