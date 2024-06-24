import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import Link from 'next/link';
import Head from 'next/head';
import { Metadata } from 'next';

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      slug
    }
  }
`;
export const metadata = {
  title: 'Coding Beauty',
  description:
    'codingbeautydev.com: Coding - the art, the science, and the passion.',
};
export default async function Post({ params }) {
  const { slug } = params;
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  const post = data.post;
  //console.log(data);
  return (
    <div>
      <Head>
        <title>{post.title} - Your Site Name</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <Link href="/blog">
        Back to Blog
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  const GET_ALL_POST_SLUGS = gql`
    query GetAllPostSlugs {
      posts(first: 100) {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_ALL_POST_SLUGS,
  });
  return data.posts.nodes.map(post => ({
    slug: post.slug,
  }));
}