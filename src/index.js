import Vue from 'vue';
import App from '@/app/App.vue';

import showUserName from '@scripts/customModule';
import '@styles/style.css';
import '@styles/custom.less';

new Vue({
    render: (h) => h(App),
}).$mount('#app');

showUserName('Igor');
console.log(process.env.SOME_KEY);