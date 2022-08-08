import MuxPlayer from "@mux/mux-player-react";
import cn from "classnames";
import {
  isBlockquote,
  isHeading,
  isList,
  isParagraph,
  isRoot,
} from "datocms-structured-text-utils";
import type { FC } from "react";
import {
  Image,
  renderNodeRule,
  StructuredText,
  StructuredTextGraphQlResponse,
} from "react-datocms";
import type { MediaAssetRecord } from "../lib/datocms/types";

interface BodyProps {
  postOrArtworkId: string;
  postOrArtworkTitle: string;
  body: StructuredTextGraphQlResponse<
    MediaAssetRecord & { id: string; __typename: string },
    any
  >;
}

export const Body: FC<BodyProps> = ({
  body,
  postOrArtworkId,
  postOrArtworkTitle,
}) => {
  return (
    <StructuredText
      data={body}
      customNodeRules={[
        renderNodeRule(
          isHeading,
          ({ adapter: { renderNode }, node, children, key }) => {
            const level = Math.max(2, node.level);
            return renderNode(`h${level}`, {
              key,
              className: cn([
                "mb-8",
                { 2: "text-2xl", 3: "text-xl", 4: "text-lg", 5: "text-lg" }[
                  level
                ],
              ]),
              children,
            });
          }
        ),
        renderNodeRule(
          isParagraph,
          ({ adapter: { renderNode }, children, key, ancestors }) => {
            const isTopLevelParagraph = isRoot(ancestors[0]);
            return renderNode("p", {
              key,
              className: cn([isTopLevelParagraph ? "mb-8" : "mb-4"]),
              children,
            });
          }
        ),
        renderNodeRule(
          isList,
          ({ adapter: { renderNode }, node, children, key }) => {
            const isOrdered = node.style === "numbered";
            return renderNode(isOrdered ? "ol" : "ul", {
              key,
              className: cn([
                "mb-8 ml-8",
                isOrdered ? "list-disc" : "list-decimal",
              ]),
              children,
            });
          }
        ),
        renderNodeRule(
          isBlockquote,
          ({ adapter: { renderNode }, children, key }) => {
            return renderNode("blockquote", {
              key,
              className: "mb-8 italic",
              children,
            });
          }
        ),
      ]}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case "MediaAssetRecord":
            return record.media.responsiveImage ? (
              <Image
                className="mx-auto mb-8"
                data={record.media.responsiveImage}
              />
            ) : record.media.video ? (
              <div className="mx-auto mb-8">
                <MuxPlayer
                  streamType="on-demand"
                  playbackId={record.media.video.muxPlaybackId}
                  metadata={{
                    video_id: postOrArtworkId,
                    video_title: postOrArtworkTitle,
                  }}
                />
              </div>
            ) : null;
          default:
            return null;
        }
      }}
    />
  );
};
