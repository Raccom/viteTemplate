import {defineStore} from 'pinia';

export const useUserStore = defineStore('store', () => {
    const username = ref('user');
    return {
        username
    };
})
