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
import docAPI from "@/api/doc";

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
  async function patchRequest(id: string, title: string, document: any) {
    const res = await docAPI.update(id, {
      data: {
        title: title,
        editorJson: document,
      },
    });

    // if (res.status != 200) {
    //   setSaveStatus("Waiting to Save.");
    //   throw new Error("Failed to update document");
    // }
    // setSaveStatus("Saved");
    // startTransition(() => {
    //   router.refresh();
    // });
  }

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    await patchRequest("665838e832e12ec847b988b6", "Test", json);
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
      <div className="relative flex min-h-[80dvh] w-full cursor-text flex-col items-center p-5 pt-10">
        <div className=" w-full max-w-screen-lg">
          <div className="flex">
            <div className="absolute top-0 rounded-lg bg-gray-100 px-2 py-1 sm:text-sm max-sm:text text-gray-400">
              {saveStatus}
            </div>
            <div className="absolute top-0 ml-20 rounded-lg bg-gray-100 px-2 py-1 sm:text-sm max-sm:text text-gray-400">
              {"Press '/' for commands, or enter some text..."}
            </div>
          </div>
          <div className="font-semibold w-full">
            <textarea
              className="bg-transparent text-white outline-none py-5 appearance-none w-full text-5xl placeholder:text-5xl"
              value={titleState.title}
              onChange={(e) => {
                dispatch(titleAction.updateState({ title: e.target.value }));
              }}
              placeholder="Untitled Title"
              rows={1}
              style={{ resize: "none", overflow: "hidden" }}
              onInput={(e: any) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </div>
          <div
            className="min-h-[70dvh]"
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
