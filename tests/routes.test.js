const request = require('supertest');
const app = require('../server');

describe('Default Endpoints', () => {
    it('should respond with welcome', async () => {
        const res = await request(app).get('/api');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({});
        expect(res.text).toEqual('Welcome');
    });
});

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

    it('should fail finding an unknown post', async () => {
        const res = await request(app).get('/api/posts/999');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
    })

    it('should fail creating invalid post', async () => {
        try {
            const res = await request(app).post('/api/posts')
                .send({});
        } catch (err) {
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('error');
        }
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

    it('should fail to delete an unknown post', async () => {
        const res = await request(app).delete('/api/posts/999');
        expect(res.statusCode).toEqual(404);
    });

    it('should update a post', async () => {
        const updateResponse = await request(app).put('/api/posts/1')
            .send({
                userId: 2,
                title: 'Updated title',
            });
        const newFetchReseponse = await request(app).get('/api/posts/1');

        expect(updateResponse.statusCode).toEqual(200);
        expect(updateResponse.body).toHaveProperty('post');
        expect(newFetchReseponse.body).toHaveProperty('post');
        expect(updateResponse.body.post.title).toEqual(newFetchReseponse.body.post.title);
    });

    it('should fail to update an unknown post', async () => {
        const res = await request(app).put('/api/posts/999')
            .send({
                userId: 1,
                title: 'I will never exist.'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('error');
    });

    it('should fail to update an invalid post', async () => {
        const res = await request(app).put('/api/posts/1')
            .send({
                userId: "not a number"
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('error');
    });
});
