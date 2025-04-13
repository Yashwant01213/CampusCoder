// import express from 'express';
// import Post from '../models/Post.mjs';
// import Comment from '../models/Comment.mjs';
// import upload from '../middleware/Upload.mjs';

// const forumrouter = express.Router();

// forumrouter.post('/posts', upload.array('attachments'), async (req, res) => {
//   try {
//     const { title, content, author } = req.body;
//     const files = req.files as Express.Multer.File[];
//     const attachments = files.map(file => `/uploads/${file.filename}`);

//     const post = new Post({ title, content, author, attachments });
//     await post.save();

//     res.status(201).json(post);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create post' });
//   }
// });

// forumrouter.get('/posts', async (req, res) => {
//   const posts = await Post.find().populate('author').populate('comments');
//   res.json(posts);
// });

// forumrouter.post('/comments', async (req, res) => {
//   const { content, author, postId } = req.body;
//   const comment = new Comment({ content, author, post: postId });
//   await comment.save();

//   await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
//   res.status(201).json(comment);
// });

// export default forumrouter;
