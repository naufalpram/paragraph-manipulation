import { useEffect, useRef, useState } from 'react'
import QuillEditor from './components/QuillWrapper';
import QuillPopover from './components/QuillPopover';
import { artikelMakananFavorit } from './assets/data/ArtikelMakananFavorit';

const Task2 = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  useEffect(() => {
    artikelMakananFavorit.forEach((paragraph, idx) => {
      const prevLength = quillRef.current.getLength();
      if (paragraph.type === 'numbering') {
        quillRef.current.insertText(prevLength, paragraph.text + '\n', { list: 'ordered' });
      } else {
        let input = `${artikelMakananFavorit[idx - 1]?.type === 'numbering' ? '\n' : ''}` + paragraph.text;
        if (idx < artikelMakananFavorit.length - 1) input += '\n\n';
  
        quillRef.current.insertText(prevLength, input, { list: false });
      }

      if (paragraph.highlight) {
        paragraph.highlight.forEach((style) => quillRef.current.formatText(prevLength + style.start, style.end - style.start, { background: style.color }));
      }
    });
  }, []);
  return (
    <>
        <h2 className='text-white mb-6'>with Quill</h2>
        <QuillEditor
            ref={quillRef}
            onSelectionChange={setRange}
            onTextChange={setLastChange}
        />
        <div className="flex border border-[#ccc] justify-between p-3">
        <button
            className="px-4 py-2 font-semibold text-sm text-emerald-600 bg-transparent border-1 border-emerald-600 transition-all hover:text-white hover:bg-emerald-600 rounded"
            type="button"
            onClick={() => {
                const length = quillRef.current.getLength();
                alert(quillRef.current.getSemanticHTML(0, length));
            }}
        >
            Send
        </button>
        </div>
        <div className="mx-3 my-0 text-[#84a3af]">
        <div className="text-[#999] uppercase">Current Range:</div>
            {range ? JSON.stringify(range) : 'Empty'}
        </div>
        <div className="mx-3 my-0 text-[#84a3af]">
        <div className="text-[#999] uppercase">Last Change:</div>
            {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
        </div>
        <QuillPopover ref={quillRef} />
    </>
  )
}

export default Task2