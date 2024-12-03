<template>
    <div class="min-h-screen bg-background py-10">
      <div class="container mx-auto max-w-2xl px-4">
        <h1 class="text-3xl font-bold text-center mb-8 text-primary">Task Manager</h1>
        
        <div class="bg-white shadow-md rounded-lg p-6 mb-8">
          <TaskForm 
            ref="taskFormRef"
            @task-created="fetchTasks" 
            @task-updated="fetchTasks"
          />
        </div>
  
        <div class="space-y-4">
          <div 
            v-for="task in tasks" 
            :key="task.id" 
            class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ task.title }}</h3>
              <p class="text-gray-600">{{ task.description }}</p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="startEditTask(task)"
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button 
                @click="deleteTask(task.id)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div 
            v-if="tasks.length === 0" 
            class="text-center text-gray-500 py-8"
          >
            No tasks found. Create your first task!
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import TaskForm from '../components/TaskForm.vue'
  
  const tasks = ref([])
  const taskFormRef = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  const fetchTasks = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get('http://localhost:4000/tasks')
      tasks.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch tasks. Please try again.'
      console.error('Error fetching tasks:', err)
    } finally {
      isLoading.value = false
    }
  }
  
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${taskId}`)
      fetchTasks()
    } catch (err) {
      error.value = 'Failed to delete task. Please try again.'
      console.error('Error deleting task:', err)
    }
  }
  
  const startEditTask = (task) => {
    // Use the ref to call the method on the child component
    taskFormRef.value.setEditingTask(task)
  }
  
  onMounted(fetchTasks)
  </script>