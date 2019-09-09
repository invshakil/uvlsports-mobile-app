export default {
    showLoader(seconds, $f) {
        const self = $f;
        self.$f7.preloader.show();
        setTimeout(() => {
            self.$f7.preloader.hide();
        }, seconds * 1000);
    }
}