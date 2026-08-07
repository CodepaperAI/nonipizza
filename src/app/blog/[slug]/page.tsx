import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const { blogs } = await getBlogPosts({ limit: 50 });
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post)
    return buildMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      path: `/blog/${params.slug}`,
    });

  return buildMetadata({
    title: `${post.meta?.seoTitle || post.title} | Noni's Blog`,
    description: post.meta?.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.featuredImage,
  });
}

export default async function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.publishDate,
    dateModified: post.updatedAt || post.publishDate,
    author: {
      "@type": "Person",
      name: post.authorName || "Noni's Culinary Team",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd,
        ]}
      />

      {/* Hero header */}
      <section className="bg-maroon py-16 text-cream sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase">
            <Link href="/blog" className="text-orange hover:underline">
              ← Back to Journal
            </Link>
            {post.categories?.[0] && (
              <>
                <span>•</span>
                <Pill variant="active">{post.categories[0]}</Pill>
              </>
            )}
          </div>

          <h1 className="mt-4 font-display uppercase text-display-xl text-cream leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-cream/80 border-t border-cream/15 pt-4">
            <p>By <strong className="text-cream">{post.authorName || "Noni's Kitchen"}</strong></p>
            <span>•</span>
            <p>{post.publishDate}</p>
            {post.customFields?.readingTime && (
              <>
                <span>•</span>
                <p>{post.customFields.readingTime}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-maroon/10">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
                priority
                unoptimized
              />
            </div>
          )}

          {/* Post Content Body */}
          <div
            className="prose max-w-none text-ink text-body-lg leading-relaxed
              [&>h2]:font-display [&>h2]:text-display-lg [&>h2]:uppercase [&>h2]:text-maroon [&>h2]:mt-8 [&>h2]:mb-4
              [&>h3]:font-display [&>h3]:text-heading-md [&>h3]:uppercase [&>h3]:text-maroon [&>h3]:mt-6 [&>h3]:mb-3
              [&>p]:mb-4
              [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-1
              [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-1
              [&>blockquote]:border-l-4 [&>blockquote]:border-orange [&>blockquote]:bg-white [&>blockquote]:p-4 [&>blockquote]:rounded-r-2xl [&>blockquote]:font-bold [&>blockquote]:text-maroon [&>blockquote]:my-6
              [&>p.lead]:text-xl [&>p.lead]:font-semibold [&>p.lead]:text-maroon"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 border-t border-maroon/15 pt-6">
              <p className="mb-3 text-xs font-bold uppercase text-muted">Topics & Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3.5 py-1 text-xs font-bold text-maroon ring-1 ring-maroon/15"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 flex justify-between items-center border-t border-maroon/15 pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-2.5 text-sm font-bold uppercase text-cream hover:bg-orange transition"
            >
              ← All Stories
            </Link>
            <a
              href={siteConfig.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase text-orange hover:underline"
            >
              Order Online Now →
            </a>
          </div>
        </div>
      </article>

      <OrderCTA heading="Inspired to Try Noni's?" sub="Order online for pickup at 300 Main St or delivery across Woodstock." />
    </>
  );
}
