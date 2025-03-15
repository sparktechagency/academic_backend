import mongoose, { Schema } from 'mongoose';
import { Iarticle } from './article.interface';

const ArticleSchema: Schema<Iarticle> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    source_type: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    submission_deadline: {
      type: String,
      // required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: 'Folder',
      required: true,
    },
  },
  { timestamps: true },
);

const Article = mongoose.model<Iarticle>('Article', ArticleSchema);
export default Article;
