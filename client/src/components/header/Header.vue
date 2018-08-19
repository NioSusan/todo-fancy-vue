<template>
    <div class="row">
      <hr>
      <ul class="nav nav-pills">
        <router-link tag="li" to="/" exact active-class="active"><a>Home</a></router-link>
        <router-link v-show="!auth" tag="li" to="/signup" active-class="active"><a>Sign Up {{isLogout}} </a></router-link>
        <router-link v-show="!auth" tag="li" to="/signin" active-class="active"><a>Login</a></router-link>
        <router-link v-show="auth" tag="li" to="/todos" active-class="active"><a>My Todos {{resetStatus}} </a></router-link>
        <router-link v-show="auth" tag="li" to="/logout" active-class="active"><a>Logout </a></router-link>
       
        
      </ul>
      <br>
    </div>
</template>

<script>
import {eventBus} from '../../main';
export default {
	data() {
		return {
			auth: false
		};
  },
  computed:{
    resetStatus(){
            eventBus.$on('status', (data)=>{
            this.auth = data;
        })
    },
    isLogout(){
     eventBus.$on('isActive', (data)=>{
            this.auth = data;
      })
    }
  },
  
  
    
  
  
};
</script>

<style>
a {
	cursor: pointer;
}
</style>

