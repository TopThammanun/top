import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "./slash-command";
import RootBlock from "./root-block";
import Keymap from "./keymap";
import { Node } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";

export const TipTapEditorExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-4",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-200 p-5 font-mono font-medium text-gray-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-black",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
  }),
  Placeholder.configure({
    placeholder : "Press '/' for commands, or enter some text...",
    includeChildren: true,
    emptyEditorClass:
    'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-1 before:left-0 before:text-mauve-11 before:opacity-50 before:pointer-events-none before:whitespace-pre-wrap',
  }),
  SlashCommand,
  Document,
  RootBlock,
  Keymap,
  Image,
];
