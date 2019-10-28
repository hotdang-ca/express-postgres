const models = require('../database/models');

const createPost = async (req, res) => {
    try {
        const post = await models.Post.create(req.body);
        return res.status(201).json({
            post,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: [
                {
                    model: models.Comment,
                    as: 'comments',
                },
                {
                    model: models.User,
                    as: 'author',
                },
            ],
        });

        return res.status(200).json({ posts });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await models.Post.findOne({
            where: { id: postId },
            include: [
                {
                    model: models.Comment,
                    as: 'comments',
                    include: [
                        {
                            model: models.User,
                            as: 'author',
                        }
                    ],
                },
                {
                    model: models.User,
                    as: 'author',
                },
            ],
        });

        if (!post) {
            return res.status(404).json({ error: 'No such post' });
        }

        return res.status(200).json({ post });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const [ updated ] = await models.Post.update(req.body, {
            where: { id: postId },
        });


        if (!updated) {
            throw new Error('Post not found');
        }

        const updatedPost = await models.Post.findOne({ where: { id: postId }});
        return res.status(200).json({ post: updatedPost });
    } catch (err) {
        const code = err.message === 'Post not found' ? 404 : 500;

        return res.status(code).json({ error: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const deleted = await models.Post.destroy({
            where: { id: postId }
        });

        if (!deleted) {
            throw new Error('Post not found');
        }

        return res.status(204).json({});
    } catch (err) {
        const code = err.message === 'Post not found' ? 404 : 500;
        return res.status(code).json({ error: err.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};