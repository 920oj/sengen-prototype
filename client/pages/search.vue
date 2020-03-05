<template>
    <div class="search">
        <div class="search-form">
            <searchBar />
        </div>
        <div class="search-data">
            <sengen />
        </div>
    </div>
</template>

<script>
import searchBar from '~/components/ui/bar/searchBar.vue'
import sengen from '~/components/layouts/common/sengen.vue'

export default {
    components: {
        searchBar,
        sengen
    }
}
</script>

<style scoped>
.search-form {
    padding: 30px 0px;
}
</style>