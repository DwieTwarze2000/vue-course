<template>
    <div>
        <div class="header clearfix">Zadzwonimy do Ciebie w ciągu 26 sekund.</div>
        <div class="row">
            <div class="form-floating mb-3">
                <input v-model="number" type="text" class="form-control" id="number" />
                <label class="labelfornumber" for="number">Wprowadź numer</label>
            </div>
        </div>
        <!-- <label class="form-label clearfix" for="form-number"> Wprowadź numer </label>
        <input v-model="number" class="form-number clearfix" id="form-number" /> -->
        <div class="call-button" @click="call()">Zadzwoń teraz</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            number: '',
        };
    },
    methods: {
        async call() {
            let responseStream = await fetch('http://localhost:3000/call', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ number: this.number }),
            });
            let response = await responseStream.json();
            this.$router.push({ name: 'ringing', params: { callsId: response.id, forwarded: true } });
        },
    },
};
</script>
<style scoped>
.row {
    width: 50%;
    margin: auto;
}
.form-control {
    font-size: 2rem;
    text-align: center;
}
</style>
