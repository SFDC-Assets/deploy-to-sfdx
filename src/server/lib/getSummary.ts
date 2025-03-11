import logger from 'heroku-logger';
import { DeployRequest } from './types';
import { commandSummary } from './CDS';
import { processWrapper } from './processWrapper';

export const getSummary = (localLine: string, msgJSON: DeployRequest): commandSummary => {
    if (localLine.includes('sfdx force:org:open') || localLine.includes('sf org open')) {
        return commandSummary.OPEN;
        // localLine = `${localLine} -r`;
    } else if (localLine.includes(':user:password') || localLine.includes('user password')) {
        return commandSummary.PASSWORD_GEN;
    } else if (localLine.includes(':org:create') || localLine.includes('org create')) {
        // handle the shane plugin and the stock commmand
        // no aliases allowed to keep the deployer from getting confused between deployments
        // localLine = argStripper(localLine, '--setalias');
        // localLine = argStripper(localLine, '-a');
        return commandSummary.ORG_CREATE;
    } else if (localLine.includes('sfdx force:source:push') || localLine.includes('sf project deploy start')) {
        return commandSummary.PUSH;
    } else if (localLine.includes('sfdx force:user:create') || localLine.includes('sf org create user')) {
        return commandSummary.USER_CREATE;
    } else if (localLine.includes('sfdx force:apex:execute') || localLine.includes('sf apex run')) {
        return commandSummary.APEX_EXEC;
    } else if (localLine.includes('sfdx force:user:permset') || localLine.includes('sf org user permset')) {
        return commandSummary.PERMSET;
    } else if (localLine.includes('sfdx force:data:') || localLine.includes('sfdx automig:load') || localLine.includes('sf automig load')) {
        return commandSummary.DATA;
    } else if (localLine.includes(':package:install') || localLine.includes('sf package install')) {
        return commandSummary.PACKAGE;
    } else if (localLine.includes('sfdx force:mdapi:deploy')) {
        return commandSummary.DEPLOY;
    } else if (localLine.includes('sfdx shane:heroku:repo:deploy')) {
        if (!processWrapper.HEROKU_API_KEY) {
            // check that heroku API key is defined in processWrapper
            logger.error('there is no HEROKU_API_KEY defined, but shane:heroku:repo:deploy is used in an .orgInit', {
                repo: `${msgJSON.repos[0].username}/${msgJSON.repos[0].repo}`
            });
        }
        return commandSummary.HEROKU_DEPLOY;
    } else {
        logger.info('unhandled command will show up directly in the UI', {
            command: localLine,
            repo: `${msgJSON.repos[0].username}/${msgJSON.repos[0].repo}`
        });
        return undefined;
    }
};