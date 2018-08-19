<template>
    <div class="container">
        <form v-if="!submitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" class="form-control" v-model="firstName">
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" class="form-control" v-model="lastName">
                    </div> 
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                    <button type="submit" @click.prevent="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>

         <div class="row" v-if="submitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="card">
                    <div class="card-header">
                        <h4>Your Registered Data</h4>
                    </div>
                    <div class="card-body">
                        <p>Full Name: {{firstName}} {{lastName}} </p>
                        <p>Email: {{email}} </p>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			submitted: false,
            token: "",
		};
	},
	methods: {
		submit() {
			axios
				.post("/users/signup", {
					fullname: this.firstName + " " + this.lastName,
					email: this.email,
					password: this.password
				})
				.then(res => {
                    this.submitted = true;
                    this.token = res.data.token;
                    let token = this.token;
					localStorage.setItem("token", token);
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	mounted() {
		if (localStorage.token) {
            this.token = localStorage.token;
           
		}
	},
	watch: {
		token(token) {
            localStorage.token = token;
           
		}
	}
};
</script>
