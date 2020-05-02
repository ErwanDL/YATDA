import Vue from "vue";

export default {
    computed: {
        isOnMobile() {
            return document.body.clientWidth < 400;
        },
    },
};
