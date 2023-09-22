const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://chess:pwd@chesscomcluster0.kmzbxgj.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const axios = require('axios');

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
};
const cheerio = require('cheerio');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function scrapeAccuracies(user) {
  const url = `https://www.chess.com/games/archive/${user}`;
  
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
            // console.log(whiteUsername+" and "+user)
          if ("'"+user+"'" === whiteUsername) {
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

async function scrape(chesscomUser) {
  const userr = chesscomUser;
  const accuracies = await scrapeAccuracies(userr);
  if (accuracies !== null) {
    return accuracies;
    //console.log(accuracies);
    // console.log(computeAvg(accuracies));
  }
}

app.use(cors());
app.use(async (req, res, next) => {
  try {
    await client.connect();
    req.dbClient = client;
    req.db = client.db('ChesscomCluster0'); 
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to MongoDB Atlas');
  }
});
  
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
  
app.get('/fetchAndStoreChessData', async (req, res) => {
  try {
    const usernames = ['MagnusCarlsen', 'FabianoCaruana', 'Hikaru', 'Chefshouse', 'Firouzja2003', 'lachesisQ', 'VladimirKramnik', 'GMWSO', 'nihalsarin', 'HansOnTwitch']//, 'Polish_fighter3000', 'Danielnaroditsky', 'AnishGiri', 'Grischuk', 'fairchess_on_youtube']; 

    for (const username of usernames) {
      const apiUrl = `https://api.chess.com/pub/player/${username}`;
      const apiUrl2 = `https://api.chess.com/pub/player/${username}/stats`;

      sleep(2000);
      const response = await fetch(apiUrl); 
      const response2 = await fetch(apiUrl2); 

      let chessData2 = {};
      if (response2.status === 200) {
        chessData2 = await response2.json();
        // await req.db.collection('chessPlayers').insertOne(chessData);
      }

      if (response.status === 200) {
        const chessData = await response.json();
        const accuracy_array = await scrape(username);
        const avgAccuracy = computeAvg(accuracy_array);

        chessData.recent_accuracy = accuracy_array;
        chessData.average_accuracy = avgAccuracy;
        chessData.chess_bullet = chessData2.chess_bullet;
        chessData.chess_blitz = chessData2.chess_blitz;
        chessData.chess_rapid = chessData2.chess_rapid;
        // chessData.fide = chessData2.fide;
        console.log(chessData);
        //await req.db.collection('chessPlayers').insertOne(chessData);
      }
    }

    res.status(201).json({ message: 'Data fetched and stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching and storing data' });
  }
});
  
app.get('/getChessPlayers', async (req, res) => {
  try {
    const chessPlayersCollection = req.db.collection('chessPlayers'); // Get the MongoDB collection

    // Fetch all documents in the collection (you can add a query to filter data)
    const chessPlayers = await chessPlayersCollection.find({}).toArray();
    console.log('Fetched Chess Players:', chessPlayers);

    res.setHeader('Content-Type', 'application/json');

    // Send the JSON response
    res.status(200).json(chessPlayers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching and sending data' });
  }
});
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });  

/*
function returnPlayerProfile(username){
    const apiUrl = "https://api.chess.com/pub/player/"+username;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("ugh");
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        return data
      })
      .catch(error => {
        console.error("annoying error is....", error);
      });
}

module.exports = {
    returnPlayerProfile,
  };*/
  