import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Ijobpost_favourite } from './jobpost_favourite.interface';
import JobPostFavourite from './jobpost_favourite.models';

// Create Job Post Favourite
const createjobpost_favourite = async (payload: Ijobpost_favourite) => {
  // Check if the favourite entry already exists
  const existingJobPost = await JobPostFavourite.findOne({
    userId: payload.userId,
    jobpostId: payload.jobpostId,
    favourite: true,
  });

  if (existingJobPost) {
    throw new Error('Already added to your favourite list');
  }
  const newFavourite = await JobPostFavourite.create({
    ...payload,
  });
  return newFavourite;
};

// Get All Job Post Favourites
const getAlljobpost_favourite = async (query: Record<string, any>) => {
  const favouriteModel = new QueryBuilder(
    JobPostFavourite.find().populate('jobpostId'),
    query,
  )
    .search(['userId', 'jobpostId'])
    .filter()
    .paginate()
    .sort();

  const data: any = await favouriteModel.modelQuery;
  const meta = await favouriteModel.countTotal();

  return {
    data,
    meta,
  };
};

// Get Job Post Favourite by ID
const getjobpost_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    JobPostFavourite.find({ _id: id }).populate('jobpostId'),
    query,
  )
    .search(['userId', 'jobpostId'])
    .filter()
    .paginate()
    .sort();

  const data: any = await favouriteModel.modelQuery;
  const meta = await favouriteModel.countTotal();

  return {
    data,
    meta,
  };
};

const getMyjobpost_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    JobPostFavourite.find({ userId: id }).populate('jobpostId'),
    query,
  )
    .search(['userId', 'jobpostId'])
    .filter()
    .paginate()
    .sort();

  const data: any = await favouriteModel.modelQuery;
  const meta = await favouriteModel.countTotal();

  return {
    data,
    meta,
  };
};

// Update Job Post Favourite
const updatejobpost_favourite = async (id: string, jobpostId: string) => {
  const updatedFavourite = await JobPostFavourite.findByIdAndUpdate(
    id,
    { jobpostId },
    { new: true },
  );
  return updatedFavourite;
};

// Delete Job Post Favourite
const deletejobpost_favourite = async (id: string) => {
  const deletedFavourite = await JobPostFavourite.findByIdAndDelete(id);
  return deletedFavourite;
};

// const getJobPostFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const jobPostFavouriteModel = new QueryBuilder(
//     JobPostFavourite.find({ userId }).populate('jobpostId'),
//     query,
//   )
//     .search(['title']) // Adjust search fields as needed
//     .filter()
//     .paginate()
//     .sort();

//   const data: any = await jobPostFavouriteModel.modelQuery;
//   const meta = await jobPostFavouriteModel.countTotal();

//   return {
//     data,
//     meta,
//   };
// };

const getJobPostFavouriteByUserId = async (
  userId: string,
  query: Record<string, any>,
) => {
  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortField = 'createdAt',
    sortOrder = 'desc',
  } = query;

  const matchStage = { userId: new mongoose.Types.ObjectId(userId) };

  const pipeline: any = [
    { $match: matchStage },
    {
      $lookup: {
        from: 'jobposts',
        localField: 'jobpostId',
        foreignField: '_id',
        as: 'jobPostInfo',
      },
    },

    { $unwind: { path: '$jobPostInfo', preserveNullAndEmptyArrays: true } },
    {
      $match: searchTerm
        ? { 'jobPostInfo.title': { $regex: searchTerm, $options: 'i' } }
        : {},
    },
    { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
    { $skip: (page - 1) * limit },
    { $limit: parseInt(limit, 10) },
  ];

  const data = await JobPostFavourite.aggregate(pipeline);
  const total = await JobPostFavourite.countDocuments(matchStage);

  return { data, meta: { total, page, limit } };
};

export const jobpost_favouriteService = {
  createjobpost_favourite,
  getAlljobpost_favourite,
  getjobpost_favouriteById,
  updatejobpost_favourite,
  deletejobpost_favourite,
  getMyjobpost_favouriteById,
  getJobPostFavouriteByUserId,
};
