import { Request } from 'express';
import Event from '../event/event.models';
import CallForPaper from '../callForPaper/callForPaper.models';
import CallForpaperFavourite from '../callForpaper_favourite/callForpaper_favourite.models';
import EventFavourite from '../event_favourite/event_favourite.models';
import JobPostFavourite from '../jobpost_favourite/jobpost_favourite.models';
import GrantsFavourite from '../grants_favourite/grants_favourite.models';
import JobPost from '../jobPost/jobPost.models';
import Grants from '../grants/grants.models';

const getUserFavouriteCalendar = async (userId: string) => {
  // Fetch all user favourites
  const [
    callForPaperFavourites,
    eventFavourites,
    jobPostFavourites,
    grantsFavourites,
  ] = await Promise.all([
    CallForpaperFavourite.find({ userId }),
    EventFavourite.find({ userId }),
    JobPostFavourite.find({ userId }),
    GrantsFavourite.find({ userId }),
  ]);

  // Extract IDs
  const callForPaperIds = callForPaperFavourites.map(fav => fav.callForPaperId);
  const eventIds = eventFavourites.map(fav => fav.eventId);
  const jobPostIds = jobPostFavourites.map(fav => fav.jobpostId);
  const grantsIds = grantsFavourites.map(fav => fav.grantsId);

  // Fetch actual data from related collections
  const [events, callForPapers, jobPosts, grants] = await Promise.all([
    Event.find({ _id: { $in: eventIds } }, { event_end_date: 1 }),
    CallForPaper.find(
      { _id: { $in: callForPaperIds } },
      { abstract_submission_deadline: 1 },
    ),
    JobPost.find({ _id: { $in: jobPostIds } }, { application_deadline: 1 }),
    Grants.find({ _id: { $in: grantsIds } }, { application_deadline: 1 }),
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
};

export const calenderService = {
  getUserFavouriteCalendar,
};
