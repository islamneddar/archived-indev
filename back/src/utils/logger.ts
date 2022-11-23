import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        console: { type: 'console', layout: { type: 'pattern', pattern: '%d - %f : %[[%p]%] %l : %m' } },
    },
    categories: {
        default: { appenders: ['console'], level: 'trace', enableCallStack: true },
    },
});
const LOG = getLogger();

export default LOG;