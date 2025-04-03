import { defineStore } from 'pinia';
import { config } from '@/config/config';

export const useMainStore = defineStore('main', {
  state: () => ({
    config: {},
    user: {},
    account: {},
    websocket_connections: {},
    admin_users: {},
    idle: false, // Tracks if connection is alive based on idle messages
    pulse: false, // Toggles every second for UI feedback
  }),

  actions: {
    // Handle incoming WebSocket data
    handleWebSocketData(data) {
      const dataPath = data.p;
      const writeMode = data.wm;
      const dataContent = data.d;

      let targetTree;
      if (dataPath === 'pub://config') {
        targetTree = 'config';
      } else if (dataPath === 'prv://user') {
        targetTree = 'user';
      } else if (dataPath === 'prv://account') {
        targetTree = 'account';
      } else if (dataPath === 'data://websocket_connections') {
        targetTree = 'websocket_connections';
      } else if (dataPath === 'data://admin_users') {
        targetTree = 'admin_users';
      } else if (dataPath === 'con://idle') {
        this.idle = true; // Connection is alive
        console.log('Idle message received, connection is alive');
        return;
      } else if (dataPath === 'con://error') {
        console.log("HATA HATA HATA")
        this.handleWebSocketError(data); // Hata durumunu yönlendir
        //return;
      } else {
        console.warn('Unknown data path:', dataPath);
        return;
      }

      this.processWriteMode(targetTree, writeMode, dataContent);
    },

    handleWebSocketError(data) {
      const dataPath = data.p;
      // if (dataPath === 'con://error') {
      //   if (data.e && data.e.name === 'client_exception/session_required') {
      //     console.warn('Session required error received, redirecting to login...');
      //     console.warn('Redirecting to:', config.session.loginUrl);
      //     window.location.href = config.session.loginUrl; // Hard reload 
      //   } else if (data.e && data.e.name === 'client_exception/login_required') {
      //     console.warn('Login required error received, redirecting to login...');
      //     console.warn('Redirecting to:', config.session.loginUrl);
      //     window.location.href = config.session.loginUrl; // Hard reload 
      //   } else {
      //     console.warn('Unhandled error received:', data.e);
      //   }
      // }
    },

    // Start the pulse effect for UI
    startPulse() {
      setInterval(() => {
        if (this.idle) {
          this.pulse = !this.pulse; // Toggle pulse every second
        } else {
          this.pulse = false; // Stop pulsing if connection is not alive
        }
      }, 1000); // Every 1 second
    },

    // Process wm (f, u, rm) recursively - no changes here
    processWriteMode(targetTree, writeMode, dataContent) {
      switch (writeMode) {
        case 'f':
          this[targetTree] = { ...dataContent };
          console.log(`${targetTree} fully updated with:`, this[targetTree]);
          Object.values(dataContent).forEach(item => {
            if (item.wm) {
              this.processNestedWriteMode(targetTree, item);
            }
          });
          break;

        case 'u':
          Object.entries(dataContent).forEach(([key, value]) => {
            if (value.wm) {
              this.processNestedWriteMode(targetTree, value);
            } else {
              this[targetTree][key] = {
                ...this[targetTree][key],
                ...value,
              };
              console.log(`${targetTree} updated item with key ${key}:`, this[targetTree][key]);
            }
          });
          break;

        case 'rm':
          if (dataContent.id) {
            delete this[targetTree][dataContent.id];
            console.log(`${targetTree} removed item with ID ${dataContent.id}`);
          } else {
            console.warn('Remove data missing ID:', dataContent);
          }
          break;

        default:
          console.warn('Unknown write mode:', writeMode);
      }
    },

    processNestedWriteMode(targetTree, nestedData) {
      const nestedWriteMode = nestedData.wm;
      const nestedId = nestedData.id || Object.keys(nestedData)[0];

      switch (nestedWriteMode) {
        case 'f':
          this[targetTree][nestedId] = { ...nestedData };
          console.log(`Nested full update for ${targetTree} item with ID ${nestedId}:`, this[targetTree][nestedId]);
          break;

        case 'u':
          if (nestedId) {
            this[targetTree][nestedId] = {
              ...this[targetTree][nestedId],
              ...nestedData,
            };
            console.log(`Nested update for ${targetTree} item with ID ${nestedId}:`, this[targetTree][nestedId]);
          }
          break;

        case 'rm':
          if (nestedId) {
            delete this[targetTree][nestedId];
            console.log(`Nested remove for ${targetTree} item with ID ${nestedId}`);
          }
          break;

        default:
          console.warn('Unknown nested write mode:', nestedWriteMode);
      }
    },
  },
});