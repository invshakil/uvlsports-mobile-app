<template>
    <div>
        <f7-list-item v-for="(e, i) in filteredErrors"
                      :key="i"
                      class="validation-error-message"
                      :title="e.length ? e[0] : ''">
            <f7-icon slot="media" md="material:error" color="red"/>
        </f7-list-item>
        <f7-list-item v-for="(sError, i) in server_errors"
                      :key="i"
                      class="validation-error-message"
                      :title="sError.length ? sError[0] : ''">
            <f7-icon slot="media" md="material:error" color="red"/>
        </f7-list-item>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            errors: {
                required: true,
                type: Object
            },
            server_errors: {
                required: false,
                type: Array
            }
        },
        computed: {
            filteredErrors() {
                let errors = Object.values(this.errors);
                return errors.filter(item => {
                    return item.length > 0;
                });
            },
            filteredServerErrors() {
                return this.server_errors.filter(item => {
                    return item.length > 0;
                })
            }
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style lang="css" scoped>
</style>
