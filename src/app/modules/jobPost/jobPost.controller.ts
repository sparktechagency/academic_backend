// Controller
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { jobPostService } from './jobPost.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createjobPost = catchAsync(async (req: Request, res: Response) => {
  req.body.userId = req?.user?.userId;
  const jobPost = await jobPostService.createjobPost(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'jobPost created successfully',
    data: jobPost,
  });
});

const getAlljobPost = catchAsync(async (req: Request, res: Response) => {
  const jobPosts = await jobPostService.getAlljobPost(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'jobPost fetched successfully',
    data: jobPosts,
  });
});

const getjobPostById = catchAsync(async (req: Request, res: Response) => {
  const jobPost = await jobPostService.getjobPostById(req.params.id, req.query);
  if (!jobPost) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Job Post not found' });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'jobPost fetched successfully',
    data: jobPost,
  });
});

const getMyjobPostById = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId;
  const jobPost = await jobPostService.getMyjobPostById(id, req.query);
  if (!jobPost) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Job Post not found' });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My jobPost fetched successfully',
    data: jobPost,
  });
});

const updatejobPost = catchAsync(async (req: Request, res: Response) => {
  const jobPost = await jobPostService.updatejobPost(req.params.id, req.body);
  if (!jobPost) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Job Post not found' });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'jobPost updated successfully',
    data: jobPost,
  });
});

const deletejobPost = catchAsync(async (req: Request, res: Response) => {
  const jobPost = await jobPostService.deletejobPost(req.params.id);
  if (!jobPost) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Job Post not found' });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'jobPost deleted successfully',
    data: jobPost,
  });
});

const getJobPostByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const JobPosts = await jobPostService.getJobPostByUserId(userId, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Call for Papers retrieved successfully',
    data: JobPosts,
  });
});

export const jobPostController = {
  createjobPost,
  getAlljobPost,
  getjobPostById,
  updatejobPost,
  deletejobPost,
  getMyjobPostById,
  getJobPostByUserId,
};
