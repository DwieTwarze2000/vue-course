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
                router.push({ name: 'connected' });
                break;
            case 'FAILED':
                router.push({ name: 'failed' });
                break;
            case 'ANSWERED':
                router.push({ name: 'answered' });
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
