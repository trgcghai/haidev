"use client";

import { CopyButton } from "@/components/common/copy-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { absoluteUrl } from "@/lib/utils";
import { Doc } from "@/types/document";
import { ShareIcon } from "lucide-react";
import { toast } from "sonner";

const DocActions = ({ doc }: { doc: Doc }) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex items-center gap-2">
      <CopyButton
        variant="outline"
        text={doc.content}
        size={isMobile ? "icon-lg" : "lg"}
        className="gap-2 hover:text-primary"
        onCopySuccess={() => toast.success("Content copied")}
        onCopyError={() => toast.error("Failed to copy content")}
      >
        {isMobile ? "" : "Copy"}
      </CopyButton>
      <CopyButton
        variant="outline"
        text={absoluteUrl(`/blogs/${doc.slug}`)}
        size={isMobile ? "icon-lg" : "lg"}
        className="gap-2 hover:text-primary"
        idleIcon={<ShareIcon />}
        onCopySuccess={() => toast.success("Link copied")}
        onCopyError={() => toast.error("Failed to copy link")}
      >
        {isMobile ? "" : "Share"}
      </CopyButton>
    </div>
  );
};

export default DocActions;
