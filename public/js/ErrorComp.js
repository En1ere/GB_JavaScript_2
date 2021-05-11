Vue.component('error', {
    data() {
        return {
            textError: '',
        }
    },
    methods: {
        setError(err) {
            this.textError = err;
        },
    },
    computed: {
        showError() {
            return this.textError !== '';
        },
    },
    template: `
        <div class="error" v-if='showError'>
            <div class="error__window">
                <button class="cart__item-del-btn" @click='setError("")'>&times;</button>
                <p>{{textError}}</p>
            </div>
        </div>`
});