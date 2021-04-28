import Vue from 'vue';
import App from '@/app/App.vue';

import showUserName from '@scripts/customModule';
import '@styles/style.css';
import '@styles/custom.less';

new Vue({
    render: (h) => h(App),
}).$mount('#app');

//showUserName('Igor');
console.log(process.env.SOME_KEY);

let urlPosts = `${process.env.FETCH_URL}/posts/1` 

const prom = fetch(urlPosts)
.then( response => {
    if(response.ok) {        
        return response.json()
    } else {
        alert(response.status)
    }
})


