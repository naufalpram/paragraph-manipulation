import { forwardRef, useEffect, useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId
} from "@floating-ui/react";

const QuillPopover = forwardRef((_, quillRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMultiReplace, setIsMultiReplace] = useState(false);
  const [quillSelection, setQuillSelection] = useState(null);
  const changedWords = useRef();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  const headingId = useId();

  const replaceWords = (words) => {
    if (!words || words?.trim() === '') return;
    
    if (!quillSelection || quillSelection?.length === 0) return;

    const contentDelta = quillRef.current.getContents(quillSelection.index, quillSelection.length);
    // eslint-disable-next-line no-prototype-builtins
    const highlightedIndices = contentDelta.reduce((prev, curr, idx) => curr?.attributes?.hasOwnProperty('background') ? [...prev, idx] : prev , []);

    highlightedIndices.forEach(highlightIndex => {
        contentDelta[highlightIndex] = { ...contentDelta[highlightIndex], insert: words }
    });
    
    console.log(contentDelta);
    
    
    // const highlighted = document.querySelectorAll(`#paragraph-${paragraphIdx} > p span[class^="highlighted-span-${paragraphIdx}"]`);
    // const replacementWords = words.split(',');
    // replacementWords.forEach((word, index) => {
    //   replacementWords[index] = word.trimStart();
    // });
    // let word = replacementWords[0];

    // if (isMultiReplace) {
    //   highlighted.forEach((item, idx) => {
    //     if (idx > 0 && idx < replacementWords.length) word = replacementWords[idx];
    //     if (word && word !== '') item.textContent = word;
    //   })
    // } else {
    //   for (const span of highlighted) {
    //     span.textContent = words;
    //   };
    // }
  }

  useEffect(() => {
    let timeout;

    function onContextMenu(e) {
      e.preventDefault();

      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            right: e.clientX,
            bottom: e.clientY,
            left: e.clientX
          };
        }
      });

      const selections = quillRef.current?.getSelection();
      if (selections?.length > 0) {
          setQuillSelection(selections);
          setIsOpen(true);
      }
      
      const popover = document.querySelector('.Popover');
      function onPopoverFocus() {
          quillRef.current.setSelection(quillSelection);
      }
  
      popover?.addEventListener("focus", onPopoverFocus);
      clearTimeout(timeout);
    }

    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      clearTimeout(timeout);    
    };
  }, [refs, quillRef, quillSelection]);

  return isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <h2 id={headingId}>Setelan Draft</h2>
            <h4 id={headingId}>Range: {JSON.stringify(quillSelection)}</h4>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label htmlFor="exemption">Penggantian Kata</label>
                <div className="flex gap-2">
                  <input type="checkbox" name="toggle" id="toggle" checked={isMultiReplace} onChange={() => setIsMultiReplace(prev => !prev)} />
                  <label htmlFor="toggle">Enable Multi Replace</label>
                </div>
              </div>
              <textarea className="p-2" name="exemption" id="exemption" placeholder="Tulis kata pengganti dipisahkan koma" ref={changedWords} />
            </div>
            <br />
            <button
              className="bg-violet-800 text-white rounded-md px-4 py-2 w-full border"
              onClick={() => {
                replaceWords(changedWords.current.value);
                setIsOpen(false);
                setIsMultiReplace(false);
              }}
            >
              Terapkan
            </button>
          </div>
        </FloatingFocusManager>
      )
})

export default QuillPopover;