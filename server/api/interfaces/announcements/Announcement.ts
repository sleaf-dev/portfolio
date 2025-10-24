import mongoose, { Schema, Document } from 'mongoose';

export interface Announcement extends Document {
    text: Object;
}

const schema: Schema = new Schema({
    _id: { type: String },
    text: { type: Object, required: true },
}, { collection: 'announcements' })

const AnnouncementModel = mongoose.model<Announcement>('announcements', schema);

export async function getAllAnnouncements(): Promise<any> {
    try {
        return await AnnouncementModel.find()
    } catch (error) {
        console.error("Error on getting projects: ", error);
        return null;
    }
}