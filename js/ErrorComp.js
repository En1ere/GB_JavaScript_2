Vue.component('error', {
    data() {
        return {
            showError: false,
        }
    },
    methods: {

    },
    template: `
        <div class="error" v-show='showError'>
            <div class="error__window">
                <button class="cart__item-del-btn" @click='showError = !showError'>&times;</button>
                <p>errorText</p>
            </div>
        </div>`
});