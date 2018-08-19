<template>
    <div class="row">
        <div class="row">
        <div class="col-sm-8 col-sm-offset-3 col-xs-12 col-xs-offset-1 col-md-6 col-md-offset-4">
            <button style="width :300px" class="btn btn-info" @click="getTodos">See All My Todos</button>
        </div>
        </div>
        <app-progress :todoCount="todos.length" :maxTodos="maxTodos"></app-progress>
        <app-new-todo @todoAdded="newTodo"></app-new-todo>
        <app-todo v-for="(todo, index) in todos" :key="index"  @click.native="deleteTodo(index)">{{ todo.name }}</app-todo>
           
    </div>
</template>

<script>
    import axios from "axios";
    import Progress from './Progress.vue';
    import Todo from './Todo.vue';
    import NewTodo from './NewTodo.vue';
    export default {
        data(){
            return{
                todos: [],
                maxTodos: 12,
            }
        },
        components: {
            'app-todo' : Todo,
            'app-new-todo' : NewTodo,
            'app-progress' : Progress,
        }, 
        methods: {
            newTodo(todo){
                if(this.todos.length >= this.maxTodos){
                    return alert('Please delete some todos first');
                }
                this.todos.push(todo);
            },
            deleteTodo(index){
                const target = this.todos[index]
                axios({
                    method: "DELETE",
                    url: `/todos/${target._id}`,
                    headers: {
					    token: localStorage.getItem("token")
                    },
                })
                .then(res=>{
                     this.todos.splice(index, 1);
                })
                .catch(err=>{
                    console.log(err)
                })
               
                
            },
            getTodos(){
                axios({
                    method: "GET",
                    url: "/todos",
                    headers: {
					    token: localStorage.getItem("token")
				    }   
                })
                .then(res=>{
                    this.todos = res.data
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            
        } 
    }
</script>

<style>

</style>

