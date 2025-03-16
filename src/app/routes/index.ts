import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';
import { termsRoutes } from '../modules/terms/terms.route';
import { privacyRoutes } from '../modules/privacy/privacy.route';
import { callForPaperRoutes } from '../modules/callForPaper/callForPaper.route';
import { eventRoutes } from '../modules/event/event.route';
import Grants from '../modules/grants/grants.models';
import { grantsRoutes } from '../modules/grants/grants.route';
import { jobPostRoutes } from '../modules/jobPost/jobPost.route';
import { member_favouriteRoutes } from '../modules/member_favourite/member_favourite.route';
import { callForpaper_favouriteRoutes } from '../modules/callForpaper_favourite/callForpaper_favourite.route';
import { event_favouriteRoutes } from '../modules/event_favourite/event_favourite.route';
import { grants_favouriteRoutes } from '../modules/grants_favourite/grants_favourite.route';
import { jobpost_favouriteRoutes } from '../modules/jobpost_favourite/jobpost_favourite.route';
import { make_folderRoutes } from '../modules/make_folder/make_folder.route';
import { articleRoutes } from '../modules/article/article.route';
import { AdminRoutes } from '../modules/Admin/Admin.route';
import { subscriberRoutes } from '../modules/subscriber/subscriber.route';
import { invitationRoutes } from '../modules/invitation/invitation.route';
import { calenderRoutes } from '../modules/calender/calender.route';
import { chatRoutes } from '../modules/chat/chat.route';
import { imageUploadRoutes } from '../modules/imageUpload/imageUpload.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/privacy',
    route: privacyRoutes,
  },
  {
    path: '/terms',
    route: termsRoutes,
  },
  {
    path: '/callForPaper',
    route: callForPaperRoutes,
  },
  {
    path: '/event',
    route: eventRoutes,
  },
  {
    path: '/grants',
    route: grantsRoutes,
  },
  {
    path: '/jobPost',
    route: jobPostRoutes,
  },
  {
    path: '/callForPaper_favorite',
    route: callForpaper_favouriteRoutes,
  },
  {
    path: '/event_favorite',
    route: event_favouriteRoutes,
  },
  {
    path: '/grants_favorite',
    route: grants_favouriteRoutes,
  },
  {
    path: '/jobPost_favorite',
    route: jobpost_favouriteRoutes,
  },
  {
    path: '/member_favorite',
    route: member_favouriteRoutes,
  },
  {
    path: '/make_folder',
    route: make_folderRoutes,
  },
  {
    path: '/article',
    route: articleRoutes,
  },
  {
    path: '/admindashboard',
    route: AdminRoutes,
  },
  {
    path: '/subscriber',
    route: subscriberRoutes,
  },
  {
    path: '/invite',
    route: invitationRoutes,
  },
  {
    path: '/calender',
    route: calenderRoutes,
  },
  {
    path: '/chat',
    route: chatRoutes,
  },
  {
    path: '/image',
    route: imageUploadRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
