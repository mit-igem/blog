import { BlogPosts } from 'app/components/posts'

export default function Page() {

  return (
    <section>
      <div className="my-4">
        <h1 className="text-3xl font-bold">Blog</h1>
      </div>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
