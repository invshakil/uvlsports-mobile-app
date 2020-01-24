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
    },

    timeDiffInMinutes(milliseconds) {
        let timeDiff = ((new Date).getTime() - milliseconds) / (1000 * 60);
        return parseInt(timeDiff)
    },

    errorHandle(error, $f) {
        let offline = false;
        let vErrors = [];
        let obj = {};
        if (error.response) {
            if (error.response.status === 401) {
                obj = {
                    title: "Error!",
                    text: "Authentication Failed."
                };
            } else if (error.response.status === 405) {
                obj = {
                    title: "Error!",
                    text: "This Operation Method not supported."
                };
            } else if (error.response.status === 422) {
                obj = {
                    title: "Error!",
                    text: "Validation Failed."
                };
                vErrors = error.response.data;
            } else {
                obj = {
                    title: "Error!",
                    text: 'Opps, Something went wrong.'
                };
            }
        } else {
            obj = {
                title: "Network Error!",
                text: "Your device seems to be in offline"
            };
            offline = true;
        }
        this.showMessage(obj, $f, 5);
        return {
            offline: offline,
            vErrors: vErrors
        };
    },

    ucwords(string) {
        return string.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
    }

}