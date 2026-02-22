import mongoose, { Schema, Document } from 'mongoose';

export interface Project extends Document {
  name: string;
  description: object;
  icon: string;
  image: string;
  url: string;
}

const schema: Schema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    description: { type: Object, required: true },
    icon: { type: Array<any>, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
  },
  { collection: 'projects' },
);

const ProjectModel = mongoose.model<Project>('projects', schema);

export async function getProjectByName(id: string): Promise<any> {
  try {
    return await ProjectModel.findOne({ _id: id });
  } catch (error) {
    return null;
  }
}

export async function getProjects(): Promise<any> {
  try {
    return await ProjectModel.find().sort({ $natural: -1 });
  } catch (error) {
    console.error('Error on getting projects: ', error);
    return null;
  }
}
