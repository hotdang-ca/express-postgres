const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app).post('/api/posts')
            .send({
                userId: 1,
                title: 'test is cool',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('post');
    });

    it('should return the post created', async () => {
        const res = await request(app).get('/api/posts/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post.title).toEqual('test is cool');
        expect(res.body.post.id).toEqual(1);
    });
    it('should list number of posts created', async () => {
        await request(app).post('/api/posts')
            .send({
                userId: 2,
                title: 'I\m just a second test.',
            });
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('posts');
        expect(res.body.posts.length).toEqual(2);
    });

    it('should delete a post', async () => {
        const deleteResponse = await request(app).delete('/api/posts/2');
        const fetchResponse = await request(app).get('/api/posts/2');
        const listResponse = await request(app).get('/api/posts');

        expect(deleteResponse.statusCode).toEqual(204);
        expect(fetchResponse.statusCode).toEqual(404);
        expect(listResponse.statusCode).toEqual(200);
        expect(listResponse.body).toHaveProperty('posts');
        expect(listResponse.body.posts.length).toEqual(1);
    });
});
