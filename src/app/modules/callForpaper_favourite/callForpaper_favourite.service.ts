import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IcallForPaper_favourite } from './callForpaper_favourite.interface';
import CallForpaperFavourite from './callForpaper_favourite.models';

// Create Call for Paper Favourite
const createcallForpaper_favourite = async (
  payload: IcallForPaper_favourite,
) => {
  // Check if the favourite entry already exists
  const existingFavourite = await CallForpaperFavourite.findOne({
    userId: payload.userId,
    callForPaperId: payload.callForPaperId,
    favourite: true,
  });

  if (existingFavourite) {
    throw new Error('Already added to your favourite list');
  }
  const newFavourite = await CallForpaperFavourite.create({
    ...payload,
  });
  return newFavourite;
};

// Get All Call for Paper Favourites
const getAllcallForpaper_favourite = async (query: Record<string, any>) => {
  const favouriteModel = new QueryBuilder(
    CallForpaperFavourite.find().populate('callForPaperId'),
    query,
  )
    .search(['userId', 'callForPaperId'])
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

// Get Call for Paper Favourite by ID
const getcallForpaper_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    CallForpaperFavourite.find({ _id: id }).populate('callForPaperId'),
    query,
  )
    .search(['userId', 'callForPaperId'])
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

const getMycallForpaper_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    CallForpaperFavourite.find({ userId: id }).populate('callForPaperId'),
    query,
  )
    .search(['userId', 'callForPaperId'])
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

// Update Call for Paper Favourite
const updatecallForpaper_favourite = async (
  id: string,
  callForPaperId: string,
) => {
  const updatedFavourite = await CallForpaperFavourite.findByIdAndUpdate(
    id,
    { callForPaperId },
    { new: true },
  );
  return updatedFavourite;
};

// Delete Call for Paper Favourite
const deletecallForpaper_favourite = async (id: string) => {
  const deletedFavourite = await CallForpaperFavourite.findByIdAndDelete(id);
  return deletedFavourite;
};

// const getCallForPaperFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const callForPaperFavouriteModel = new QueryBuilder(
//     CallForpaperFavourite.find({ userId }).populate('callForPaperId'),
//     query,
//   )
//     .search(['title']) // You can adjust the search fields as needed
//     .filter()
//     .paginate()
//     .sort();

//   const data: any = await callForPaperFavouriteModel.modelQuery;
//   const meta = await callForPaperFavouriteModel.countTotal();

//   return {
//     data,
//     meta,
//   };
// };

const getCallForPaperFavouriteByUserId = async (
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
        from: 'callforpapers', // Ensure this matches your actual collection name
        localField: 'callForPaperId',
        foreignField: '_id',
        as: 'callForPaperInfo',
      },
    },
    {
      $unwind: {
        path: '$callForPaperInfo',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: searchTerm
        ? { 'callForPaperInfo.title': { $regex: searchTerm, $options: 'i' } }
        : {},
    },
    { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
    { $skip: (page - 1) * limit },
    { $limit: parseInt(limit, 10) },
  ];

  const data = await CallForpaperFavourite.aggregate(pipeline);
  const total = await CallForpaperFavourite.countDocuments(matchStage);

  return {
    data,
    meta: {
      total,
      page,
      limit,
    },
  };
};

export const callForpaper_favouriteService = {
  createcallForpaper_favourite,
  getAllcallForpaper_favourite,
  getcallForpaper_favouriteById,
  updatecallForpaper_favourite,
  deletecallForpaper_favourite,
  getMycallForpaper_favouriteById,
  getCallForPaperFavouriteByUserId,
};
