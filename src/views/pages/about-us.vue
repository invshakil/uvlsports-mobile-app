<template>
    <f7-page v-if="!offline">
        <f7-navbar title="Profile" back-link="Back"/>

        <f7-card class="about-us">
            <f7-card-header>আমাদের সম্পর্কে</f7-card-header>
            <f7-card-content>
                <div v-html="data"></div>
            </f7-card-content>
        </f7-card>

    </f7-page>
    <f7-page v-else>
        <offline-card/>
    </f7-page>
</template>

<script>
    import OfflineCard from "../../components/offline-card";

    export default {
        components: {
            OfflineCard,
        },
        data() {
            return {
                view: true,
                data: null,
                offline: false
            };
        },
        mounted() {
            this.get();
        },
        methods: {
            get() {
                this.offline = false;
                this.$f7.preloader.show();
                const vm = this;
                const url = 'get-about-us';
                this.$http.get(url)
                    .then(response => {
                        vm.$f7.preloader.hide();
                        vm.data = response.data.data;
                    })
                    .catch(error => {
                        /* es-lint disable */
                        // vm.offline = vm.$utils.errorHandle(error, vm).offline;
                        vm.$f7.preloader.hide();
                    })
            }
        }
    };
</script>