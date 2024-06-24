import client from "../apolloClient";
export async function getStaticProps() {
    try {
      const { data } = await client.query({
        query: GET_BLOG_POSTS,
      });
  
      return {
        props: {
          posts: data.posts.nodes,
        },
        revalidate: 60, // Re-generate the page every 60 seconds if new requests come in
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return {
        props: {
          posts: [],
        },
      };
    }
  }