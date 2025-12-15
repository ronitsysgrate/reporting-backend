import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import { agentLoginLogoutReport, agentStatusDurationReport } from '../controllers/timecard.controller';

const timecardRouter = Router();

timecardRouter.get('/login-logout', authenticate, agentLoginLogoutReport);
timecardRouter.get('/status', authenticate, agentStatusDurationReport);

export default timecardRouter;