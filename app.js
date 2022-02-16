const express = require ('express');
const path = require ('path');
const axios = require ('axios');

const PORT = process.env.PORT||9000;

const app = express();

app.set('view engine', 'ejs');

const movKey = 'f14f28de99fa4987c973714e2475aa3d'
const movUrl = `https://api.themoviedb.org/3/tv/airing_today?api_key=${movKey}&language=en-US&page=1`;
const popUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${movKey}&language=en-US&page=1`;
const onairUrl= `https://api.themoviedb.org/3/tv/on_the_air?api_key=${movKey}&language=en-US&page=1`;




app.use('/css', express.static(path.join(__dirname,'public/css')));
app.use('/img', express.static(path.join(__dirname,'public/img')));
app.use('/js', express.static(path.join(__dirname,'public/js')));

app.get('/', async (req, res)=>{
    try {
        const movieShow = await axios.get(movUrl);
        let showMovies = movieShow.data.results
        // console.log(showMovies);
        
        res.render('pages/index',{showMovies})
    } catch (error) {
        console.log(error);
      res.end('Api not found')  
    }
   
})

app.get('/pages/popular', async(req,res)=>{
    try {
       const popShow = await axios.get(popUrl);
       let showPop = popShow.data.results;
       let picUrl = 'https://image.tmdb.org/t/p/w500';

       res.render("pages/popular",{showPop, picUrl})
       
    } catch (error) {
        console.log(error);
        res.end("Error fetching Api")
    }
        
})

app.get('/pages/onair', async(req, res)=>{
    try {
        const onairShow = await axios.get(onairUrl);
        let showonAir = onairShow.data.results;
        let imageUrl = 'https://image.tmdb.org/t/p/w500';
 
        res.render("pages/onair",{showonAir, imageUrl})
        
     } catch (error) {
         res.end("Error fetching Api")
     }
})

app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`);
})