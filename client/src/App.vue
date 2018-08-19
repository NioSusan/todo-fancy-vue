<template>
    <div class="container">
        <app-header></app-header>
        <transition name='slide' mode="out-in">
        <router-view></router-view> 
        </transition>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue';
    export default {
        components: {
            'app-header' : Header,
        },
    
    }
</script>

<style>
.slide-enter {
	opacity: 0;
	/* transform: translateY(20px); */
}

.slide-enter-active {
	animation: slide-in 1s ease-out forwards;
	transition: opacity 0.5s;
}

.slide-leave {
}

.slide-leave-active {
	animation: slide-out 1s ease-out forwards;
	transition: opacity 1s;
	opacity: 0;
    position: absolute;
}

.slide-move{
    transition: transform 1s;
}

@keyframes slide-in {
	from {
		transform: translateY(20px);
	}
	to {
		transform: translateY(0);
	}
}

@keyframes slide-out {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(20px);
	}
}
</style>
