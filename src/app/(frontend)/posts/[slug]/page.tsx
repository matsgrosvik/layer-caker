import { client, sanityFetch } from "@/sanity/lib/client";
import { Post } from "@/components/Post";
import { notFound } from "next/navigation";
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);

  return slugs;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await sanityFetch({
    query: POST_QUERY,
    params: resolvedParams,
    tags: [`post:${resolvedParams.slug}`, "author", "category"],
    revalidate: 3600,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}
