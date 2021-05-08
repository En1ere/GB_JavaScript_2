Vue.component('error', {
    data() {
        return {
            showError: false,
            textError: '',
        }
    },
    methods: {

    },
    template: `
        <div class="error" v-show='showError'>
            <div class="error__window">
                <button class="cart__item-del-btn" @click='showError = !showError'>&times;</button>
                <p>{{textError}}</p>
            </div>
        </div>`
});