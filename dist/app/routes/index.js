"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otp_routes_1 = require("../modules/otp/otp.routes");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const notificaiton_route_1 = require("../modules/notification/notificaiton.route");
const terms_route_1 = require("../modules/terms/terms.route");
const privacy_route_1 = require("../modules/privacy/privacy.route");
const callForPaper_route_1 = require("../modules/callForPaper/callForPaper.route");
const event_route_1 = require("../modules/event/event.route");
const grants_route_1 = require("../modules/grants/grants.route");
const jobPost_route_1 = require("../modules/jobPost/jobPost.route");
const member_favourite_route_1 = require("../modules/member_favourite/member_favourite.route");
const callForpaper_favourite_route_1 = require("../modules/callForpaper_favourite/callForpaper_favourite.route");
const event_favourite_route_1 = require("../modules/event_favourite/event_favourite.route");
const grants_favourite_route_1 = require("../modules/grants_favourite/grants_favourite.route");
const jobpost_favourite_route_1 = require("../modules/jobpost_favourite/jobpost_favourite.route");
const make_folder_route_1 = require("../modules/make_folder/make_folder.route");
const article_route_1 = require("../modules/article/article.route");
const Admin_route_1 = require("../modules/Admin/Admin.route");
const subscriber_route_1 = require("../modules/subscriber/subscriber.route");
const invitation_route_1 = require("../modules/invitation/invitation.route");
const calender_route_1 = require("../modules/calender/calender.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/otp',
        route: otp_routes_1.otpRoutes,
    },
    {
        path: '/notifications',
        route: notificaiton_route_1.notificationRoutes,
    },
    {
        path: '/privacy',
        route: privacy_route_1.privacyRoutes,
    },
    {
        path: '/terms',
        route: terms_route_1.termsRoutes,
    },
    {
        path: '/callForPaper',
        route: callForPaper_route_1.callForPaperRoutes,
    },
    {
        path: '/event',
        route: event_route_1.eventRoutes,
    },
    {
        path: '/grants',
        route: grants_route_1.grantsRoutes,
    },
    {
        path: '/jobPost',
        route: jobPost_route_1.jobPostRoutes,
    },
    {
        path: '/callForPaper_favorite',
        route: callForpaper_favourite_route_1.callForpaper_favouriteRoutes,
    },
    {
        path: '/event_favorite',
        route: event_favourite_route_1.event_favouriteRoutes,
    },
    {
        path: '/grants_favorite',
        route: grants_favourite_route_1.grants_favouriteRoutes,
    },
    {
        path: '/jobPost_favorite',
        route: jobpost_favourite_route_1.jobpost_favouriteRoutes,
    },
    {
        path: '/member_favorite',
        route: member_favourite_route_1.member_favouriteRoutes,
    },
    {
        path: '/make_folder',
        route: make_folder_route_1.make_folderRoutes,
    },
    {
        path: '/article',
        route: article_route_1.articleRoutes,
    },
    {
        path: '/admindashboard',
        route: Admin_route_1.AdminRoutes,
    },
    {
        path: '/subscriber',
        route: subscriber_route_1.subscriberRoutes,
    },
    {
        path: '/invite',
        route: invitation_route_1.invitationRoutes,
    },
    {
        path: '/calender',
        route: calender_route_1.calenderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
