import router from '../router';
import io from 'socket.io-client';
class ViewManager {
    constructor() {
        this.status = null;
        this.socket = null;
    }
    changeView() {
        switch (this.status) {
            case 'CONNECTED':
                router.push({ name: 'connected', params: { forwarded: true } });
                break;
            case 'FAILED':
                router.push({ name: 'failed', params: { forwarded: true } });
                break;
            case 'ANSWERED':
                router.push({ name: 'answered', params: { forwarded: true } });
        }
    }
    checkStatus() {
        this.socket = io('http://localhost:3000', {
            reconnection: false,
            transports: ['websocket', 'polling'],
        });
        this.socket.on('status', (status) => {
            this.status = status;
            this.changeView();
        });
    }

    stopPolling() {
        this.socket.disconnect();
    }
}

export default new ViewManager();
