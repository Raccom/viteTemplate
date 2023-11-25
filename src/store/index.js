import {defineStore} from 'pinia';

export const useStore = defineStore('store', () => {
    const username = ref('josliang');
    return {
        username
    };
})
