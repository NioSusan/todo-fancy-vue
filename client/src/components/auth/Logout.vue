<template>
   <div class="container">
        <form v-if="!submitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <h1>Are you sure?</h1>
                    </div>
                    <button type="submit" @click.native="logout" class="btn btn-primary"> YES </button>
                </div>
            </div>
        </form>
   </div>
</template>

<script>
export default {
    data() {
		return {
            submitted: false,
            message : 'Good Bye!'
		};
	},
    methods:{
        logout(){
            this.submitted = true;
            localStorage.removeItem("token");
            eventBus.$emit('isActive', false) //pass this to siblings globally
        }
    }
}
</script>
