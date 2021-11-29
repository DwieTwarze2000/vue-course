<template>
    <div class="box">
        <div class="text">Trwa połączenie...</div>
        <span id="timer"
            >{{ hour.toString().replace(/^([0-9]{1})$/, '0$1') }} :
            {{ min.toString().replace(/^([0-9]{1})$/, '0$1') }} :
            {{ sec.toString().replace(/^([0-9]{1})$/, '0$1') }}</span
        >
    </div>
</template>
<script>
export default {
    data() {
        return {
            sec: 0,
            min: 0,
            hour: 0,
        };
    },
    mounted() {
        setInterval(() => {
            this.sec += 1;
            if (this.sec == 60) {
                this.min += 1;
                this.sec = 0;
            }
            if (this.min == 60) {
                this.min = 0;
                this.hour += 1;
            }
        }, 1000);
    },
};
</script>
<style scoped>
#timer {
    margin-top: 30px;
    font-size: 2rem;
}
</style>
