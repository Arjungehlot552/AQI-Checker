import React from "react";
import { useLocation } from "react-router-dom";

const BlogPage = () => {
  const { state } = useLocation(); // Retrieve the passed state
  const blog = state?.blog;

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">No blog data available</p>
      </div>
    );
  }

  const relatedBlogs = [
    {
      id: 1,
      imageUrl: 'https://media.licdn.com/dms/image/D4D12AQFsRabQR2dM6Q/article-cover_image-shrink_720_1280/0/1714741271802?e=2147483647&v=beta&t=8WmE4IWw9DoKEiY4xjgnXQShYY31flil2flTaN2dvxQ',
      title: 'Related Blog Title 1',
      description: 'A short description of the blog.',
    },
    {
      id: 2,
      imageUrl: 'https://images04.nicepage.com/feature/583347/blog-category.jpg',
      title: 'Related Blog Title 2',
      description: 'A short description of the blog.',
    },
    {
      id: 3,
      imageUrl: 'https://cdn.pixabay.com/photo/2023/03/11/22/19/nature-7845443_1280.jpg',
      title: 'Related Blog Title 3',
      description: 'A short description of the blog.',
    },
    {
      id: 4,
      imageUrl: 'https://i0.wp.com/thepublicationplan.com/wp-content/uploads/2023/08/No-artificial-ingredients-Nature-against-gen-AI.jpeg?resize=1360%2C777&ssl=1',
      title: 'Related Blog Title 4',
      description: 'A short description of the blog.',
    },
    {
      id: 5,
      imageUrl: 'https://i.ytimg.com/vi/sWkkZaNGSiU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBfzj3gaMbbxtTu3zMLVfPK_3ttoA',
      title: 'Related Blog Title 5',
      description: 'A short description of the blog.',
    },
    {
      id: 6,
      imageUrl: 'https://www.dnpindiahindi.in/wp-content/uploads/2023/11/Burari-Demolition-Notice-.webp',
      title: 'Related Blog Title 6',
      description: 'A short description of the blog.',
    },
  ];

  return (
    <div style={{ backgroundColor: "rgb(5, 8, 22)" }} className=" text-white mt-12 min-h-screen px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Blog Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
        />

        {/* Blog Content */}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-400 mb-6">Published on: {blog.date}</p>
        <p className="text-lg leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur, nulla ut vehicula gravida, nisi purus varius elit, a
          tincidunt magna ligula eget libero. Suspendisse potenti. Vivamus
          fermentum, erat eget sodales euismod, justo mauris tempus magna, at
          mollis purus sapien at risus. {blog.title} content continues here...
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-4 border-t border-gray-700 pt-6 mb-12">
          <img
            src="https://w7.pngwing.com/pngs/839/708/png-transparent-writing-paper-book-publishing-light-writer-photography-reading-author.png"
            alt="Author"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">Author Name</h3>
            <p className="text-sm text-gray-400">Expert in Environmental Studies</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Related Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-400">{blog.description}</p>
          </div>
        ))}
        <div/>
      </div>

        {/* Comment Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Leave a Comment</h2>
          <form className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Comment</label>
              <textarea
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                rows="5"
                placeholder="Your comment"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 px-6 py-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
