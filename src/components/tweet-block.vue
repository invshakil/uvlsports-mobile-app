<template>
    <div>
        <f7-list-item swipeout
                      v-if="!editMode"
                      @click="openTweet"
                      :title="data.title"
                      :subtitle="data.time"
                      :text="data.description.length > 50 ? data.description.substr(0, 80) + '...' : data.description"
        >
            <img slot="media" :src="getImageUrl(data.image)" width="80" :alt="data.title"/>

        </f7-list-item>
        <f7-block-footer style="display: flex" v-if="$auth.check() && this.$store.state.userInfo.hasTweetAccess">
            <f7-button color="green" fill small @click="$router.push('account/update-tweet/' + data.id)"
                       style="width: 100px; margin-right: 10px">
                আপডেট করুন
            </f7-button>

            <f7-button color="red" fill small @click="deleteTweet(data.id)" style="width: 100px;">
                ডিলেট করুন
            </f7-button>
        </f7-block-footer>
    </div>
</template>

<script>
    export default {
        name: "tweet-block",
        props: {
            data: {
                required: true,
            }
        },
        data() {
            return {
                editMode: false,
            }
        },
        methods: {
            getImageUrl(imageSrc) {
                let baseUrl = this.$http.defaults.baseURL;
                baseUrl = baseUrl.substring(0, baseUrl.length - 4);
                if (imageSrc === null) {
                    return baseUrl + "/" + "image_upload/system_logo.png";
                }
                return imageSrc;
            },
            openTweet() {
                const self = this;
                const app = self.$f7;
                const description = '<p>সময়: ' + this.data.time + '</p>' + this.data.description;
                app.dialog.alert(`${description}`, this.data.title);
            },
            deleteTweet(id) {
                let vm = this;
                this.$f7.dialog.confirm('Are you sure about to delete this data?', 'Confirmation!', () => {
                    vm.$f7.preloader.show();
                    vm.$http.delete('/account/delete-tweet/' + id)
                        .then(() => {
                            vm.$f7.preloader.hide();
                            let obj = {
                                title: "Success!",
                                text: "Deleted successfully..."
                            };
                            vm.$utils.showMessage(obj, vm);
                            vm.$emit('fetchFreshContent')
                        })
                        .catch(error => {
                            vm.$utils.errorHandle(error, vm);
                            vm.$f7.preloader.hide();
                        })
                })
            },
        }
    };
</script>
