import './App.css';
import { useEffect, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import MovieDialog from '../src/components/MovieDialog';
import MovieCard from '../src/components/MovieCard';
import SearchCard from './components/SearchCard';
import styled from 'styled-components'

function App() {

  const [moviesList, setMoviesList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [searchYear, setSearchYear] = useState();
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchDisclaimer, setSearchDisclaimer] = useState('');
  const [currentMovieData, setCurrentMovieData] = useState({});
  const [moviePopup, setMoviePopup] = useState(false);
  const [resultEnded, setResultEnded] = useState(false);

  useEffect(() => {
    // detect scroll to end of page
    window.onscroll = () => {
      if (!resultEnded && !loadingPage && inputValue) {
        const scrollableDivHeight = document.getElementById('scrollableDiv').clientHeight;
        if (!loadingPage && document.documentElement.scrollTop > (scrollableDivHeight - window.innerHeight - 500)) {
          console.log(`need to load page no => ${searchPage + 1}`);
          setLoadingPage(true);
          setSearchPage(searchPage + 1);
          searchMoviesByInputValue(inputValue, searchPage + 1);
        }
      }
    }
  }, [loadingPage, searchPage, inputValue, resultEnded])

  useEffect(() => {
    // detect inputValu change
    if (inputValue) {
      const timeout = setTimeout(() => {
        searchMoviesByInputValue(inputValue.trim(), 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [inputValue])

  const searchMoviesByInputValue = async (searchInput, searchPage) => {
    setLoadingPage(true);
    let url = `https://www.omdbapi.com/?apikey=a61b9e49&s=${searchInput.trim()}&page=${searchPage}&y=${searchYear}`;
    await fetch(url)
    .then(response => response.json())
    .then(results => {
      if (results.Response && results.Search) {
        if (resultEnded) setResultEnded(false);
        if (searchPage === 1) {
          setMoviesList(results.Search);
          setSearchPage(1);
        }
        else setMoviesList([ ...moviesList, ...results.Search ]);
        setSearchDisclaimer(`Displaying ${results.totalResults || ''} total results for "${searchInput}"`);
        setLoadingPage(false);
      }
      else if (results.Error) {
        setLoadingPage(false);
        setResultEnded(true);
        if (searchPage === 1) {
          setSearchDisclaimer(results.Error);
          setMoviesList([]);
        }
      }
    })
    .catch(() => alert('error'))
  }

  const handleInputChange = (searchInput) => {
    setInputValue(searchInput);
    if (resultEnded) setResultEnded(true);
  };

  const getMovieDataById = async (movieId) => {
    let url = `https://www.omdbapi.com/?apikey=a61b9e49&i=${movieId}&plot=full`;
    await fetch(url)
    .then(response => response.json())
    .then(result => {
      if (result.Response) {
        setMoviePopup(true);
        setCurrentMovieData(result);
      }
      else if (result.Error) {
        setSearchDisclaimer(result.Error);
      }
    })
    .catch(() => alert('error'))
  }


  return (
    <AppStyle>

      <header className="App-header">
        <p style={{width: '95%', textAlign: 'left'}}>
          LawGeex Exercise
        </p>
      </header>

      <div className="App-content" id='scrollableDiv'>
        <SearchCard searchInputValue={inputValue}
                    onInputChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={(e) => {if (e.key === 'Enter') searchMoviesByInputValue(inputValue, 1)}}
                    yearInputValue={searchYear}
                    onYearChange={(e) => setSearchYear(e.target.value)}
                    onButtonClick={() => searchMoviesByInputValue(inputValue, 1)}
        />
        {searchDisclaimer && <p className='search-disclaimer'>{searchDisclaimer}</p>}
        {moviesList.map(movie =>
          <MovieCard key={movie.imdbID} movieData={movie} onMovieClick={() => getMovieDataById(movie.imdbID)} />
        )}
        {loadingPage && <CircularProgress style={{margin: '20px auto'}} />}
      </div>

      {moviePopup &&
        <MovieDialog
          openPopup={moviePopup}
          closePopup={() => setMoviePopup(false)}
          movieData={currentMovieData}
        />
      }
    </AppStyle>
  );
}
const AppStyle = styled.div`
  text-align: center;

  .App-header {
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    height: auto;
    background-color: #fff;
    width: 60%;
    padding: 2% 20%;
    margin: 0 auto;
    @media only screen and (max-width: 1024px) {
      width: 92%;
      padding: 2% 3%;
    }
  }

  .search-disclaimer {
    width: 94%;
    text-align: left;
    @media only screen and (max-width: 1024px) {
      font-size: 13px;
      text-align: center;
    }
  }

`

export default App;
