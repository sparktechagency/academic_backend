import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { Imember_favourite } from './member_favourite.interface';
import MemberFavourite from './member_favourite.models';

// Create Member Favourite
const createmember_favourite = async (payload: Imember_favourite) => {
  // Check if the favourite entry already exists
  const existingMember = await MemberFavourite.findOne({
    userId: payload.userId,
    memberId: payload.memberId,
    favourite: true,
  });

  if (existingMember) {
    throw new Error('Already added to your favourite list');
  }
  const newFavourite = await MemberFavourite.create(payload);
  return newFavourite;
};

// Get All Member Favourites
const getAllmember_favourite = async (query: Record<string, any>) => {
  const favouriteModel = new QueryBuilder(
    MemberFavourite.find().populate('memberId'),
    query,
  )
    .search(['userId', 'memberId'])
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

// Get Member Favourite by ID
const getmember_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    MemberFavourite.find({ _id: id }).populate('memberId'),
    query,
  )
    .search(['userId', 'memberId'])
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

const getMymember_favouriteById = async (
  id: string,
  query: Record<string, any>,
) => {
  const favouriteModel = new QueryBuilder(
    MemberFavourite.find({ userId: id }).populate('memberId'),
    query,
  )
    .search(['userId', 'memberId'])
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

// Update Member Favourite
const updatemember_favourite = async (id: string, memberId: string) => {
  const updatedFavourite = await MemberFavourite.findByIdAndUpdate(
    id,
    { memberId },
    { new: true },
  );
  return updatedFavourite;
};

// Delete Member Favourite
const deletemember_favourite = async (id: string) => {
  const deletedFavourite = await MemberFavourite.findByIdAndDelete(id);
  return deletedFavourite;
};

// const getMemberFavouriteByUserId = async (
//   userId: string,
//   query: Record<string, any>,
// ) => {
//   const favouriteModel = new QueryBuilder(
//     MemberFavourite.find({ userId }).populate('memberId'),
//     query,
//   )
//     .search(['userId', 'memberId'])
//     .filter()
//     .paginate()
//     .sort();

//   const data: any = await favouriteModel.modelQuery;
//   const meta = await favouriteModel.countTotal();

//   return {
//     data,
//     meta,
//   };
// };

const getMemberFavouriteByUserId = async (
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
        from: 'users',
        localField: 'memberId',
        foreignField: '_id',
        as: 'memberInfo',
      },
    },
    { $unwind: { path: '$memberInfo', preserveNullAndEmptyArrays: true } },
    {
      $match: searchTerm
        ? { 'memberInfo.name': { $regex: searchTerm, $options: 'i' } }
        : {},
    },
    { $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } },
    { $skip: (page - 1) * limit },
    { $limit: parseInt(limit, 10) },
  ];

  const data = await MemberFavourite.aggregate(pipeline);
  const total = await MemberFavourite.countDocuments(matchStage);

  return { data, meta: { total, page, limit } };
};

export const member_favouriteService = {
  createmember_favourite,
  getAllmember_favourite,
  getmember_favouriteById,
  updatemember_favourite,
  deletemember_favourite,
  getMymember_favouriteById,
  getMemberFavouriteByUserId,
};
