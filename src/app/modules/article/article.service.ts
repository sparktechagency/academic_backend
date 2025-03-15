import Article from './article.models';
import { Iarticle } from './article.interface';

// Create Article
const createarticle = async (articleData: Iarticle) => {
  const newArticle = await Article.create(articleData);
  return newArticle;
};

// Get All Articles
const getAllarticle = async () => {
  const articles = await Article.find();
  return articles;
};

// Get Article by ID
const getarticleById = async (id: string) => {
  const article = await Article.findById(id);
  return article;
};

// Get Articles by Folder ID
const getArticlesByFolderId = async (id: string) => {
  const articles = await Article.find({ folderId: id });
  return articles;
};

// Update Article
const updatearticle = async (id: string, updateData: Partial<Iarticle>) => {
  const updatedArticle = await Article.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedArticle;
};

// Delete Article
const deletearticle = async (id: string) => {
  const deletedArticle = await Article.findByIdAndDelete(id);
  return deletedArticle;
};

export const articleService = {
  createarticle,
  getAllarticle,
  getarticleById,
  getArticlesByFolderId,
  updatearticle,
  deletearticle,
};
