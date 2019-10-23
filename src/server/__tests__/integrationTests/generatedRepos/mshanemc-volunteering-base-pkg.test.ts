
import { deployCheck } from './../../helpers/deployCheck';
import { sfdxTimeout } from './../../helpers/testingUtils';

test('non-pool grab of the org mshanemc/volunteering-base-pkg', async () => {
    await deployCheck('mshanemc', 'volunteering-base-pkg');
}, sfdxTimeout);     