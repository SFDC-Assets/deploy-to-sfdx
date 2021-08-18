import logger from 'heroku-logger';

import { getDeployRequest } from './redisNormal';
import { pooledOrgFinder } from './pooledOrgFinder';
import { build } from './commonBuild';
import { isByoo, getPoolKey } from './namedUtilities';

import { DeployRequest } from './types';

const check = async (): Promise<boolean> => {
    // pull the oldest thing on the queue
    // will throw an error if the queue is empty.  handle somewhere
    let msgJSON: DeployRequest;

    try {
        msgJSON = await getDeployRequest(true);
    } catch (e) {
        // throws on empty queue
        return false;
    }

    try {
        msgJSON.visitor.event('Deploy Request', getPoolKey(msgJSON, '-')).send();
    } catch (e) {
        logger.warn('failed to send GA event');
        logger.debug(e);
    }

    // don't use org pools for byoo
    if (!isByoo(msgJSON) && (await pooledOrgFinder(msgJSON))) {
        logger.debug('deployQueueCheck: using a pooled org');
    } else {
        logger.debug('deployQueueCheck: using a one off org');
        logger.debug(JSON.stringify(msgJSON));
        const buildresult = await build(msgJSON);
        logger.debug(JSON.stringify(buildresult));
    }

    return true;
};

export = check;
