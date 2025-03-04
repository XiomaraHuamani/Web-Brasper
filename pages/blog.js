"use client";

import PageBanner from "@/components/PageBanner";
import Layout from "@/layout";
import { useState } from "react";
import blogPosts from "@/pages/data/blogPosts";
const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <Layout>
      <PageBanner pageName={"Blogs Brasper"} />

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          {selectedPost ? (
            <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-blue-600 hover:underline mb-6 flex items-center"
              >
                ← Volver al Blog
              </button>
              <p className="text-gray-500 text-sm mb-4">{selectedPost.date}</p>
              <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
              <div className="prose prose-lg max-w-full text-gray-700 space-y-4">
                {selectedPost.content.map((item, index) => {
                  if (item.type === "title") {
                    return <h4 key={index} className="text-2xl font-bold">{item.text}</h4>;
                  }
                  if (item.type === "subtitle") {
                    return <h6 key={index} className="text-xl font-semibold">{item.text}</h6>;
                  }
                  if (item.type === "paragraph") {
                    return <p key={index}>{item.text}</p>;
                  }
                  if (item.type === "list") {
                    return (
                      <ul key={index} className="list-disc ml-6 space-y-1">
                        {item.items.map((listItem, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: listItem }}></li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="image">
                    <img
                      src="assets/images/blog/blogs.jpg"
                      alt="Blog"
                      width={300}
                      height='auto'
                    />
                  </div>
            </article>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.slug}
                  className="rounded-lg shadow-md overflow-hidden cursor-pointer bg-white hover:shadow-xl transition p-6"
                  onClick={() => setSelectedPost(post)}
                >
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                  <a className="text-blue-600 block font-medium">Leer más →</a>
                  
                </div>
                
              ))}
              
            </div>

          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-4">
        © 2025 Brasper. Todos los derechos reservados.
      </footer>
    </Layout>
  );
};

export default Blog;
