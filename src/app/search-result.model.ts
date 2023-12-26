export class Result {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: any;

    constructor(object?: any) {
        this.id = object && object.id || null;
        this.title = object && object.title || null;
        this.description = object && object.description || null;
        this.thumbnailUrl = object && object.thumbnailUrl || null;
        this.videoUrl = object && object.videoUrl || `https://www.youtube.com/watch?v=${this.id}`;
        this.duration = object && object.duration || null;
    }
}