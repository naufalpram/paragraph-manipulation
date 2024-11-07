import { useState } from 'react';
import { useState } from 'react';
import { artikelMakananFavorit } from './assets/data/ArtikelMakananFavorit';
import ParagraphPopover from './components/ParagraphPopover';
import ParagraphPopover from './components/ParagraphPopover';

const Task1 = () => {
    const [onHover, setOnHover] = useState(-1);
    const sentenceHighlighter = ( paragraph ) => {
        let arrHighlighter = [];

        if (paragraph.highlight) {
            paragraph.highlight.forEach((highlighter) => {
                let markedSentence = paragraph.text.slice(highlighter.start, highlighter.end);
                arrHighlighter.push({ sentence: markedSentence, color: highlighter.color })
            })
        }

        return wordsSplitter(arrHighlighter, paragraph.text);
    }

    const wordsSplitter = (arr, text) => {
        let arrSentence = [];
        let wordsToSlice = '';

        arr.forEach((slicer) => {
            let tempArr = [];
            if (arrSentence.length > 0) {
                wordsToSlice = arrSentence.pop().sentence;
            } else {
                wordsToSlice = text
            }
            tempArr = wordsToSlice.split(slicer.sentence);
            arrSentence.push({ sentence: tempArr[0] }, slicer, { sentence: tempArr[1] });
        })

        return arrSentence;
    }

    return (
        <>
            <h1 className='text-lg mb-4'>Task 1</h1>
            {artikelMakananFavorit.map((paragraph, idx) => {
                return (
                    <div key={idx} id={`paragraph-${idx}`} className={`${paragraph.type === 'numbering' ? 'numbered' : ''} flex`} onMouseEnter={() => setOnHover(idx)} onMouseLeave={() => setOnHover(-1)}>
                        <p>
                            {sentenceHighlighter(paragraph).map((words, spanIdx) => {
                                return <span key={spanIdx} className={`${words.color ? `highlighted-span-${idx}` : ''}`} style={{background: words.color ?? 'white'}}>{words.sentence}</span>
                            })}
                        </p>
                        {onHover === idx && <ParagraphPopover paragraphIdx={idx} />}
                    </div>
                )
            })}
        </>
    )
}

export default Task1