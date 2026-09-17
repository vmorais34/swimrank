import { Router } from 'express';
import { 
  createParticipant, 
  deleteParticipant, 
  getAllParticipants, 
  getParticipantById, 
  updateParticipant
} from '../controllers/participant.controller';

const participantRouter = Router();

// Post
participantRouter.post(
  '/',
  createParticipant
);

//Get all - *A ordem importa
participantRouter.get(
  '/',
  getAllParticipants
);

//Get by ID
participantRouter.get(
  '/:id',
  getParticipantById
);

//Patch
participantRouter.patch(
  '/:id',
  updateParticipant
);

//Delete
participantRouter.delete(
  '/:id',
  deleteParticipant
);

export default participantRouter;