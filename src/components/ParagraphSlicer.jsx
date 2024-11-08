const ParagraphSlicer = (id, paragraph, replaceWords) => {
    let arrSentence = [];

    if (paragraph.highlight) {
        let wordsToSlice = '';

        paragraph.highlight.forEach((highlighter) => {
            let tempArr = [];
            let markedSentence = paragraph.text.slice(highlighter.start, highlighter.end);
            if (arrSentence.length > 0) {
                wordsToSlice = arrSentence.pop().sentence;
            } else {
                wordsToSlice = paragraph.text
            }
            tempArr = wordsToSlice.split(markedSentence);
            arrSentence.push({ sentence: tempArr[0] }, { sentence: markedSentence, color: highlighter.color }, { sentence: tempArr[1] });
        })

        if (replaceWords.words.trim() !== '' && replaceWords.id === id) {
            const replacementWords = replaceWords.words.split(',');
            replacementWords.forEach((word, index) => {
                replacementWords[index] = word.trimStart();
            });
            let word = replacementWords[0];
            if (replaceWords.isMulti) {
                console.log("i'm here2", arrSentence.filter((item) => Object.hasOwn(item, 'color')))
                arrSentence.filter((item) => Object.hasOwn(item, 'color')).forEach((item, idx) => {
                    if (idx > 0 && idx < replacementWords.length) word = replacementWords[idx];
                    if (word && word !== '' && item.color) item.sentence = word;
                })
            } else {
                console.log("i'm here", arrSentence.filter((item) => Object.hasOwn(item, 'color')))
                arrSentence.forEach((item) => {
                    if (item.color) item.sentence = replaceWords.words;
                })
            }
        }
        
        return arrSentence;
    } else {
        return paragraph;
    }
}

export default ParagraphSlicer;