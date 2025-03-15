import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { articleService } from './article.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Article
const createarticle = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId; 
  const newArticle = await articleService.createarticle({
    ...req.body,
    userId,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article created successfully',
    data: newArticle,
  });
});

// Get All Articles
const getAllarticle = catchAsync(async (req: Request, res: Response) => {
  const articles = await articleService.getAllarticle();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article fetched successfully',
    data: articles,
  });
});

// Get Article by ID
const getarticleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const article = await articleService.getarticleById(id);
  if (!article) {
    return res.status(404).json({
      status: 'fail',
      message: 'Article not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Article fetched successfully',
    data: article,
  });
});

// Get Articles by Folder ID
const getArticlesByFolderId = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const articles = await articleService.getArticlesByFolderId(id as any);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Folder Article fetched successfully',
      data: articles,
    });
  },
);

// Update Article
const updatearticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedArticle = await articleService.updatearticle(id, req.body);
  if (!updatedArticle) {
    return res.status(404).json({
      status: 'fail',
      message: 'Article not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Folder Article updated successfully',
    data: updatedArticle,
  });
});

// Delete Article
const deletearticle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedArticle = await articleService.deletearticle(id);
  if (!deletedArticle) {
    return res.status(404).json({
      status: 'fail',
      message: 'Article not found',
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Folder Article deleted successfully',
    data: deletedArticle,
  });
});

export const articleController = {
  createarticle,
  getAllarticle,
  getarticleById,
  getArticlesByFolderId,
  updatearticle,
  deletearticle,
};
