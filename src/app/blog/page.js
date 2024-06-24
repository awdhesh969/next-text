import client from "@/lib/apolloClient"
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    posts(first: 10) {
      nodes {
        id
        title
        content
        slug
      }
    }
  }
`;
const Blog = async () => {
  const { data } = await client.query({
    query: GET_BLOG_POSTS,
  });

  const posts = data.posts.nodes;
  return (
    <div>
      <Head>
        <title>Blog - Your Site Name</title>
        <meta name="description" content="Your blog description for SEO purposes." />
      </Head>
      <h1>Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
             
                <h2 style={{color: "red",fontSize: "30px"}}>{post.title}</h2>
             
            </Link>
            <div dangerouslySetInnerHTML={{__html: post.content}}></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
export const revalidate = 10;