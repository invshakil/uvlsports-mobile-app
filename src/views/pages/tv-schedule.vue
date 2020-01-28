<template>
    <div style="height: 100%">
        <f7-page v-if="!offline">
            <p id="breadcrumb">
                <a @click="$router.push('/')">হোম</a>
                <a href>টিভিতে সরাসরি সম্প্রচারিত খেলার সূচী</a>
            </p>
            <f7-block-title style="height: auto">{{ data.gameWeekName }}</f7-block-title>

            <f7-list class="filter-area" inline-labels>
                <f7-list-input
                        type="text"
                        placeholder="খুঁজুন..."
                        @input="string = $event.target.value"
                        :value="string"
                >
                    <f7-icon f7="search" slot="media" color="red"></f7-icon>
                </f7-list-input>

            </f7-list>

            <f7-card v-for="(match, i) in filteredTvSchedules" :key="i">
                <f7-card-header>
                    <span>{{match.title}}</span>
                </f7-card-header>
                <f7-card-content>
                    <div class="info"><b>সময়ঃ</b> {{ match.formatted_time }}</div>
                    <div class="info"><b>চ্যানেলঃ</b> {{ match.channel_name }}</div>
                    <div class="info"><b>টুর্নামেন্টঃ</b> {{ match.tournament.name }}</div>
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
                data: {
                    gameWeekName: null,
                    tvSchedule: []
                },
                offline: false,
                string: ''
            };
        },
        mounted() {
            this.get();
        },
        computed: {
            filteredTvSchedules() {
                if (this.string === '' || this.string === null || this.string === undefined) {
                    return this.data.tvSchedule;
                }
                return this.data.tvSchedule.filter(match => {
                    let words = [];
                    let titleSplits = match.title.toUpperCase().split(' ');
                    let tournamentNameSplits = match.tournament.name.toUpperCase().split(' ');
                    words = [...titleSplits, ...tournamentNameSplits];
                    let string = this.string.toUpperCase().trim();
                    return words.includes(string);
                })
            }
        },
        methods: {
            get() {
                this.offline = false;
                let url = "/get-tv-schedule";
                this.$f7.preloader.show();
                this.$http
                    .get(url)
                    .then(({data}) => {
                        this.$f7.preloader.hide();
                        this.data = data.data;
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
<style lang="scss">
    .block-title {
        height: auto;
        font-weight: 800;
        font-size: 15px;
        text-transform: uppercase;
        color: #4cd964 !important;
    }

    .card {
        .card-header {
            span {
                font-weight: 800;
                color: #f5525d;
            }
        }

        .info {
            b {
                font-weight: 600;
                color: #ff8900;
            }
        }
    }
</style>