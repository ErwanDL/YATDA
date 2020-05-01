import Vue from "vue";

export default Vue.extend({
    computed: {
        isOnMobile() {
            return document.body.clientWidth < 400;
        },
    },
});
