import React from 'react'
import styled from 'styled-components'

const MovieCard = (props) => {

    const { movieData, onMovieClick } = props;

    return <>
        <MovieCardStyle key={movieData.imdbID} onClick={onMovieClick}>

            <div className='moviePoster'>
                {movieData.Poster !== 'N/A' ? 
                    <img src={movieData.Poster} alt={`${movieData.Title} poster`} />
                    : 
                    <div className='defaultImg'>
                        <p>Poster is Not Available</p>
                    </div>  
                }
            </div>
            
            <div className='movieContent'>
                <h3>{movieData.Title}</h3>
                <h4>Released Date: {movieData.Year}</h4>
                <h4>IMDB No: {movieData.imdbID}</h4>
                <h4>Type: {movieData.Type}</h4>
                <a href={`https://www.imdb.com/title/${movieData.imdbID}`} target='_blank' rel='noreferrer'>IMDb</a>
            </div>
        </MovieCardStyle>
    </>
}

const MovieCardStyle = styled.div`
    display: flex;
    width: 94%;
    padding: 3%;
    margin: 15px auto;
    box-shadow: 0 2px 10px 0 #d7d3ff;
    cursor: pointer;
    @media only screen and (max-width: 1024px) {
        margin: 5px auto;
    }

    .moviePoster {
        width: 18%;
        margin-left: 2%;
        @media only screen and (max-width: 1024px) {
            width: 25%;
            margin-left: 2%;
        }
        img {
            max-width: 100%;
            max-height: 100%;
            height: auto;
        }
        .defaultImg {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            background-color: #efefef;
            p {
                color: gray;
                line-height: 25px;
            }
        }
    }

    .movieContent {
        width: 76%;
        margin-left: 3%;
        padding-left: 15px;
        text-align: left;
        color: black;
        @media only screen and (max-width: 1024px) {
            h3 {
                margin: 0px;
                font-size: 15px;
            }
            h4 {
                margin: 6px 0;
                font-size: 13px;
            }
            a {
                font-size: 13px;
            }
        }
    }
`

export default MovieCard;