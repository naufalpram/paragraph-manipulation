import { artikelMakananFavorit } from './assets/data/ArtikelMakananFavorit';

const Task1 = () => {
    const sentenceHighlighter = ( paragraph ) => {
        let arrHighlighter = [];

        if (paragraph.highlight) {
            paragraph.highlight.map((highlighter) => {
                let markedSentence = paragraph.text.slice(highlighter.start, highlighter.end);
                arrHighlighter.push({ sentence: markedSentence, color: highlighter.color })
            })
        }

        return wordsSplitter(arrHighlighter, paragraph.text);
    }

    const wordsSplitter = (arr, text) => {
        let arrSentence = [];
        let wordsToSlice = '';

        arr.map((slicer) => {
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
                    <p key={idx} className={`${paragraph.type === 'numbering' ? 'numbered' : ''}`}>
                        {sentenceHighlighter(paragraph).map((words, idx) => {
                            return <span key={idx} className={`${words.color ? `highlighted-span` : ''}`} style={{background: words.color ?? 'white'}}>{words.sentence}</span>
                        })}
                    </p>
                )
            })}
        </>
    )
}

export default Task1