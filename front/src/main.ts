import Vue from "vue";
import App from "./App.vue";

// Globally register base components
const requireComponent = require.context(
    "./components/base",
    false,
    /Base[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentNameWithExtension = fileName.split("/").pop();
    if (componentNameWithExtension === undefined) throw Error("Filename error");
    const componentName = componentNameWithExtension.replace(/\.\w+$/, "");
    Vue.component(componentName, componentConfig.default);
});

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount("#app");
