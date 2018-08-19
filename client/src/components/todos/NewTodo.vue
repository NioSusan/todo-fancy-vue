<template>
    <div class="row">
        <form>
            <div class="form-group col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3">
                <label>Todo</label>
                <textarea v-model="todo" class="form-control" rows="3"></textarea>
             </div>
             <div class="form-group col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3">
                <button class="btn btn-primary" @click.prevent="createNew">Add Todo</button>
             </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			todo: ""
		};
	},
	methods: {
		createNew() {
			axios({
				method: "POST",
				url: "/todos",
				data: {
					name: this.todo
				},
				headers: {
					token: localStorage.getItem("token")
				}
			})
				.then(res => {
                    let newTodo = res.data.newTodo
                    this.$emit("todoAdded", newTodo);
			        this.todo = "";
				})
				.catch(err => {
					console.log(err);
				});

			
		}
	}
};
</script>

<style>
</style>

