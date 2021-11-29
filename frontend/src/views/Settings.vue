<template>
    <div class="container-fluid">
        <div class="row">
            <div class="header clearfix">Ustawienia</div>
        </div>
        <div class="row">
            <label class="form-label clearfix" for="form-login"> Login </label>
            <input v-model="login" class="form-login clearfix" id="form-login" />
        </div>
        <div class="row">
            <label class="form-label clearfix" for="form-pass"> Hasło </label>
            <input v-model="password" class="form-login clearfix" id="form-pass" />
        </div>
        <div class="row">
            <label class="form-label clearfix" for="form-number"> Twój Numer Telefonu </label>
            <input v-model="number" class="form-number clearfix" id="form-number" />
        </div>
        <div class="row">
            <div class="call-button" @click="ChangeSettings()">Zapisz ustawienia</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            login: '',
            password: '',
            number: '',
        };
    },
    methods: {
        async ChangeSettings() {
            fetch('http://localhost:3000/settings', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ login: this.login, password: this.password, number: this.number }),
            });
        },
    },
    mounted() {
        fetch('http://localhost:3000/settings', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                this.login = data.login;
                this.password = data.password;
                this.number = data.number;
            });
    },
};
</script>
<style></style>
