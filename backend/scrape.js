const axios = require('axios');

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
};
const cheerio = require('cheerio');

async function scrapeAccuracies(username) {
  const url = `https://www.chess.com/games/archive/${username}`;
  
  try {
    const response = await axios.get(url, { headers });
    const html = response.data;
    const $ = cheerio.load(html);

    const table = $('.archive-games-table');
    if (table.length > 0) {
      const rows = table.find('tr').slice(1, 11);

      const accuracies = [];

      rows.each(function () {
        const whiteUsername = $(this).find('.archive-games-user-cell a.user-username-component').attr('v-user-popover');
        const accuracyCells = $(this).find('.table-text-center.archive-games-analyze-cell div');
        if (accuracyCells.length >= 2) {
            console.log(whiteUsername+" and "+username)
          if ("'"+username+"'" === whiteUsername) {
            accuracies.push(parseFloat(accuracyCells.eq(0).text()));
          } else {
            accuracies.push(parseFloat(accuracyCells.eq(1).text()));
          }
        } else {
          accuracies.push(null);
        }
      });

      return accuracies;
    } else {
      console.log('Table not found');
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch the page:', error.message);
    return null;
  }
}

function computeAvg(accuracies) {
  const sum = accuracies.reduce((acc, value) => acc + (value || 0), 0);
  return accuracies.length > 0 ? sum / accuracies.length : 0;
}

async function main() {
  const username = 'MagnusCarlsen';
  const accuracies = await scrapeAccuracies(username);
  if (accuracies !== null) {
    console.log(accuracies);
    // console.log(computeAvg(accuracies));
  }
}

main();
