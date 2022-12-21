/**
 * TrainingVideo-test.js
 * Created by Andrea Blackwell 12/21/22
 */

import VideoMetadata from 'models/v2/video/VideoMetadata';
import metadata from 'dataMapping/trainingVideos/playListMetadata';

const sampleVideo = Object.create(VideoMetadata);
sampleVideo.populate(metadata.items[0]);

describe('TrainingVideo', () => {
    it ('should contain a full URL to a YouTube video', () => {
        expect(sampleVideo.url).toEqual('https://www.youtube.com/watch?v=AEKL2LOkRZY');
    });

    it ('should include a title', () => {
        expect(sampleVideo.title).not.toEqual('');
    });

    it ('should include a description', () => {
        expect(sampleVideo.description).not.toEqual('');
    });

    it ('should include a published at date', () => {
        expect(sampleVideo.publishedAt).not.toEqual('');
    });

    it ('should include a duration', () => {
        expect(sampleVideo.duration).not.toEqual('');
    });

    it ('should include a default thumbnail', () => {
        expect(sampleVideo.thumbnails.default.url).not.toEqual('');
    });
});