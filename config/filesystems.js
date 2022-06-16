const appConfig = require('./app')

// TODO: create a url generator in helpers/url.js. This should generate a link given a file name (i.e., base url + file name)
module.exports = {
  default: process.env.FILESYSTEM_DRIVER || 'local',
  local: {
    url: `${appConfig.url}:${appConfig.port}`,
  },
  public: {
    url: `${appConfig.url}:${appConfig.port}`,
    storagePath: 'storage/app/public/'
  }
}