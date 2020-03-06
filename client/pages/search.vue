<template>
    <div class="search">
        <div class="search-form">
            <SearchBar 
                @dataToParent="dataToParent"
            />
        </div>
        <div class="search-data">
            <!-- <SengenArea :list="search_list" /> -->
        </div>
    </div>
</template>

<script>
import SearchBar from '~/components/ui/bar/searchbarSeparation.vue'
import SengenArea from '~/components/layouts/index/topSengen.vue'

export default {
    components: {
        SearchBar,
        SengenArea
    },
    data() {
        return {
            searchData: '',
            search_list: ''
        }
    },
    methods: {
        dataToParent: function(value) {
            this.searchData = value
            this.searchPost()
        },
        searchPost: function() {
            let search_list = this.$axios
                                .$post(`/api/search/${this.searchData}`)
                                .then(result => {
                                    this.search_list = result
                                })
        }
    },
}
</script>

<style scoped>
.search-form {
    padding: 30px 0px;
}

.search-data {
    margin-top: 50px;
}
</style>