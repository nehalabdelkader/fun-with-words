const { wordsList, scoresList } = require("./data");

const WORD_CATEGORYIES = ["adverb", "noun", "adjective", "verb"];

/** returns random integer between [0, max[ */
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

/** separates words into groups based on its category 
 * 
 *  returns object in this structure:
 *  {
    adverb: [],
    noun: [],
    adjective: [],
    verb: [],
  }
*/
const prepareWordGroups = () => {
  const groups = {
    adverb: [],
    noun: [],
    adjective: [],
    verb: [],
  };

  wordsList.forEach((word) => {
    groups[word.pos].push(word);
  });

  return groups;
};

const generateRandomWords = (length) => {
  const list = [];
  const catgorizedGroups = prepareWordGroups();

  let currentCategoryIndex = 0;
  while (list.length < length) {
    // get a category list to choose from
    const currentCategoryList =
      catgorizedGroups[WORD_CATEGORYIES[currentCategoryIndex]];
    // generate a random index between [0, category list length[
    const randomIndex = getRandomInt(currentCategoryList.length);
    // insert random word into list
    list.push(currentCategoryList[randomIndex]);

    // increase currentCategoryIndex
    // to choose from a different category on next iteration
    currentCategoryIndex = (currentCategoryIndex + 1) % WORD_CATEGORYIES.length;
  }

  return list;
};

const calculateRank = (inputScore) => {
  let countOfSmallerScores = 0;

  // loop through scores list
  // increase countOfSmallerScores by one
  // when input score is greater
  scoresList.forEach((score) => {
    if (inputScore > score) {
      countOfSmallerScores += 1;
    }
  });

  // calculate rank using the given formula
  const rank = (countOfSmallerScores / scoresList.length) * 100;

  return rank;
};

module.exports = {
  generateRandomWords,
  calculateRank,
};
