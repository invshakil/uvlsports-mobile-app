<template>
    <div style="height: 100%">
        <f7-page v-if="!offline">
            <p id="breadcrumb">
                <a @click="$router.push('/')">হোম</a>
                <a href>আমাদের টিম</a>
            </p>

            <f7-card class="team-members" v-for="(member, i) in members" :key="i">
                <f7-card-header :style="'background-image:url('+member.user_avatar+')'">
                    <span>{{member.name}}</span>
                </f7-card-header>
                <f7-card-content>
                    <div class="icon-group flex">
                        <a v-if="member.email" :href="'mailto:' + member.email">
                            <f7-icon material="email" size="32"></f7-icon>
                        </a>
                        <a v-if="member.user_fb" :href="member.user_fb">
                            <f7-icon f7="logo_facebook"></f7-icon>
                        </a>
                        <a v-if="member.user_tw" :href="member.user_tw">
                            <f7-icon f7="logo_twitter" size="30"></f7-icon>
                        </a>
                    </div>
                    <p v-html="member.bio"></p>
                </f7-card-content>
            </f7-card>

        </f7-page>
        <f7-page v-else>
            <offline-card/>
        </f7-page>
    </div>
</template>

<script>
    import OfflineCard from "../../components/offline-card";

    export default {
        components: {
            OfflineCard
        },
        data() {
            return {
                members: [],
                offline: false
            };
        },
        mounted() {
            this.get();
        },
        methods: {
            get() {
                this.offline = false;
                let url = "/get-our-team";
                this.$f7.preloader.show();
                this.$http
                    .get(url)
                    .then(({data}) => {
                        this.$f7.preloader.hide();
                        this.members = data.data;
                        // console.log(data)
                    })
                    .catch(error => {
                        this.offline = this.$utils.errorHandle(error, this).offline
                        this.$f7.preloader.hide();
                    });
            },
        }
    };
</script>
