import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  // Fetch products from Stripe
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="rounded bg-gradient-to-r from-neutral-50 to-neutral-100 py-10 sm:py-16">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-10 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-5">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Discover Quality. Shop Smart.
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Welcome to <span className="font-semibold">TrendMart</span> — a
              modern eCommerce experience built for simplicity, speed, and
              style. Browse exclusive deals curated just for you.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white hover:bg-neutral-800"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                Explore Products
              </Link>
            </Button>
          </div>

          <Image
            alt="Featured Product"
            src={products.data[0].images[0]}
            className="rounded shadow-lg"
            width={450}
            height={450}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 sm:py-14">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
            Featured Picks for You
          </h3>
          <p className="text-neutral-600 mt-2">
            Handpicked items from our latest collection — trending now.
          </p>
        </div>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
