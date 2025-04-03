export const config = {
  // WebSocket settings
  websocket: {
    url: 'wss://hub-works.online:8443/websocket/1.0/admin/',
    reconnectInterval: 5000, // 5 seconds
    maxReconnectAttempts: 10,
  },

  // Other URLs
  api: {
    baseUrl: 'https://hub-works.online:8443',
  },

  // Session/Login URLs
  session: {
    loginUrl: 'https://hub-works.online:8443/admin/authentication/login/',
  },

  // Environment setting
  env: import.meta.env.MODE || 'development',
};