const logger = require('./logger').global;

async function appStart() {
    const migrate   = require('./migration')
    const app       = require('./app')
    return migrate.latest()
        .then(() => {
            const server = app.listen(8080, () => {
                logger.info('Backend PID ' + process.pid + ' listening on port 3000 ....');

                process.on('SIGTERM', () => {
                    logger.info('PID ' + process.pid + ' received SIGTERM');

                    server.close(() => {
                        logger.info('Stopping.');
                        process.exit(0);
                    });
                });
            });
        })
        .catch((error) => {
            logger.error(err.message);
            setTimeout(appStart, 10000)
        })
}


try {
    appStart()
} catch(err){
    logger.error(err.message, err);
    process.exit(1);
}