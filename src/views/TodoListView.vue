<script setup>
  import { reactive, ref, watch } from 'vue';
  import Layout from '../components/LayoutPage.vue';
  import TaskFormVue from '../components/todolist/TaskForm.vue';
  import TaskList from '../components/todolist/TaskList.vue';
  import Modal from '../components/todolist/Modal.vue';
  import Snackbar from '../elements/common/snackbar/Snackbar.vue';
  import { typeList } from '../constant/todolist';

  const taskForm = reactive({
    title: '',
    type: '',
    asignee: '',
  });

  const isSnackbar = ref({});
  const isPopUp = ref({});

  // show form
  const isCreate = ref(false);

  const handleShowForm = () => {
    isCreate.value = !isCreate.value;
    taskForm.title = '';
    taskForm.type = '';
    taskForm.asignee = '';
  };
  // end show form

  // create task
  const data = localStorage.getItem('tasks');
  const taskList = ref(data ? JSON.parse(data) : []);

  const handleSubmit = () => {
    const payload = {
      id: taskList.value.length + 1,
      title: taskForm.title,
      type: taskForm.type,
      asignee: taskForm.asignee,
    };

    taskList.value.push(payload);
    taskForm.title = '';
    taskForm.type = '';
    taskForm.asignee = '';
    isCreate.value = false;

    isSnackbar.value = {
      status: true,
      color: '#81ff71',
      message: 'Task Successfully Created',
    };
  };
  // end create task

  // delete task
  const handleDelete = (param) => {
    isPopUp.value = { ...param, status: true };
  };

  const onDelete = (id) => {
    const newTaskList = taskList.value.filter((task) => task.id !== id);
    taskList.value = newTaskList;

    isSnackbar.value = {
      status: true,
      color: '#81ff71',
      message: 'Task Successfully Deleted',
    };
  };

  // drag and drop
  const activeCard = ref(null);
  const showDropCard = ref(false);

  const handleDrag = (param, position) => {
    activeCard.value = { id: param.id, status: param.type, position };
    showDropCard.value = true;
  };

  const onDrop = (type, position) => {
    const taskToMove = taskList.value[position];
    const newTaskList = taskList.value.filter((_, index) => index !== position);

    newTaskList.splice(position, 0, {...taskToMove, type});
    taskList.value = newTaskList;
    showDropCard.value = false;
  };
  // end drag and drop

  watch(taskList, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));

    setTimeout(() => {
      isSnackbar.value = {...isSnackbar.value, status: false};
    }, 3000);
  }, { deep: true });

</script>

<template>
  <Layout>
    <template #body>
      <section class="wrapper">
        <div class="header-wrapper">
          <div v-if="!isCreate" class="header-content">
            <h1 class="text-2xl font-semibold mb-4">To do List</h1>
            <button type="button" class="add-button" @click="handleShowForm">Create</button>
          </div>
          <div class="input-wrapper" v-else>
            <TaskFormVue v-model="taskForm" :handleShowForm="handleShowForm" :handleSubmit="handleSubmit" />
          </div>
          <div v-if="isSnackbar?.status">
            <Snackbar :param="isSnackbar" />
          </div>
        </div>

        <div class="body-content">
          <TaskList
            :typeList="typeList"
            :taskList="taskList"
            :handleDrag="handleDrag"
            :showDropCard="showDropCard"
            :activeCard="activeCard"
            :onDrop="onDrop"
            :onDelete="handleDelete"
            @setShowDropCard="showDropCard = $event"
          />
        </div>

        <div v-if="isPopUp?.status">
          <Modal :isPopUp="isPopUp" :onDelete="onDelete" />
        </div>
      </section>
    </template>
  </Layout>
</template>

<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: white;
    padding: 24px;
    border-radius: 12px;
  }

  .header-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: relative;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    width: 200px;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
    margin-top: 20px;
    padding: 12px;
    border: 1px solid #d5cfcf;
    border-radius: 12px;
    box-shadow: 0 5px #d5cfcf;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .add-button {
    width: max-content;
    padding: 8px;
    border: 1px solid gray;
    border-radius: 12px;
    background: #6bff38;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px #999;
  }

  button:active {
    box-shadow: 0 1px #999;
    transform: translateY(4px);
  }

  .body-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* opacity: 0.8; */
    margin-top: 20px;
    gap: 20px;
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
  }

  .task-card:active {
    cursor: grabbing;
    background: #c7fecb;
  }

  .task-drop-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 10px;
    padding: 12px;
    background: white;
    opacity: 0.5;
    border: 2px dashed #999;
    border-radius: 12px;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    .body-content {
      flex-direction: row;
    }
  } 
</style>
