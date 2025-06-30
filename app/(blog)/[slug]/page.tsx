import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from '@/(blog)/utils'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  const env = process.env.NODE_ENV

  if (!post) {
    notFound()
  }

  if (!post.published && env === 'production') {
    notFound()
  }

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)} {post.metadata.updatedAt && `(Last updated: ${formatDate(post.metadata.updatedAt)})`}
        </p>
      </div>
      <article className="prose">
        <CustomMDX dir={post.dir} source={post.content} />
      </article>
    </section>
  )
}
