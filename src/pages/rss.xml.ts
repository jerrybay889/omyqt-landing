import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../content/site';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'OMYQT 블로그',
    description: site.seo.description,
    site: context.site.toString(),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>ko</language>',
  });
}
