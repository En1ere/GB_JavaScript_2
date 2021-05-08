Vue.component('filter-goods', {
    data() {
        return {
            searchLine: '',
        }
    },
    template: `
        <div class="search">
            <form action="#" class="search__form" @submit.prevent="$parent.$refs.products.filter(searchLine)">
                <input type="text" class="search__field" v-model="searchLine">
                <button class="search__btn" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>`
});