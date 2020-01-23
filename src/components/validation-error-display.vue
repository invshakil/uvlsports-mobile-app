<template>
    <div>
        <f7-list-item v-for="(error, i) in errors"
                      :key="i"
                      class="validation-error-message"
                      v-if="error.length"
                      :title="error[0]">
            <f7-icon slot="media" md="material:error" color="red"/>
        </f7-list-item>
        <f7-list-item v-for="(error, i) in server_errors"
                      :key="i"
                      class="validation-error-message"
                      v-if="error.length"
                      :title="error[0]">
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
        mounted() {
        },
        methods: {}
    };
</script>

<style lang="css" scoped>
</style>
