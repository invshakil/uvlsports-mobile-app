export default {
    showLoader(seconds, $f) {
        const self = $f;
        self.$f7.preloader.show();
        setTimeout(() => {
            self.$f7.preloader.hide();
        }, seconds * 1000);
    },

    showMessage(obj, $f, seconds = 2) {
        const self = $f;
        self.$f7.notification.create({
            title: obj.title,
            text: obj.text,
            closeTimeout: seconds * 1000
        }).open();
    }
}