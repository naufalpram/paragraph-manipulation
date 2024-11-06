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

function ParagraphPopover() {
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

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Add review
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
                <input className="w-8" type="number" name="alternative" id="alternative" placeholder="0" co />
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
                <label htmlFor="exemption">Penggantian Kata</label>
                <textarea className="p-2" placeholder="Tulis kata pengganti dipisahkan koma" />
            </div>
            <br />
            <button
              className="bg-violet-800 text-white rounded-md px-4 py-2 w-full border"
              onClick={() => {
                console.log("Added review.");
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