import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';
import ServiceController from './app/controllers/ServiceController';
import ServiceTypeController from './app/controllers/ServiceTypeController';
import AvailableController from './app/controllers/AvailableController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/services', ServiceController.store);
routes.put('/services/:id', ServiceController.update);
routes.get('/services', ServiceController.index);
routes.get('/services/:id', ServiceController.show);
routes.delete('/services/:id', ServiceController.delete);

routes.post('/service_types', ServiceTypeController.store);
routes.put('/service_types/:id', ServiceTypeController.update);
routes.get('/service_types', ServiceTypeController.index);
routes.get('/service_types/:id', ServiceTypeController.show);
routes.delete('/service_types/:id', ServiceTypeController.delete);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

export default routes;
