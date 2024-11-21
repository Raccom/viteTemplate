import { defineStore } from 'pinia';

export const useUserStore = defineStore('store', () => {
    const username = ref('user');

    const socketState = ref(false);
    const setSocketState = value => socketState.value = value;
    const socketHandler = ref(null);
    const serSocketHandler = value => socketHandler.value = value;

    return {
        username,

        socketState,
        setSocketState,
        socketHandler,
        serSocketHandler,
    };
})
