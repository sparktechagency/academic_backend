"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calenderService = void 0;
const event_models_1 = __importDefault(require("../event/event.models"));
const callForPaper_models_1 = __importDefault(require("../callForPaper/callForPaper.models"));
const callForpaper_favourite_models_1 = __importDefault(require("../callForpaper_favourite/callForpaper_favourite.models"));
const event_favourite_models_1 = __importDefault(require("../event_favourite/event_favourite.models"));
const jobpost_favourite_models_1 = __importDefault(require("../jobpost_favourite/jobpost_favourite.models"));
const grants_favourite_models_1 = __importDefault(require("../grants_favourite/grants_favourite.models"));
const jobPost_models_1 = __importDefault(require("../jobPost/jobPost.models"));
const grants_models_1 = __importDefault(require("../grants/grants.models"));
const getUserFavouriteCalendar = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all user favourites
    const [callForPaperFavourites, eventFavourites, jobPostFavourites, grantsFavourites,] = yield Promise.all([
        callForpaper_favourite_models_1.default.find({ userId }),
        event_favourite_models_1.default.find({ userId }),
        jobpost_favourite_models_1.default.find({ userId }),
        grants_favourite_models_1.default.find({ userId }),
    ]);
    // Extract IDs
    const callForPaperIds = callForPaperFavourites.map(fav => fav.callForPaperId);
    const eventIds = eventFavourites.map(fav => fav.eventId);
    const jobPostIds = jobPostFavourites.map(fav => fav.jobpostId);
    const grantsIds = grantsFavourites.map(fav => fav.grantsId);
    // Fetch actual data from related collections
    const [events, callForPapers, jobPosts, grants] = yield Promise.all([
        event_models_1.default.find({ _id: { $in: eventIds } }, { event_end_date: 1 }),
        callForPaper_models_1.default.find({ _id: { $in: callForPaperIds } }, { abstract_submission_deadline: 1 }),
        jobPost_models_1.default.find({ _id: { $in: jobPostIds } }, { application_deadline: 1 }),
        grants_models_1.default.find({ _id: { $in: grantsIds } }, { application_deadline: 1 }),
    ]);
    return {
        events: events.map(event => ({
            eventId: event._id,
            event_end_date: event.event_end_date,
        })),
        callForPapers: callForPapers.map(callForPaper => ({
            callForPaperId: callForPaper._id,
            abstract_submission_deadline: callForPaper.abstract_submission_deadline,
        })),
        jobPosts: jobPosts.map(jobPost => ({
            jobPostId: jobPost._id,
            job_deadline: jobPost.application_deadline,
        })),
        grants: grants.map(grant => ({
            grantsId: grant._id,
            grant_deadline: grant.application_deadline,
        })),
    };
});
exports.calenderService = {
    getUserFavouriteCalendar,
};
