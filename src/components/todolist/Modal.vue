<script setup>
  defineProps({
    isPopUp: Object,
    onDelete: Function
  });
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <h3 class="mb-4">Are you sure you want to delete this task?</h3>
      <p>title : {{ isPopUp?.title }}</p>
      <p>type : {{ isPopUp?.type }}</p>
      <p>asignee : {{ isPopUp?.asignee }}</p>
      <div class="flex justify-end gap-4 mt-4 ">
        <button @click="isPopUp.status = false" class="cancel-button">Cancel</button>
        <button @click="onDelete(isPopUp.id); isPopUp.status = false" class="delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #475569b3;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }

  .modal-content {
    max-width: fit-content;
    background-color: white;
    opacity: 100;
    padding: 28px;
    margin: auto;
    border-radius: 12px;
  }

  .cancel-button {
    width: max-content;
    padding: 8px;
    border: 1px solid gray;
    border-radius: 12px;
    background: #f2f2f2;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px #999;
  }

  .delete-button {
    width: max-content;
    padding: 8px;
    border: 1px solid gray;
    border-radius: 12px;
    background: #ff3323;
    color: white;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px #999;
  }
</style>
