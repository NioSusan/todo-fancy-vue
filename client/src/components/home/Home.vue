<template>
    <div class="container">
        <h1 class="text-center greet">WELCOME!</h1>
        <br>
        <h4 class="text-center greet">If you already have an account, you can sign in using your email address and password.</h4>
        <br>
        <h4 class="text-center greet">If you do not yet have an account at our website, you will need to register first.</h4>
    </div>
</template>
 
<script>
import Header from '../header/Header.vue';
export default {
    components: {
        'app-header' : Header,
    }
    
}
</script>

<style>
.greet{
     font-family: 'Arizonia';
        font-size: 24px;
        color: #6e6e6e;
}
</style>

