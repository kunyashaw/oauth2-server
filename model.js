/**
 * Constructor.
 */
function InMemoryCache() {
    var date_now = new Date();
    date_now.setDate(date_now.getDate()+1);
    this.clients = [{ clientId : 'thom', grants: ['authorization_code','password'], clientSecret : 'nightworld', redirectUris : ['http://localhost:3000'] }];
    this.tokens = [{user: {}, accessTokenExpiresAt:date_now, accessToken: 'foobar'}];
    this.users = [{ id : '123', username: 'thomseddon', password: 'nightworld' }];
  }
  /**
   * Dump the cache.
   */
  InMemoryCache.prototype.dump = function() {
    console.log('clients', this.clients);
    console.log('tokens', this.tokens);
    console.log('users', this.users);
  };
  /*
   * Get access token.
   */
  InMemoryCache.prototype.getAccessToken = function(bearerToken) {
    var tokens = this.tokens.filter(function(token) {
      return token.accessToken === bearerToken;
    });
  
  
    return tokens.length ? tokens[0] : false;
  };
  
  
  /**
   * Get refresh token.
   */
  InMemoryCache.prototype.getRefreshToken = function(bearerToken) {
    var tokens = this.tokens.filter(function(token) {
      return token.refreshToken === bearerToken;
    });
    return tokens.length ? tokens[0] : false;
  };
  /**
   * Get client.
   */
  InMemoryCache.prototype.getClient = function(clientId, clientSecret) {
    var clients = this.clients.filter(function(client) {
      return client.clientId === clientId;
    });
    if(clients.length > 0) {
      if(clientSecret === null) { //authroize handler doesn't care clientSecret
        return clients[0];
      } else if( clients[0].clientSecret === clientSecret) { //token handler does care clientSecret
        return clients[0];
      }
    }
    return false;
    // return clients.length ? clients[0] : false;
  };
  /**
   * Save Authorization code.
   */
  InMemoryCache.prototype.saveAuthorizationCode = function(clientId, clientSecret) {
    return { authorizationCode: 123456 };
  };
  /**
   * Save token.
   */
  InMemoryCache.prototype.saveToken = function(token, client, user) {
    this.tokens.push({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      clientId: client.clientId,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      userId: user.id
    });
    return { accessToken: 'foobar', client: {}, user: {} };
  };
  /*
   * Get user.
   */
  InMemoryCache.prototype.getUser = function(username, password) {
    var users = this.users.filter(function(user) {
      return user.username === username && user.password === password;
    });
    return users.length ? users[0] : false;
  };
  /**
   * Export constructor.
   */
  module.exports = InMemoryCache;