<template>
    <div class="container-fluid">
        <div class="row">
            <div class="header clearfix">Ustawienia</div>
        </div>
        <div class="row">
            <div class="form-floating mb-3">
                <input v-model="login" type="text" class="form-control" id="login" />
                <label for="login">Login</label>
            </div>
        </div>
        <div class="row">
            <div class="form-floating mb-3">
                <input v-model="password" :type="isShowed ? 'text' : 'password'" class="form-control" id="password" />
                <label for="password">Hasło</label>
                <span class="eye" @click="ChangeInput()"
                    ><i :class="{ fas: true, 'fa-eye': !isShowed, 'fa-eye-slash': isShowed }"></i
                ></span>
            </div>
        </div>
        <div class="row">
            <div class="form-floating mb-3">
                <input v-model="number" type="text" class="form-control" id="number" />
                <label for="number">Twój numer telefonu</label>
            </div>
        </div>
        <div v-if="saved" class="row saved">
            <p>ZAPISANO POMYŚLNIE</p>
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
            isShowed: false,
            saved: false,
        };
    },
    methods: {
        async ChangeSettings() {
            await fetch('http://localhost:3000/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ login: this.login, password: this.password, number: this.number }),
            }).then(() => {
                this.saved = true;
            });
        },
        ChangeInput() {
            this.isShowed = !this.isShowed;
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
<style scoped>
.fas {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    cursor: pointer;
}
.saved {
    color: green;
    font-weight: bold;
    font-size: 1.5rem;
}
</style>
