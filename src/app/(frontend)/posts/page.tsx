import { POSTS_QUERY } from "@/sanity/lib/queries";
import { PostCard } from "@/components/PostCard";
import { Title } from "@/components/Title";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Page() {
  const posts = await sanityFetch({
    query: POSTS_QUERY,
    tags: ["post", "author", "category"],
    revalidate: 3600,
  });

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Post Index</Title>
      <div className="flex flex-col gap-24 py-12">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </main>
  );
}
