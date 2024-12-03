<template>
    <form @submit.prevent="submitTask" class="space-y-4">
      <div>
        <label class="block text-gray-700 font-bold mb-2" for="title">
          Task Title
        </label>
        <input 
          v-model="title" 
          id="title"
          placeholder="Enter task title" 
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
      </div>
      
      <div>
        <label class="block text-gray-700 font-bold mb-2" for="description">
          Task Description
        </label>
        <textarea 
          v-model="description" 
          id="description"
          placeholder="Enter task description"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>
      
      <button 
        type="submit"
        class="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {{ editingTask ? 'Update Task' : 'Create Task' }}
      </button>
    </form>
  </template>
  
  <script setup>
    import { ref, watch } from 'vue'
  import axios from 'axios'
  
  const emit = defineEmits(['task-created', 'task-updated'])
  
  const title = ref('')
  const description = ref('')
  const editingTask = ref(null)
  
  // Watch for changes in editingTask
  watch(editingTask, (newTask) => {
    if (newTask) {
      title.value = newTask.title
      description.value = newTask.description
    }
  })
  
  const submitTask = async () => {
    try {
      const taskData = {
        title: title.value,
        description: description.value
      }
  
      if (editingTask.value) {
        // Update existing task
        await axios.put(`http://localhost:4000/tasks/${editingTask.value.id}`, taskData)
        emit('task-updated')
      } else {
        // Create new task
        await axios.post('http://localhost:4000/tasks', taskData)
        emit('task-created')
      }
  
      // Reset form
      title.value = ''
      description.value = ''
      editingTask.value = null
    } catch (error) {
      console.error('Error submitting task:', error)
    }
  }
  
  // Expose method to set editing task
  defineExpose({
    setEditingTask: (task) => {
      editingTask.value = task
    }
  })
  </script>