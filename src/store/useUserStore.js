import { defineStore } from 'pinia';

export const useUserStore = defineStore('store', () => {
    const username = ref('user');

    const socketState = ref(false);
    const setSocketState = value => socketState.value = value;
    const socketHandler = ref(null);
    const setSocketHandler = value => socketHandler.value = value;

    return {
        username,

        socketState,
        setSocketState,
        socketHandler,
        setSocketHandler,
    };
})
