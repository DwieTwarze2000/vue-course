<template>
    <div>
        <div class="header clearfix">LOGIN</div>
        <label class="form-label clearfix" for="form-login"> Login </label>
        <input v-model="login" class="form-login clearfix" id="form-login" />
        <label class="form-label clearfix" for="form-pass"> Hasło </label>
        <input v-model="password" class="form-login clearfix" id="form-pass" />
        <label class="form-label clearfix" for="form-number"> Twój Numer Telefonu </label>
        <input v-model="number" class="form-number clearfix" id="form-number" />
        <div class="call-button" @click="Loguj()">Zaloguj</div>
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
        async Loguj() {
            let responseStream = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ login: this.login, password: this.password, number: this.number }),
            });
            let response = await responseStream.json();
            this.$router.push({ name: 'ringing', params: { callsId: response.id } });
        },
    },
};
</script>
