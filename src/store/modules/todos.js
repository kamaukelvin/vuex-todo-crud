/* eslint-disable no-console */
// 1. Imports
import axios from "axios";

// 2. Initialize State, Getters, Actions, Mutations
const state = {
  // states here
  todos: [],
};

const getters = {
  // accessing state of todos using a method allTodos
  allTodos: (state) => state.todos,
};

const actions = {
  // create an action that makes a request to an API, gets a response then calls a mutation
  // we cant change a state directly we have to call a mutation to do so

  // the actions takes in an object as a parameter
  // the commit parameter is waht is used to call a mutation
  async getTodos({ commit }) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${10}`
    );
    console.log("clicked");
    // to call the setTodos we have to use commit: it takes in two parameters; the mutation we want to call and what we want to parse in which is the response from API
    commit("setTodos", response.data);
  },

  // add a new todo
  // takes the parameter to call the mutation and the data from our input

  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("newTodo", response.data);
    console.log(response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    // get the selected filter option
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },
  async editTodo({ commit }, id) {
    console.log("eee", id);
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { title: "hello", completed: false, id, userId: 1 }
    );
    commit("editTodo", response.data);
  },
};
const mutations = {
  // responsible for changing the state
  // setTodos gets the data from the API and updates our state
  // it takes in two parameters, the state and the data we committing=> todos (left side of arrow function) and sets the state.todos to the todos that are received from API(right side of arrow function)
  setTodos: (state, todos) => (state.todos = todos),

  // new todo will take in the state and a single todo as added from input
  // array.unshift adds a new item in the beginning of an array
  // array.push adds a new item in the end of an array
  // array.unshift(array is the name of the array, in our instance=todos )

  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  editTodo: (state, todos) => (state.todos = todos),
};

// 3. export the objects
export default {
  state,
  getters,
  actions,
  mutations,
};
