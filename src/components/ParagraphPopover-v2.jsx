import { useRef, useState } from "react";
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
import ParagraphSlicer from './ParagraphSlicer';
import { Cogwheel } from '../assets/icons';

function ParagraphPopoverV2({ paragraphIdx, article, setArticle }) {
  const [isOpen, setOpen] = useState(false);
  const [isMulti, setMulti] = useState(false);
  const changedWords = useRef();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  const headingId = useId();

  const handleReplaceWords = (words) => {
    ParagraphSlicer(paragraphIdx, words, isMulti, article, setArticle)
  }

  return (
    <>
      <button
        className="bg-transparent outline-none border-none"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <Cogwheel
          size={24}
          color='#F3F3F3'
        />
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <h2 id={headingId}>Setelan Draft</h2>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label htmlFor="exemption">Penggantian Kata</label>
                <div className="flex gap-2">
                  <input type="checkbox" name="toggle" id="toggle" checked={isMulti} onChange={() => setMulti(prev => !prev)} />
                  <label htmlFor="toggle">Enable Multi Replace</label>
                </div>
              </div>
              <textarea className="p-2" name="exemption" id="exemption" placeholder="Tulis kata pengganti dipisahkan koma" ref={changedWords} />
            </div>
            <br />
            <button
              className="bg-violet-800 text-white rounded-md px-4 py-2 w-full border"
              onClick={() => {
                handleReplaceWords(changedWords.current.value)
                setOpen(false);
              }}
            >
              Terapkan
            </button>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default ParagraphPopoverV2;