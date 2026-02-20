<script setup>
  import DropCard from './DropCard.vue';
  import { Trash2 } from 'lucide-vue-next';

  defineProps({
    typeList: Array,
    taskList: Array,
    handleDrag: Function,
    showDropCard: Boolean,
    activeCard: Object,
    onDrop: Function,
    onDelete: Function
  });

  const emit = defineEmits(['setShowDropCard']);

  const handleDragEnd = () => {
    emit('setShowDropCard', false);
  };

  const getInitials = (name) => {
    if (typeof name !== 'string') return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  };

</script>

<template>
   <div class="type-wrapper" v-for="type in typeList" :key="type.id">
    <h3 class="text-xl font-semibold mb-4">{{ type.name }}</h3>
    <DropCard 
      :showDropCard="showDropCard"
      :activeCard="activeCard"
      :type="type"
      :onDrop="onDrop"
    />

    <div v-for="(task, index) in taskList" :key="task.id">
      <div
        class="task-card"
        v-if="task.type === type.status"
        @dragstart="handleDrag(task, index)"
        @dragend="handleDragEnd"
        @touchstart="handleDrag(task, index)"
        draggable="true"
      >
        <p>{{ task.title }}</p>
        <div class="asignee">
          <button type="button" @click="onDelete(task)" title="Delete Task">
            <span class="delete-icon"><Trash2 /></span>
          </button>
          <p :title="task.asignee">{{ getInitials(task.asignee) }}</p>
        </div>
      </div>
    </div>

    <DropCard 
      :showDropCard="showDropCard"
      :activeCard="activeCard"
      :type="type"
      :onDrop="onDrop"
    />
  </div>
</template>

<style>
  .type-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #e6e6e6;
    border: 1px solid #999;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 6px #b8b5b5;
  }

  .type-wrapper > h3 {
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }

  .task-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: white;
    border: 1px solid #999;
    border-radius: 12px;
    margin-bottom: 10px;
    cursor: grab;
    box-shadow: 0 4px #686868;
  }

  .task-card:active {
    cursor: grabbing;
    background: #8affff;
    animation: shake 0.5s infinite;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  .asignee {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .asignee > button {
    width: max-content;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 12px;
    background: #ff3323;
    font-weight: 600;
    cursor: pointer;
    color: white;
    box-shadow: 0 4px #999;
  }

  .delete-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }

  button:active {
    box-shadow: 0 1px #999;
    transform: translateY(4px);
  }

  .asignee > p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #999;
    border-radius: 50%;
    background: orange;
    font-size: 18px;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    .type-wrapper {
      width: calc(100% / 3);
    }
  }
</style>
