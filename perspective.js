const {google} = require('googleapis');

require('dotenv').config();

// Some supported attributes
// attributes = ["TOXICITY", "SEVERE_TOXICITY", "IDENTITY_ATTACK", "INSULT",
// "PROFANITY", "THREAT", "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM",
// "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT",
// "INFLAMMATORY", "OBSCENE", "SPAM", "UNSUBSTANTIAL"];

// Set your own thresholds for when to trigger a response
const attributeThresholds = {
  'INSULT': 0.75,
  'TOXICITY': 0.75,
  'SPAM': 0.75,
  'INCOHERENT': 0.75,
  'FLIRTATION': 0.75,
};

/**
 * Analyze attributes in a block of text
 * @param {string} text - text to analyze
 * @return {json} res - analyzed atttributes
 */
async function analyzeText(text) {
    const analyzer = await google.discoverAPI('https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1');

    // This is the format the API expects
    const requestedAttributes = {
            TOXICITY: {},
            INSULT: {},
            IDENTITY_ATTACK: {},
    };
    for (const key in attributeThresholds) {
        requestedAttributes[key] = {};
    }

    const req = {
        comment: {text: text},
        languages: ['en'],
        requestedAttributes: requestedAttributes,
    };

    const res = await analyzer.comments.analyze({
        key: process.env.API_KEY,
        resource: req
    });

    data = {};

    for (const key in res['data']['attributeScores']) {
        data[key] =
            res['data']['attributeScores'][key]['summaryScore']['value'] >
            attributeThresholds[key];
    }
    return data;
}

module.exports.analyzeText = analyzeText;