import { Metadata } from "next";
import { Folder } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ROUTES } from "@/constants/config";
import { JsonLdScript } from "@/components/JsonLdScript";
import { blogsPageJsonLd } from "@/constants/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs - Công Hải",
    alternates: {
      canonical: ROUTES.BLOGS.url,
    },
    openGraph: {
      url: ROUTES.BLOGS.url,
    },
  };
}

const BlogListPage = () => {
  return (
    <div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle className="text-lg font-semibold">
            No Blogs Yet
          </EmptyTitle>
          <EmptyDescription className="text-sm text-muted-foreground">
            I am currently working on this section, and it will be available
            soon. Stay tuned for updates!
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <JsonLdScript data={blogsPageJsonLd} />
    </div>
  );
};

export default BlogListPage;
