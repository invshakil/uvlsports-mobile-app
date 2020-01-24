<template>
    <!-- App -->
    <f7-app>
        <navbar/>
        <sidemenu/>
        <router-view id="page-wrap"/>
        <cfooter/>
    </f7-app>
</template>

<script>
    // Import Routes
    import navbar from "./layouts/navbar";
    import sidemenu from "./layouts/menu";
    import cfooter from "./layouts/footer";

    export default {
        components: {
            sidemenu,
            navbar,
            cfooter,
        },
        data() {
            return {};
        },
        mounted() {
        },
        methods: {}
    };
</script>
<style lang="scss">
    @import "./styles/main.scss";
</style>
