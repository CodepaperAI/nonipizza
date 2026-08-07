/**
 * Uplift AI Blog Integration Layer
 *
 * Connects directly to Uplift AI REST API:
 * - List: GET https://api.upliftai.co/api/public/v1/blogs/YOUR_TOKEN
 * - Detail: GET https://api.upliftai.co/api/public/v1/blogs/YOUR_TOKEN/BLOG_SLUG
 */

export interface BlogMeta {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

export interface BlogCustomFields {
  readingTime?: string;
  rating?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "PUBLISH" | "DRAFT" | "ALL";
  publishDate: string;
  publishTime?: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName: string;
  authorUrl?: string;
  meta?: BlogMeta;
  customFields?: BlogCustomFields;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogListResponse {
  success: boolean;
  data?: {
    blogs: BlogPost[];
    pagination: BlogPagination;
  };
  error?: string;
}

export interface BlogDetailResponse {
  success: boolean;
  data?: {
    blog: BlogPost;
  };
  error?: string;
}

/** Fetch published blog posts directly from Uplift AI API */
export async function getBlogPosts(options?: {
  page?: number;
  limit?: number;
}): Promise<{ blogs: BlogPost[]; pagination: BlogPagination }> {
  const token =
    process.env.UPLIFTAI_BLOG_TOKEN ||
    process.env.NEXT_PUBLIC_UPLIFTAI_BLOG_TOKEN ||
    process.env.UPLIFTAI_TOKEN;

  if (!token) {
    console.warn("[Uplift AI Blog API] No UPLIFTAI_BLOG_TOKEN configured in environment.");
    return {
      blogs: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };
  }

  try {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;
    // Browser/path-token friendly endpoint
    const url = `https://api.upliftai.co/api/public/v1/blogs/${token}?page=${page}&limit=${limit}&status=PUBLISH`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const json: BlogListResponse = await res.json();
      if (json.success && json.data?.blogs) {
        return {
          blogs: json.data.blogs,
          pagination: json.data.pagination ?? {
            page,
            limit,
            total: json.data.blogs.length,
            totalPages: 1,
          },
        };
      }
    } else {
      console.error(`[Uplift AI Blog API] HTTP ${res.status}: ${res.statusText}`);
    }
  } catch (err) {
    console.error("[Uplift AI Blog API] Fetch error:", err);
  }

  return {
    blogs: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  };
}

/** Fetch single blog post by slug directly from Uplift AI API */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const token =
    process.env.UPLIFTAI_BLOG_TOKEN ||
    process.env.NEXT_PUBLIC_UPLIFTAI_BLOG_TOKEN ||
    process.env.UPLIFTAI_TOKEN;

  if (!token) {
    console.warn("[Uplift AI Blog API] No UPLIFTAI_BLOG_TOKEN configured in environment.");
    return undefined;
  }

  try {
    const url = `https://api.upliftai.co/api/public/v1/blogs/${token}/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const json: BlogDetailResponse = await res.json();
      if (json.success && json.data?.blog) {
        return json.data.blog;
      }
    } else {
      console.error(`[Uplift AI Blog API Detail] HTTP ${res.status} for ${slug}`);
    }
  } catch (err) {
    console.error(`[Uplift AI Blog API Detail] Fetch error for ${slug}:`, err);
  }

  return undefined;
}
