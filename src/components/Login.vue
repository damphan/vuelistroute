<template>
    <b-container class="w-400px">
        <b-alert variant="danger" :show="showMsg" class="text-center">{{ errorMsg }}</b-alert>
        <b-form-group label="User Email" label-cols-md="4">
            <b-form-input v-model="form.userId" placeholder="Email"></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-cols-md="4">
            <b-form-input type="password" v-model="form.pass" placeholder="Password"></b-form-input>
        </b-form-group>
        <div class="text-right">
            <b-button @click="login" variant="primary" :disabled="form.btnDisabled">Login</b-button>
        </div>
    </b-container>
</template>

<script>
import user from '../api/user'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                userId: '',
                pass: '',
                btnDisabled: false
            },
            showMsg: false,
            errorMsg: ''
        }
    },
    methods: {
        login() {
            this.showMsg = false;
            this.form.btnDisabled = true;
            if(this.form.userId != "" && this.form.pass != "") {
                user.login(this.form.userId, this.form.pass)
                    .catch((error) => {
                        this.errorMsg = 'Incorrect User Email or Password';
                        this.showMsg = true;
                    })
                    .then((response) => {
                        if (response) {
                            if (response.data.token) {
                                // Login success
                                this.$emit("loggedIn", true);
                                this.$router.replace({ name: "user-list" });
                            } else if (response.data.error) {
                                this.errorMsg = response.data.error;
                                this.showMsg = true;
                            }
                        }
                        this.form.btnDisabled = false;
                    });
            } else {
                this.errorMsg = 'Please enter User Email & Password';
                this.showMsg = true;
                this.form.btnDisabled = false;
            }
        }
    }
}
</script>