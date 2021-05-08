const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {},
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(err => {
                    this.$refs.error.setError(err)
                })
        },
    },
});