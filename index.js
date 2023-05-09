
const perspective = require('./perspective.js');

async function evaluateMessage(message) {
    let scores;

    try {
        scores = await perspective.analyzeText(message);
    } catch (err) {
        console.log(err);
        return false;
    }

    console.log(scores)
}

evaluateMessage('FUCK DAMN IT BILLY')