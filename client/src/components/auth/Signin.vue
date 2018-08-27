<template>
    <div class="container">
		 <div class="row" v-show="!submitted">
                <div class="col-xs-12 col-xs-offset-2 col-sm-8 col-sm-offset-4 col-md-2 col-md-offset-5">
					<button @click="checkLoginState" class="loginBtn loginBtn--facebook"> Login with Facebook</button>
                </div>
		 </div>
		 
		 <br>
        <form v-show="!submitted">
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                    <button type="submit" @click.prevent="login" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>

         <div class="row" v-show="submitted">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <div class="alert alert-info">{{message}}</div> 
            </div>
         </div>
    </div>
</template>

<script>
import { eventBus } from "../../main";
import axios from "axios";
// import facebookLogin from 'facebook-login-vuejs';

export default {
	data() {
		return {
			email: "",
			password: "",
			submitted: false,
			message: ""
		};
	},
	methods: {
		login() {
			axios({
				method: "POST",
				url: "/users/signin",
				data: {
					email: this.email,
					password: this.password
				}
			})
				.then(res => {
					this.message = res.data.msg;
					this.submitted = true;
					let token = res.data.token;
					localStorage.setItem("token", token);
					eventBus.$emit("status", this.submitted); //2. pass this to siblings globally
				})
				.catch(err => {
					this.message = "error";
				});
		},

		checkLoginState() {
			FB.getLoginStatus(function(response) {
				if (response.status === "connected") {
					console.log("HIIII!");
					axios
						.post(
							"http://localhost:3000/api/users/loginFb",
							response.authResponse
						)
						.then(result => {
							console.log(result.data.msg);
							this.submitted = true;
							this.message = result.data.msg;
							let token = result.data.token;
							localStorage.setItem("token", token);
							eventBus.$emit("status", this.submitted);
						})
						.catch(err => {
							this.message = "error";
						});
				}
			});
		}
	},
	
};
</script>

<style>
/* *************FB BUTTON ******************************************* */
.loginBtn {
	box-sizing: border-box;
	position: relative;
	/* width: 13em;  - apply for fixed size */
	margin: 0.2em;
	padding: 0 15px 0 46px;
	border: none;
	text-align: left;
	line-height: 34px;
	white-space: nowrap;
	border-radius: 0.2em;
	font-size: 16px;
	color: #fff;
}
.loginBtn:before {
	content: "";
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	width: 34px;
	height: 100%;
}
.loginBtn:focus {
	outline: none;
}
.loginBtn:active {
	box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Facebook */
.loginBtn--facebook {
	background-color: #4c69ba;
	background-image: linear-gradient(#4c69ba, #3b55a0);
	/*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
	text-shadow: 0 -1px 0 #354c8c;
}
.loginBtn--facebook:before {
	border-right: #364e92 1px solid;
	background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png")
		6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
	background-color: #5b7bd5;
	background-image: linear-gradient(#5b7bd5, #4864b1);
}
</style>

