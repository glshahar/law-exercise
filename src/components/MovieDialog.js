import React from 'react'
import { Dialog, Chip } from '@material-ui/core'
import styled from 'styled-components'
import imdbLogo from '../logo-imdb.png'

const MovieDialog = (props) => {

    const { openPopup, closePopup, movieData } = props;

    const dialogStyle = {
        width: '70%',
        margin: 'auto',
        '@media (max-width: 1024px)' : {
            width: '100%',
        }
    }

    return <>
        <Dialog
            open={openPopup}
            onClose={closePopup}
            maxWidth={'100px'}
            className='DialogStyle'
            style={{width: '70%', margin: 'auto'}}
            role={'dialog'}
        >
            <WrapperStyle>
                <button className='closeBtn' onClick={closePopup}>&#10005;</button>
                
                <div className='moviePoster'>
                    <img alt='poster' src={movieData.Poster} />
                </div>

                <div className='movieContent'>
                    <h2>{movieData.Title}</h2>
                    <h5>
                        <span>{movieData.Year}</span>
                        <span>&#9201; {movieData.Runtime}</span>
                        {movieData.Awards !== 'N/A' && <span>&#127942; {movieData.Awards}</span>}
                    </h5>
                    <div className='lineContent'>
                        <div className='chipsWrapper'>
                            {movieData.Genre && movieData.Genre.split(',').map((genre, index) => (
                                <Chip key={index} label={genre} size={'medium'} variant={'outline'} className='chipStyle' />
                            ))}
                        </div>
                        <div className='ratingWrapper'>
                            <div>
                                <span className='likeIcon'>&#128077;</span>
                                <span className='rateText'>{movieData.Metascore}%</span>
                            </div>
                            <div>
                                <img alt='logo' src={imdbLogo} className='imdbLogo' />
                                <span className='rateText'>{movieData.imdbRating}/10</span>
                            </div>
                        </div>
                    </div>
                    <p>{movieData.Plot}</p>
                    <p><strong>Actors: </strong> {movieData.Actors}</p>
                    <p><strong>Director: </strong> {movieData.Director}</p>
                    <p><strong>Writer: </strong> {movieData.Writer}</p>
                </div>
            </WrapperStyle>
        </Dialog>
    </>
}

const WrapperStyle = styled.div`
    width: 80%;
    padding: 6% 10%;
    display: flex;
    flex-direction: row;

    .closeBtn {
        font-size: 20px;
        border: none;
        position: absolute;
        background-color: white;
        cursor: pointer;
        left: 30px;
        top: 30px;
    }

    .moviePoster {
        width: 30%;
        img {
            max-width: 100%;
            max-height: 100%;
            height: auto;
        }
    }

    .movieContent {
        width: 70%;
        padding-left: 30px;
        h2 {
            margin-top: 0;
        }
        h5 > span {
            margin-right: 5px;
        }
        .lineContent {
            display: flex;
            flex-direction: row;
        }
        .chipsWrapper {
            width: 65%;
            .chipStyle {
                margin-right: 10px;
                margin-left: -2px;
            }
        }
        .ratingWrapper {
            width: 30%;
            display: flex;
            flex-direction: row;
            div {
                width: 50%;
                display: flex;
                flex-direction: row;
            }
            .likeIcon {
                height: 25px;
                font-size: 22px;
                text-align: center;
                line-height: 25px;
            }
            .imdbLogo {
                max-height: 25px;
                max-width: 80%;
                width: auto;
                height: auto;
            }
            .rateText {
                font-size: 14px;
                text-align: center;
                line-height: 25px;
                margin-left: 5px;
            }
        }
    }

`

export default MovieDialog;