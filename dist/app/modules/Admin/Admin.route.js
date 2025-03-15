"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const Admin_controller_1 = require("./Admin.controller");
const router = (0, express_1.Router)();
router.get('/count-Admin', 
//   auth(USER_ROLE.admin),
Admin_controller_1.AdminController.getAllCalCulation);
router.get('/dashboard', 
//   auth(USER_ROLE.admin),
Admin_controller_1.AdminController.dashboardData);
exports.AdminRoutes = router;
