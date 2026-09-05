import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Clears the cache for the content type that just changed, so a publish in the
 * Studio shows on the site within seconds rather than waiting for the hourly
 * backstop.
 *
 * Set this up once:
 *   1. Add SANITY_REVALIDATE_SECRET to .env.local (any long random string).
 *   2. In sanity.io/manage → API → Webhooks, add a webhook:
 *        URL     https://your-domain.com/api/revalidate
 *        Trigger on   Create, Update, Delete
 *        Secret  the same value
 *        Projection  {_type}
 *
 * Until then everything still works — content just refreshes on the hour.
 */
export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad request: no _type in payload", { status: 400 });
    }

    // `{ expire: 0 }` rather than the recommended "max": that serves the stale
    // copy once more while refetching, which reads as "I published and nothing
    // happened" to an editor checking their work. Publish volume on a four-page
    // site is far too low for the thundering-herd risk that "max" guards against.
    revalidateTag(body._type, { expire: 0 });
    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (error) {
    console.error("[revalidate] webhook failed:", error);
    return new NextResponse("Error revalidating", { status: 500 });
  }
}
