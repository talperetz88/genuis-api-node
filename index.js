const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var api = require('genius-api');
var genius = new api('olZcIStkvAuxZamirD0vw9k1oiMHtgncLcGU7Yz0L_4xGtJsJNrVgKNZQcspAtnN');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/songsByArtist', (req, res) => {
    
    const forLoop = async _ => { 
      console.log(new Date());
      var page = 1;
      var song = []
      do {
        newquery = req.query
        await genius.songsByArtist(req.query.songid,newquery).then(function(response){
          var rearangeRes = new Promise((resolve,reject) => {
            console.log('songs Of an artist', response.songs);
            response.songs.forEach(element => {
              song.push(element.title)
            });
            page = response.next_page
            newquery.page = page
            console.log('after response ',new Date());
            resolve(song)
          })
      }).catch(function(error) {
          console.error(error);
      });
      
      } while (page !== null);
      res.send(JSON.stringify(Object.assign({}, song)))
    }
    var song1 = forLoop()
    
})

app.get('/search',(req,res) => {
  //search
  genius.search(req.query.q).then(function(response) {
    data = response.hits;
    var artistid = ''
    obj = {succes:false,'artistid':0}
    data.forEach(element => {
      if(element.result.primary_artist.name.toLowerCase() == req.query.q.toLowerCase()){
        obj.artistid = element.result.primary_artist.id
        obj.succes = true;
        return;
      }
    });
    
    res.send(obj)
    
  }).catch(function(error) {
    console.error(error);
  });
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


 
// //get annotation
// genius.annotation(6737668).then(function(response) {
//   console.log(response.annotation);
// });
 
// //get referents by song_id, with options
// genius.referents({song_id: 378195}, {per_page: 2}).then(function(response) {
//   console.log('referents', response.referents);
// });
 
// //get referents by web_page_id, with options
// genius.referents({web_page_id: 10347}, {per_page: 5}).then(function(response) {
//   console.log('referents', response.referents);
// });
 
//get song
// genius.song(33385).then(function(response) {
//   console.log('song', response.song);  
// });
 
// get artist
// genius.artist(33385).then(function(response) {
//   console.log('artist', response);
// });
 


// //get web page, with options
// genius.webPage({raw_annotatable_url: 'https://docs.genius.com'}).then(function(response) {
//   console.log('web page', response.web_page);
// });
  
// //error handling á la promise
// genius.song(378195).then(function(response) {
//   console.log('song', response.song);
// }).catch(function(error) {
//   console.error(error);
// });