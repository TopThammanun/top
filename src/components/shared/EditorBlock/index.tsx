"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect, useTransition, Fragment } from "react";
import { useRouter } from "next/navigation";
import { TipTapEditorExtensions } from "./extension";
import { TipTapEditorProps } from "./props";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/store";
import { titleAction } from "@/store/reducers/title";

type Props = {
  content: any;
  setContent: any;
};

export default function Editor(props: Props) {
  const router = useRouter();
  const [saveStatus, setSaveStatus] = useState<string>("Saved");
  const [title, setTitle] = useState<string>("Untitled");
  const { setContent, content } = props;
  const titleState = useSelector((state: StateType) => state.titleState);
  const dispatch = useDispatch();
  async function patchRequest(publicId: string, title: string, document: any) {
    // const response = await axios.put(
    //   'https://nest-js-project.vercel.app/documents/update/1', { title, publicId, document, ownerId: "top" });

    // if (response.status != 200) {
    //   setSaveStatus("Waiting to Save.");
    //   throw new Error("Failed to update document");
    // }
    setSaveStatus("Saved");
    // startTransition(() => {
    //   router.refresh();
    // });
  }

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    await patchRequest("1", "Test", json);
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 1000);

  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Saving...");
      debouncedUpdates(e);
    },
    content: content,
  });

  useEffect(() => {
    if (editor && content) {
      setTimeout(() => {
        editor.commands.setContent(content);
      });
    }
  }, [editor, content]);

  return (
    <Fragment>
      <div className="relative flex h-[80dvh] w-full cursor-text flex-col items-center p-5 pt-10">
        <div className=" w-full max-w-screen-lg">
          <div className="flex">
            <div className="absolute top-0 rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-400">
              {saveStatus}
            </div>
            <div className="absolute top-0 ml-20 rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-400">
              {"Press '/' for commands, or enter some text..."}
            </div>
          </div>
          <div className="text-5xl font-semibold w-full">
            <input
              className="bg-transparent text-white outline-none py-5 appearance-none w-full"
              type="text"
              maxLength={35}
              value={titleState.title}
              onChange={(e) => {
                dispatch(titleAction.updateState({ title: e.target.value }));
              }}
              placeholder="Untitled Title"
            />
          </div>
          <div
            className="h-[70dvh]"
            onClick={() => {
              editor?.chain().focus().run();
            }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
