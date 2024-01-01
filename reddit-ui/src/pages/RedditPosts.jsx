import { useEffect, useState } from "react";
import axios from "axios";
import linkImage from "../assets/arrow-up-right.svg";

function RedditPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRedditPosts() {
      try {
        /*
        const response = await fetch(
        "http://localhost:5000/api/fetch-reddit-posts",
        );
        */
        // const data = await response.json();
        const response = await axios.get("/api/fetch-reddit-posts");
        const data = response.data;
        // setPosts(data.redditPosts);
        setPosts(
          data.redditPosts.map((post) => ({ ...post, showFullText: false })),
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Reddit posts:", error);
        setError("Failed to fetch Reddit posts.");
        setIsLoading(false);
      }
    }

    fetchRedditPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-b-orange-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-2">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  const toggleText = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, showFullText: !post.showFullText };
        }
        return post;
      }),
    );
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="py-6 px-24">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p>
              {post.showFullText
                ? post.selftext
                : truncateText(post.selftext, 600)}
              {post.selftext.length > 600 && (
                <>
                  <br />
                  <span
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => toggleText(post.id)}
                  >
                    {post.showFullText ? "Read Less" : "Read More"}
                    {post.showFullText ? (
                      <svg
                        className="w-5 h-5 inline-block ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 inline-block ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </>
              )}
            </p>
            <p className="text-gray-500">Author: {post.author}</p>
            <p className="text-gray-500">Score: {post.score}</p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-700 hover:text-blue-600"
            >
              Post URL
              <img
                src={linkImage}
                alt="link"
                className="w-4 h-4 inline-block ml-1"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RedditPosts;
