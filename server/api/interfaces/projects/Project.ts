import mongoose, { Schema, Document } from 'mongoose';

export interface Project extends Document {
    title: string;
    imageLink: string;
    sources: Array<any>;
    techs: Array<any>;
    downloadLink: string;
    languages: Array<any>;
    description: Object;
}

const schema: Schema = new Schema({
    _id: { type: String },
    title: { type: String, required: true },
    imageLink: { type: String, required: true },
    sources: { type: Array<any>, required: true },
    techs: { type: Array<any>, required: true },
    downloadLink: { type: String, required: true },
    languages: { type: Array<any>, required: true },
    description: { type: Object, required: true },
}, { collection: 'projects' })

const ProjectModel = mongoose.model<Project>('projects', schema);

export async function getProjectByName(id: string): Promise<any> {
    try {
        return await ProjectModel.findOne({ _id: id})
    } catch (error) {
        return null;
    }
}

export async function getAllProjects(): Promise<any> {
    try {
        return await ProjectModel.find()
    } catch (error) {
        console.error("Error on getting projects: ", error);
        return null;
    }
}
