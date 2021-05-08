const API = 'https://raw.githuusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {},
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(() => {
                    this.$root.$refs.error.$data.showError = true;
                })
        },
    },
});