<template>
  <div>
    <h3>Add to do</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Add to do here" />
        <button type="submit" :disabled="this.addingTodo">
          <span v-if="this.addingTodo"
            ><i class="fas fa-spinner fa-spin" />Adding to do</span
          >
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
      addingTodo: false,
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    async onSubmit(e) {
      this.addingTodo = true;
      try {
        e.preventDefault();
        await this.addTodo(this.title);

        this.addingTodo = false;
        this.title = "";
      } catch (err) {
        this.addingTodo = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
button[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px solid #41b883;
  cursor: pointer;
}
.fa-spinner {
  margin-right: 10px;
}
</style>
