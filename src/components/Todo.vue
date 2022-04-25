<template>
  <div>
    <h1>My Todo List</h1>
    <div v-if="fetchingTodos" class="loading-div">
      <i class="fas fa-spinner fa-spin fa-2x" />
      <div>Fetching todos...</div>
    </div>
    <div class="todos" v-else>
      <!-- for loop with "item in items" but items in our scenarios is the getter allTodos that has access to the todos array -->

      <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">
        <!-- after looping through the array in the allTodos getter we get a single todo that we can display -->
        <input
          v-if="selectedItem.id == todo.id"
          type="text"
          v-model="title"
          class="edit-input"
          :placeholder="todo.title"
        />
        <span v-else>{{ todo.title }}</span>
        <!-- <span
          @click="edit(todo)"
          class="fas fa-edit"
          v-if="selectedItem.id != todo.id"
        ></span>
        <span
          @click="saveEdit(todo.id)"
          class="fas fa-save"
          v-if="selectedItem.id == todo.id"
        ></span> -->

        <i @click="delTodos(todo.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// initializing getters from the store into this component
// mapActions calls the actions from our modules

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todo",
  data() {
    return {
      title: "",
      fetchingTodos: false,
      isDeletingTodos: false,
      isEditing: true,
      selectedItem: {},
    };
  },

  // our actions are called in the methods object

  // syntax for one method only

  // methods:mapAction(['getTodos'])

  // For multiple methods
  methods: {
    ...mapActions(["getTodos", "deleteTodo", "editTodo"]),

    async getAllTodos() {
      this.fetchingTodos = true;
      try {
        await this.getTodos();
        this.fetchingTodos = false;
      } catch (err) {
        this.fetchingTodos = false;
      }
    },
    async delTodos(id) {
      this.isDeletingTodos = true;
      try {
        await this.deleteTodo(id);
        this.isDeletingTodos = false;
      } catch (err) {
        this.isDeletingTodos = false;
      }
    },
    async saveEdit(id) {
      try {
        console.log("title", this.title);
        await this.editTodo(id, this.title);

        this.selectedItem = {};
        this.title = "";
      } catch (err) {
        this.selectedItem = {};
      }
    },
    edit(todo) {
      this.selectedItem = todo;
    },
  },

  // defining which getters we want to use by computed and adding them as an array
  // more getters in the todo.js in store can be added in the array to utilize them here
  computed: mapGetters(["allTodos"]),

  // calling the method getTodos when the component is mounted
  async created() {
    this.getAllTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
  min-height: 40px;
}

.fa-trash-alt {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.fa-spinner {
  color: #41b883;
}
.fa-edit {
  position: absolute;
  bottom: 10px;
  right: 35px;
  color: #fff;
  cursor: pointer;
}
.fa-save {
  position: absolute;
  bottom: 10px;
  right: 35px;
  color: #fff;
  cursor: pointer;
}
.loading-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
}
.edit-input {
  border: 3px solid #fff;
  width: 85%;
  border-radius: 3px;
}
</style>
