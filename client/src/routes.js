import Home from './components/home/Home.vue';
import Todos from './components/todos/Todos.vue';
import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';
import Logout from './components/auth/Logout.vue';

export const routes = [
    { path: '', component: Home},
    { path: '/todos', component: Todos},
    { path: '/signin', component: Signin},
    { path: '/signup', component: Signup},
    { path: '/logout', component: Logout},
]