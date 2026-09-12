"use client";

import { Dictionary } from "@/app/[lang]/dictionaries";
import { CopyButton } from "@/components/common/copy-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { absoluteUrl } from "@/lib/utils";
import { Doc } from "@/types/document";
import { ShareIcon } from "lucide-react";
import { toast } from "sonner";

interface DocActionsProps {
  doc: Doc;
  dict: Dictionary["common"]["docActions"];
}

const DocActions = ({ doc, dict }: DocActionsProps) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex items-center gap-2">
      <CopyButton
        variant="outline"
        text={doc.content}
        size={isMobile ? "icon-lg" : "lg"}
        className="gap-2 hover:text-primary"
        onCopySuccess={() => toast.success(dict.contentCopied)}
        onCopyError={() => toast.error(dict.failedToCopyContent)}
      >
        {isMobile ? "" : dict.copy}
      </CopyButton>
      <CopyButton
        variant="outline"
        text={absoluteUrl(`/blogs/${doc.slug}`)}
        size={isMobile ? "icon-lg" : "lg"}
        className="gap-2 hover:text-primary"
        idleIcon={<ShareIcon />}
        onCopySuccess={() => toast.success(dict.linkCopied)}
        onCopyError={() => toast.error(dict.failedToCopyLink)}
      >
        {isMobile ? "" : dict.share}
      </CopyButton>
    </div>
  );
};

export default DocActions;
