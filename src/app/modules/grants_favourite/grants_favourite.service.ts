import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Igrants_favourite } from './grants_favourite.interface';
import GrantsFavourite from './grants_favourite.models';

// Create Grants Favourite
const creategrants_favourite = async (payload: Igrants_favourite) => {
  // Check if the favourite entry already exists
  const existingGrants = await GrantsFavourite.findOne({
    userId: payload.userId,
    grantsId: payload.grantsId,
    favourite: true,
  });

  if (existingGrants) {
    throw new Error('Already added to your favourite list');
  }
  const newFavourite = await GrantsFavourite.create({
    ...payload,
  });
  return newFavourite;
};

// Get All Grants Favourites
const getAllgrants_favourite = async (query: Record<string, any>) => {
  const favouriteModel = new QueryBuilder(
    GrantsFavourite.find().populate('grantsId'),
    query,
  )
    .search(['userId', 'grantsId'])
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

// Get Grants Favourite by ID
const getgrants_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    GrantsFavourite.find({ _id: id }).populate('grantsId'),
    query,
  )
    .search(['userId', 'grantsId'])
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

const getMygrants_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    GrantsFavourite.find({ userId: id }).populate('grantsId'),
    query,
  )
    .search(['userId', 'grantsId'])
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

// Update Grants Favourite
const updategrants_favourite = async (id: string, grantsId: string) => {
  const updatedFavourite = await GrantsFavourite.findByIdAndUpdate(
    id,
    { grantsId },
    { new: true },
  );
  return updatedFavourite;
};

// Delete Grants Favourite
const deletegrants_favourite = async (id: string) => {
  const deletedFavourite = await GrantsFavourite.findByIdAndDelete(id);
  return deletedFavourite;
};

// const getgrants_FavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const grantsFavouriteModel = new QueryBuilder(
//     GrantsFavourite.find({ userId }).populate('grantsId'),
//     query,
//   )
//     .search(['title']) // Adjust search fields as needed
//     .filter()
//     .paginate()
//     .sort();

//   const data: any = await grantsFavouriteModel.modelQuery;
//   const meta = await grantsFavouriteModel.countTotal();

//   return {
//     data,
//     meta,
//   };
// };

const getgrants_FavouriteByUserId = async (
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
        from: 'grants',
        localField: 'grantsId',
        foreignField: '_id',
        as: 'grantInfo',
      },
    },
    { $unwind: { path: '$grantInfo', preserveNullAndEmptyArrays: true } },
    {
      $match: searchTerm
        ? { 'grantInfo.name': { $regex: searchTerm, $options: 'i' } }
        : {},
    },
    { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
    { $skip: (page - 1) * limit },
    { $limit: parseInt(limit, 10) },
  ];

  const data = await GrantsFavourite.aggregate(pipeline);
  const total = await GrantsFavourite.countDocuments(matchStage);

  return { data, meta: { total, page, limit } };
};

export const grants_favouriteService = {
  creategrants_favourite,
  getAllgrants_favourite,
  getgrants_favouriteById,
  updategrants_favourite,
  deletegrants_favourite,
  getMygrants_favouriteById,
  getgrants_FavouriteByUserId,
};
