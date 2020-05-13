
const app = require('./src/index');
const config = require('./src/config')
const Logger = require('./src/utils/logger')
app.listen(config.PORT, () => {
    Logger.info('✌️ Server is up and running on port number ' + config.PORT);
});