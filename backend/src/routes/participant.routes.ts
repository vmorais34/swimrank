import { Router } from 'express';
import { createParticipant } from '../controllers/participant.controller';

const participantRouter = Router();

// Post
participantRouter.post(
  '/',
  createParticipant
);

export default participantRouter;