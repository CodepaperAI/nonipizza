import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getBlogPosts } from "@/lib/blog";
import type { Accent } from "@/data/deals";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Food & Pizza Blog in Woodstock | Noni's",
  description:
    "Read pizza stories, Indian-fusion insights, baked wing guides & kitchen news from Noni's Pizza & Wings in Woodstock, ON. Order online today.",
  path: "/blog",
});

const ACCENTS: Accent[] = ["orange", "yellow", "sky", "pink", "red"];

const CARD_BORDER: Record<Accent, string> = {
  orange: "border-orange",
  yellow: "border-yellow",
  sky: "border-sky",
  pink: "border-pink",
  red: "border-red",
};

export default async function BlogPage() {
  const { blogs } = await getBlogPosts({ limit: 12 });
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="Journal & Blog"
        title="Food, Fusion & Pizza Stories"
        lead="Discover the craft behind our Indian-fusion pizzas, baked wing recipes, and Woodstock food culture — freshly prepared and served with passion."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      {/* Blog section */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          {blogs.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-card border-4 border-orange">
              <Pill variant="active">Uplift AI Journal</Pill>
              <h2 className="mt-4 font-display uppercase text-heading-md lg:text-display-lg text-maroon">
                No Articles Published Yet
              </h2>
              <p className="mt-3 text-body text-muted">
                Articles published in your Uplift AI dashboard will appear here automatically.
              </p>
              <p className="mt-4 text-xs font-mono bg-cream-200 p-3 rounded-xl text-maroon text-left overflow-x-auto">
                Set <strong>UPLIFTAI_BLOG_TOKEN</strong> in your .env file to fetch live posts.
              </p>
            </div>
          ) : (
            <>
              {/* Featured Post Hero Card */}
              {featured && (
                <div className="mb-16">
                  <div className="text-center mb-6">
                    <Pill variant="active">Featured Story</Pill>
                  </div>
                  <article className="grid gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-card transition hover:-translate-y-1 lg:grid-cols-2 lg:items-center lg:p-8">
                    {featured.featuredImage && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-cream-200">
                        <Image
                          src={featured.featuredImage}
                          alt={featured.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 580px"
                          priority
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase text-muted">
                        {featured.categories?.[0] && (
                          <span className="rounded-full bg-yellow px-3 py-1 text-maroon">
                            {featured.categories[0]}
                          </span>
                        )}
                        <span>{featured.publishDate}</span>
                        {featured.customFields?.readingTime && (
                          <span>• {featured.customFields.readingTime}</span>
                        )}
                      </div>
                      <h2 className="mt-3 font-display uppercase text-heading-md lg:text-display-lg text-maroon leading-tight">
                        <Link href={`/blog/${featured.slug}`} className="hover:text-orange">
                          {featured.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-body text-muted line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="mt-6">
                        <Link
                          href={`/blog/${featured.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-bold uppercase text-cream transition hover:bg-orange"
                        >
                          Read Full Story →
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Grid of Remaining Posts */}
              {rest.length > 0 && (
                <>
                  <div className="text-center mb-10">
                    <h2 className="font-display uppercase text-display-xl text-maroon">
                      Latest Articles
                    </h2>
                    <p className="mt-2 text-body-lg text-muted">
                      Explore food guides, combo tips, and kitchen stories.
                    </p>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, i) => {
                      const accent = ACCENTS[i % ACCENTS.length];
                      return (
                        <article
                          key={post.id || post.slug}
                          className={`flex flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-card border-4 ${CARD_BORDER[accent]} transition hover:-translate-y-1`}
                        >
                          {post.featuredImage && (
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-cream-200">
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 380px"
                                unoptimized
                              />
                            </div>
                          )}
                          <div className="flex flex-1 flex-col pt-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase text-muted">
                              {post.categories?.[0] && (
                                <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-maroon">
                                  {post.categories[0]}
                                </span>
                              )}
                              <span>{post.publishDate}</span>
                            </div>
                            <h3 className="mt-2 font-display uppercase text-heading-md text-maroon leading-tight line-clamp-2">
                              <Link href={`/blog/${post.slug}`} className="hover:text-orange">
                                {post.title}
                              </Link>
                            </h3>
                            <p className="mt-2 text-sm text-muted line-clamp-3 flex-1">
                              {post.excerpt}
                            </p>
                            <div className="mt-5 pt-3 border-t border-maroon/10 flex items-center justify-between">
                              <span className="text-xs font-bold text-muted">
                                {post.customFields?.readingTime || "3 min read"}
                              </span>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-xs font-bold uppercase text-orange hover:underline"
                              >
                                Read Story →
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <OrderCTA heading="Craving Fresh Food Tonight?" sub="Order online for pickup or fast delivery in Woodstock." />
    </>
  );
}
