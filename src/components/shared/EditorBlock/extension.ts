import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import SlashCommand from "./slash-command";
import RootBlock from "./root-block";
import Keymap from "./keymap";
import { Node } from "@tiptap/core";

const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "rootblock+",
});

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
    placeholder: "Press '/' for commands, or enter some text...",
    includeChildren: true,
    showOnlyWhenEditable: false,
  }),
  SlashCommand,
  // Document,
  RootBlock,
  Keymap,
];
