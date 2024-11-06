import { useEffect, useRef, useState } from 'react';
import './App.css';
import QuillEditor from './components/Quill';
import Task1 from './Task1';
import { artikelMakananFavorit } from './assets/data/ArtikelMakananFavorit';

const App = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  useEffect(() => {
    artikelMakananFavorit.forEach((paragraph) => {
      const prevLength = quillRef.current.getLength();
      if (paragraph.type === 'numbering') {
        quillRef.current.insertText(prevLength, paragraph.text + '\n', { list: 'ordered' });
      } else {
        quillRef.current.insertText(prevLength, paragraph.text + '\n\n', { list: false });
        quillRef.current.format('list', false)
      }

      if (paragraph.highlight) {
        paragraph.highlight.forEach((style) => quillRef.current.formatText(prevLength + style.start, style.end - style.start, { background: style.color }));
      }
    });
  }, []);

  return (
    <>
      <main className='p-8 bg-[#111827] flex items-center flex-col gap-4 font-sans'>
        <div>
          <h1 className='text-white'>Paragraph Manipulation</h1>
        </div>
        <section className='task-1 w-3/4 mt-4 p-4 bg-white'>
          <Task1 />
        </section>
        <section className='w-full mt-4 block max-w-7xl p-6 border rounded-lg shadow bg-gray-800 border-gray-700'>
          <h2 className='text-white mb-6'>Task 2</h2>
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
        </section>
        {/* <Menu quillRef={quillRef}>
          <MenuItem id='dashes-between' label="Join with Dashes" onClick={setTextSplitWithDashes} />
          <MenuItem id='bold-italic' label="Set as Bold Italic" onClick={setTextBoldItalic} />
          <MenuItem label="Reload" disabled />
          <MenuItem label="Add Comment" onClick={addCommentToSelection} />
          <MenuItem label="Save As..." />
          <MenuItem label="Print" />
        </Menu> */}
      </main>
    </>
  );
};

export default App;