import { config } from '@/config/config';
import { useMainStore } from '@/stores/main';

class WebSocketService {
  constructor() {
    this.url = config.websocket.url;
    this.reconnectInterval = config.websocket.reconnectInterval;
    this.maxReconnectAttempts = config.websocket.maxReconnectAttempts;
    this.ws = null;
    this.reconnectAttempts = 0;
    console.log('WebSocketService constructor called with URL:', this.url);
    this.connect();
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      console.log('WebSocket connection attempt started');

      this.ws.onopen = () => {
        console.log('WebSocket connection established');
        this.reconnectAttempts = 0;
        console.log('Attempting to send subscription message');
        this.send({
          r: 'subscribe',
          a: {
            p: 'data://websocket_connections',
          },
        });

        this.send({
          r: 'subscribe',
          a: {
            p: 'data://admin_users',
          },
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Raw data from WebSocket:', data);
          // Pass data to the store for processing
          const store = useMainStore();
          if (!store) {
            console.warn('Store not available when processing WebSocket data');
            return;
          }
          store.handleWebSocketData(data);
        } catch (error) {
          console.error('Failed to parse WebSocket data:', error);
          console.log('Raw event data:', event.data);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed');
        const store = useMainStore();
        store.idle = false; // Connection is no longer alive
        this.reconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        if (this.ws) {
          this.ws.close();
        }
      };
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnection attempt: ${this.reconnectAttempts}`);
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Maximum reconnection attempts exceeded');
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('Sending message to WebSocket:', data);
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not open, message not sent. Current state:', this.ws?.readyState);
    }
  }

  close() {
    if (this.ws) {
      console.log('Closing WebSocket connection');
      this.ws.close();
    }
  }
}

export default new WebSocketService();