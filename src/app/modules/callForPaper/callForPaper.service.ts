// Service

import QueryBuilder from '../../builder/QueryBuilder';
import { IcallForPaper } from './callForPaper.interface';
import CallForPaper from './callForPaper.models';

const createcallForPaper = async (data: IcallForPaper) => {
  const newCallForPaper = await CallForPaper.create(data);
  return newCallForPaper;
};

const getAllcallForPaper = async (query: Record<string, any>) => {
  const callForPaperModel = new QueryBuilder(
    CallForPaper.find().populate('userId'),
    query,
  )
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await callForPaperModel.modelQuery;
  const meta = await callForPaperModel.countTotal();

  return {
    data,
    meta,
  };
};

const getcallForPaperById = async (id: string, query: Record<string, any>) => {
  const callForPaperModel = new QueryBuilder(
    CallForPaper.find({ _id: id }),
    query,
  )
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await callForPaperModel.modelQuery;
  const meta = await callForPaperModel.countTotal();

  return {
    data,
    meta,
  };
};

const getMycallForPaperById = async (
  id: string,
  query: Record<string, any>,
) => {
  const callForPaperModel = new QueryBuilder(
    CallForPaper.find({ userId: id }),
    query,
  )
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await callForPaperModel.modelQuery;
  const meta = await callForPaperModel.countTotal();

  return {
    data,
    meta,
  };
};

const updatecallForPaper = async (id: string, data: Partial<IcallForPaper>) => {
  const updatedCallForPaper = await CallForPaper.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedCallForPaper;
};

const deletecallForPaper = async (id: string) => {
  const deletedCallForPaper = await CallForPaper.findByIdAndDelete(id);
  return deletedCallForPaper;
};

const getCallForPaperByUserId = async (
  userId: string,
  query: Record<string, any>,
) => {
  const callForPaperModel = new QueryBuilder(
    CallForPaper.find({ userId }),
    query,
  )
    .search(['title'])
    .filter()
    .paginate()
    .sort();

  const data: any = await callForPaperModel.modelQuery;
  const meta = await callForPaperModel.countTotal();

  return {
    data,
    meta,
  };
};

export const callForPaperService = {
  createcallForPaper,
  getAllcallForPaper,
  getcallForPaperById,
  updatecallForPaper,
  deletecallForPaper,
  getMycallForPaperById,
  getCallForPaperByUserId,
};
