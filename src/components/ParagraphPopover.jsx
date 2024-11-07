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
import SettingIcon from '../../public/setting-icon.svg';

function ParagraphPopover({ paragraphIdx }) {
  const replacementRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

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

  const replaceWords = (words) => {
    if (!words || words?.trim() === '') return;
    const replacementWords = words.split(',');

    const highlighted = document.querySelectorAll(`#paragraph-${paragraphIdx} > p span[class^="highlighted-span"]`);

    let word = replacementWords[0];
    highlighted.forEach((item, idx) => {
      if (idx > 0 && idx < replacementWords.length) word = replacementWords[idx];
      if (word && word !== '') item.textContent = word;
    })
  }

  return (
    <>
      <img className="w-10 h-10 cursor-pointer" src={SettingIcon} ref={refs.setReference} {...getReferenceProps()} />
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
            {/* <div className="flex justify-between">
                <label htmlFor="alternative">Jumlah Alternatif</label>
                <input className="w-8" type="number" name="alternative" id="alternative" placeholder="0" />
            </div>
            <hr className="my-2" /> */}
            <div className="flex flex-col gap-2">
                <label htmlFor="exemption">Penggantian Kata</label>
                <textarea className="p-2" name="exemption" id="exemption" placeholder={"Tulis kata pengganti dipisahkan koma, e.g. \"Kata satu,kata dua\""} ref={replacementRef} />
            </div>
            <br />
            <button
              className="bg-violet-800 text-white rounded-md px-4 py-2 w-full border"
              onClick={() => {
                replaceWords(replacementRef.current.value);
                setIsOpen(false);
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