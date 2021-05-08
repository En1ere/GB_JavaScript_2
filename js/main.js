const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {},
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(err => {
                    this.$root.$refs.error.$data.showError = true;
                    this.$root.$refs.error.$data.textError = err;
                })
        },
    },
});