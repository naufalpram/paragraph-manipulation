const ParagraphSlicer = (id, words, isMulti, article, setArticle) => {
    const updatedArticle = [...article];
    const paragraph = updatedArticle[id];
    let newText = '';
    let newHighlight = [];
    let arrSentence = [];
    let textLength = [];

    if (paragraph.highlight) {
        let wordsToSlice = '';

        paragraph.highlight.forEach((highlighter) => {
            let tempArr = [];
            let markedSentence = paragraph.text.slice(highlighter.start, highlighter.end);
            if (arrSentence.length > 0) {
                wordsToSlice = arrSentence.pop().sentence;
            } else {
                wordsToSlice = paragraph.text;
            }
            tempArr = wordsToSlice.split(markedSentence);
            arrSentence.push({ sentence: tempArr[0] }, { sentence: markedSentence, color: highlighter.color }, { sentence: tempArr[1] });
        })

        if (words && words.trim() !== '') {
            const replacementWords = words.split(',');
            replacementWords.forEach((word, index) => {
                replacementWords[index] = word.trimStart();
            });
            let word = replacementWords[0];
            if (isMulti) {
                arrSentence.filter((item) => Object.hasOwn(item, 'color')).forEach((item, idx) => {
                    if (idx > 0 && idx < replacementWords.length) word = replacementWords[idx];
                    if (word && word !== '' && item.color) item.sentence = word;
                })
            } else {
                arrSentence.forEach((item) => {
                    if (item.color) item.sentence = words;
                })
            }
        }

        arrSentence.map((chunk) => {
            textLength.push(chunk.sentence.length);
            newText = newText + chunk.sentence;
            if (chunk.color) {
                let wordsLength = chunk.sentence.length;
                let highlightEnd = newText.length;
                newHighlight.push({ start: highlightEnd - wordsLength, end: highlightEnd, color: chunk.color })
            };
        })

        updatedArticle[id] = { ...updatedArticle[id], text: newText, highlight: newHighlight };
    } else {
        newText = paragraph.text;
        updatedArticle[id] = { ...updatedArticle[id], text: newText };
    }

    setArticle(updatedArticle);
}

export default ParagraphSlicer;