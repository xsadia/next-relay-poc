import { Document, Schema, model } from "mongoose";

export interface IPost extends Document {
  postedBy?: string;
  content: string;
  createdAt: Date;
}

const schema = new Schema(
  {
    postedBy: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true } }
);

export const Post = model<IPost>("Post", schema);
