<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { db } from '@/config/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
const todos = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'taks'))
  querySnapshot.forEach((doc) => {
    todos.value.push({
      id: doc.id,
      body: doc.data().body,
      done: doc.data().done
    })
  })
})

/*
  addTodo
*/
const newTodoBody = ref('')
const addTodo = async () => {
  if (newTodoBody.value.trim() === '') return
  const newTodo = {
    body: newTodoBody.value,
    done: false
  }
  const docRef = await addDoc(collection(db, 'taks'), newTodo)
  console.log(docRef)

  newTodoBody.value = ''
  nextTick()
}

/*
  delete todo
*/

const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

/*
  Completed Todo
*/

const completeTodo = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id)
  const { done } = todos.value[index]
  todos.value[index] = { ...todos.value[index], done: !done }
}
</script>

<template>
  <div class="badass-todo">
    <h1 class="title has-text-centered">Badass Todo</h1>
    <form
      class="mb-3"
      @submit.prevent="addTodo"
    >
      <div class="field has-addons">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Find a repository"
            v-model="newTodoBody"
          />
        </div>
        <div class="control">
          <button
            class="button is-info"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </form>

    <div
      class="card mb-2"
      :class="{ 'has-background-success-light': todo.done }"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.body }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
                @click="completeTodo(todo.id)"
              >
                &check;
              </button>
              <button
                class="button is-danger ml-2"
                @click="deleteTodo(todo.id)"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>
