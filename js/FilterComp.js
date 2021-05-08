Vue.component('filter-goods', {
    data() {
        return {
            searchLine: '',
        }
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(el => regexp.test(el.product_name));
        },
    },
    template: `
        <div class="search">
            <form action="#" class="search__form" @submit.prevent="$root.$refs.filter.filter">
                <input type="text" class="search__field" v-model="searchLine">
                <button class="search__btn" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>`
});