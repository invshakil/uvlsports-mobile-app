<template>
    <div scrollable>
        <f7-card class="demo-card-header-pic">
            <f7-card-header class="no-border" valign="bottom">
                <img @click="visitArticlePage" :src="data.medium_image"/>
            </f7-card-header>
            <f7-card-content>
                <b class="title" @click="visitArticlePage">{{ data.title }}</b>
                <p class="date">{{ data.time_format }}</p>
            </f7-card-content>
            <f7-card-footer>
                <div class="demo-facebook-name">{{ this.$utils.ucwords(data.author.name) }}</div>
                <div class="demo-facebook-date">
                    <f7-link @click="visitArticlePage">বিস্তারিত...</f7-link>
                </div>
            </f7-card-footer>
        </f7-card>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            data: {
                required: true
            }
        },
        mounted() {
        },
        methods: {
            visitArticlePage() {
                return this.$router.push("/article-details/" + this.data.id);
            }
        }
    };
</script>

<style lang="css" scoped>
</style>
