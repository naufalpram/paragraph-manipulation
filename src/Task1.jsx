import { useState } from 'react';
import { artikelMakananFavorit } from './assets/data/ArtikelMakananFavorit';
import ParagraphPopover from './components/ParagraphPopover';

const Task1 = () => {
    const [isGearShows, setGearShows] = useState(false);
    const sentenceHighlighter = (paragraph) => {
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
            console.log(wordsToSlice, tempArr, arrSentence);
        })

        return arrSentence;
    }

    return (
        <>
            <h1 className='text-lg mb-4'>Task 1</h1>
            {artikelMakananFavorit.map((paragraph, idx) => {
                return (
                    <div key={idx} className={`${paragraph.type === 'numbering' ? 'numbered' : ''} flex`}>
                        <p onMouseOver={() => setGearShows(idx)} onMouseLeave={() => setGearShows(false)}>
                            {sentenceHighlighter(paragraph).map((words, index) => {
                                return <span key={index} className={`${words.color ? `highlighted-span-${idx}` : ''}`} style={{ background: words.color ?? 'white' }}>{words.sentence}</span>
                            })}
                        </p>
                        {isGearShows === idx &&
                            <div
                                className='menu relative'
                                onMouseOver={() => setGearShows(idx)}
                                onMouseLeave={() => setGearShows(false)}
                            >
                                <ParagraphPopover index={idx} />
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default Task1