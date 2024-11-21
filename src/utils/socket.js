import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/useUserStore.js";
import { getJsonParse } from "@/utils/index.js";

export class Ws {
    ws;
    socketStatus;
    message;
    timer;

    constructor() {
        this.ws = null;
        this.socketStatus = false;
        this.message = ref();
    }

    /** 建立连接 */
    connect (url) {
        this.ws = new WebSocket(url);
        this.ws.onopen = this.onopen.bind(this);
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onclose = this.onclose.bind(this);
        this.ws.onerror = this.onerror.bind(this);
    }

    /**
     * websocket初始化
     * @return {Promise<never>|Promise<unknown>}
     */
    init () {
        return new Promise((resolve, reject) => {
            this.connect(import.meta.env.VITE_GLOB_SOCKET_URL);
            let connectionCount = 1;
            let timerID = setInterval(() => {
                console.log(`:::websocket 尝试第${connectionCount}次发送消息...:::`);
                if (this.socketStatus) {
                    this.send('connect success');
                    clearTimeout(timerID);
                    timerID = null;
                    resolve();
                } else if (connectionCount >= 3) {
                    clearTimeout(timerID);
                    timerID = null;
                    reject('网络异常');
                }
                connectionCount++;
            }, 1000)
        })
    }

    /** 连接成功 */
    onopen () {
        this.socketStatus = true;
        const userStore = useUserStore();
        userStore.setSocketState(true);
        console.log('websocket连接成功');
    }

    /** 接收消息 */
    onmessage (e) {
        const userStore = useUserStore();
        const { socketHandler } = storeToRefs(userStore);
        this.message.value = e.data;
        const res = getJsonParse(e.data);
        console.log(':::接收消息:::', res);
        if (res) {
            socketHandler.value(res);
        }
    }

    /** 连接关闭 */
    onclose () {
        this.socketStatus = false;
        const userStore = useUserStore();
        userStore.setSocketState(false);
        console.log(':::websocket连接关闭:::');
        if (!this.timer) this.reconnect();
    }

    /** 连接失败 */
    onerror (e) {
        this.socketStatus = false;
        const userStore = useUserStore();
        userStore.updateErrorInfo('error', 'socket连接断开', 500);
        console.log(':::websocket连接失败:::');
        if (!this.timer) this.reconnect();
    }

    reconnect () {
        this.timer = setInterval(() => {
            this.init().then(() => {
                clearInterval(this.timer);
                this.timer = null;
                location.reload(true);
            })
        }, 10 * 1000)
    }

    /** 发送消息 */
    send (message) {
        if (this.ws && this.socketStatus) {
            console.log(':::发送消息:::', message);
            this.ws.send(JSON.stringify(message));
        }
    }
}
