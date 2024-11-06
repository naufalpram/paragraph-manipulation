import Quill from "quill";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";

const Editor = forwardRef(
  ({ defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        readOnly: true,
        theme: "bubble",
        modules: {
          toolbar: false
        },
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
        ref.current.update();
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <div
        ref={containerRef}
        className="bg-white text-black border border-gray-200 p-6 rounded-tr rounded-tl max-w-7xl"
      ></div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
