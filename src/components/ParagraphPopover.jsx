import { useState } from "react";
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
import { Cogwheel } from '../assets/icons';

const ParagraphPopover = ({ index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpan, setToggleSpan] = useState(false);
  const [changedWords, setWords] = useState('');

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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  const headingId = useId();

  const handleChangeWords = (val) => {
    setWords(val);
  }

  const handleSetWords = () => {
    const arrSpan = document.getElementsByClassName(`highlighted-span-${index}`);
    const arrWords = changedWords.split(",");
    let tempArr = []
    if (isSpan) {
      arrWords.forEach((word, index) => {
        arrWords[index] = word.trimStart();
      });
      if (arrWords.length < arrSpan.length) {
        for (const span of arrSpan) {
          span.innerHTML = changedWords;
        };
      } else {
        if (arrWords.length > arrSpan.length) {
          tempArr = arrWords.slice(0, arrSpan.length);
          tempArr.forEach((word, index) => {
            arrSpan[index].innerHTML = word;
          });
        } else {
          arrWords.forEach((word, index) => {
            arrSpan[index].innerHTML = word;
          });
        }
      }
    } else {
      for (const span of arrSpan) {
        span.innerHTML = changedWords;
      };
    }
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
            <div className="flex justify-between">
              <label htmlFor="alternative">Jumlah Alternatif</label>
              <input className="w-8" type="number" name="alternative" id="alternative" placeholder="0" />
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label htmlFor="exemption">Penggantian Kata</label>
                <div className="flex gap-2">
                  <input type="checkbox" name="toggle" id="toggle" value={isSpan} onChange={() => setToggleSpan(prev => !prev)} />
                  <label htmlFor="toggle">Span Manipulator</label>
                </div>
              </div>
              <textarea className="p-2" name="exemption" id="exemption" placeholder="Tulis kata pengganti dipisahkan koma" onChange={(e) => handleChangeWords(e.target.value)} />
            </div>
            <br />
            <button
              className="bg-violet-800 text-white rounded-md px-4 py-2 w-full border"
              onClick={() => {
                handleSetWords();
                setIsOpen(false);
                setToggleSpan(false);
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

export default ParagraphPopover;