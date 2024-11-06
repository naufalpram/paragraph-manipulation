import './App.css';
import ParagraphPopover from './components/ParagraphPopover';
import Task1 from './Task1';
import Task2 from './Task2';

const App = () => {
  return (
    <>
      <main className='p-8 bg-[#111827] flex items-center flex-col gap-4 font-sans'>
        <div>
          <h1 className='text-white'>Paragraph Manipulation</h1>
        </div>
        <section className='task-1 w-3/4 mt-4 p-4 bg-white'>
          <ParagraphPopover />
          <Task1 />
        </section>
        <section className='w-full mt-4 block max-w-7xl p-6 border rounded-lg shadow bg-gray-800 border-gray-700'>
          <Task2 />
        </section>
      </main>
    </>
  );
};

export default App;