import { useState } from 'react';
import './App.css';
import Task1 from './Task1';
import Task1V2 from './Task1-v2';
import Task2 from './Task2';

const App = () => {
  const [ activeTask1, setActiveTask1 ] = useState('v1');
  return (
    <>
      <main className='p-8 bg-[#111827] flex items-center flex-col gap-4 font-sans'>
        <div>
          <h1 className='text-white'>Paragraph Manipulation</h1>
        </div>
        <section className='task-1 w-full mt-4 max-w-7xl p-6 bg-gray-800 border border-gray-700 rounded-lg shadow'>
          <div className='task-1-option flex items-center'>
            <h2 className='title'>with HTML</h2>
            <button className={activeTask1 === 'v1' && `active`} onClick={() => setActiveTask1('v1')}>V1</button>
            <button className={activeTask1 === 'v2' && `active`} onClick={() => setActiveTask1('v2')}>V2</button>
          </div>
          <div className='bg-white rounded-lg p-4'>
            {activeTask1 === 'v1' && <Task1 />}
            {activeTask1 === 'v2' && <Task1V2 />}
          </div>
        </section>
        <section className='w-full mt-4 block max-w-7xl p-6 border rounded-lg shadow bg-gray-800 border-gray-700'>
          <Task2 />
        </section>
      </main>
    </>
  );
};

export default App;