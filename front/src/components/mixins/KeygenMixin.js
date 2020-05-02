export default {
    data() {
        return {
            uniqueKeyCounter: 0,
        };
    },
    methods: {
        generateKey() {
            this.uniqueKeyCounter += 1;
            return this.uniqueKeyCounter;
        },
    },
};
