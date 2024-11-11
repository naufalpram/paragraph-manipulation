import { useState } from 'react';
import { artikelMakananFavorit } from './assets/data/ArtikelMakananFavorit';
import ParagraphPopoverV2 from './components/ParagraphPopover-v2';

const Task1V2 = () => {
    const [onHover, setOnHover] = useState(-1);
    const [article, setArticle] = useState(artikelMakananFavorit);


    const sentenceHighlighter = ( paragraph ) => {
        let arrSentence = [];
        let lastCutIndex = 0;

        if (paragraph.highlight) {
            paragraph.highlight.forEach((highlighter) => {
                let cutIndex = 0;
                if (arrSentence.length > 0) {
                    arrSentence.pop();
                    cutIndex = lastCutIndex;
                } else {
                    lastCutIndex = highlighter.end;
                }
                let startSentence = paragraph.text.slice(cutIndex, highlighter.start);
                let markedSentence = paragraph.text.slice(highlighter.start, highlighter.end);
                let restSentence = paragraph.text.slice(highlighter.end);
                arrSentence.push({ sentence: startSentence }, { sentence: markedSentence, color: highlighter.color }, { sentence: restSentence });
            })
        }
        return arrSentence;
    }

    return (
        <>
            {article.map((paragraph, idx) => {
                return (
                    <div key={idx} id={`paragraph-${idx}`} className={`${paragraph.type === 'numbering' ? 'numbered' : ''} flex`} onMouseEnter={() => setOnHover(idx)} onMouseLeave={() => setOnHover(-1)}>
                        <p>
                            {sentenceHighlighter(paragraph).map((words, spanIdx) => {
                                return <span key={spanIdx} className={`${words.color ? `highlighted-span-${idx}` : ''}`} style={{background: words.color ?? 'white'}}>{words.sentence}</span>
                            })}
                        </p>
                        {onHover === idx &&
                            <div className='menu relative'>
                                <ParagraphPopoverV2
                                    paragraphIdx={idx}
                                    // isMulti={changedWords.isMulti}
                                    // setChangedWords={setChangedWords}
                                    article={article}
                                    setArticle={setArticle}
                                />
                            </div>
                        }
                    </div>
                )
            })}
        </>
    )
}

export default Task1V2