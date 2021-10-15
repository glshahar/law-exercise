import React from 'react'
import { useEffect, useState } from 'react'
import { TextField, FormControl, Select, InputLabel, MenuItem, InputAdornment, Button } from '@material-ui/core'
import styled from 'styled-components'

const SearchCard = (props) => {

    const { 
        searchInputValue,
        onInputChange, 
        onKeyPress,
        yearInputValue,
        onYearChange,
        onButtonClick
    } = props;

    const [yearsList, setYearsList] = useState([]);

    useEffect(() => {
        // init years list
        const startYear = 1900;
        const currentYear = new Date().getFullYear();
        const initYearsList = [{value: null, text: 'All'}]
        console.log(`currentYear => ${currentYear}`)
        for (let i=currentYear; i>=startYear; i--) {
            initYearsList.push({value: i, text: i})
        }
        setYearsList(initYearsList);
    }, [])

    return <>
        <SearchCardStyle>

            <TextField
                label='Search'
                value={searchInputValue}
                onChange={onInputChange}
                onKeyPress={onKeyPress}
                fullWidth={true}
                className='searchInput'
                // helperText={searchDisclaimer}
                // InputProps={{disableUnderline: true}}
                InputProps={{
                    type: 'search',
                    endAdornment: (
                        <InputAdornment position='start'>
                            {!searchInputValue && <span className='searchImg'>&#x2315;</span>}
                        </InputAdornment>
                    )
                }}
            />     

            <FormControl fullWidth className='selectInput'>
                <InputLabel id='demo-select-year-label'>Year</InputLabel>
                <Select
                    labelId='demo-select-year-label'
                    value={yearInputValue}
                    label='Year'
                    onChange={onYearChange}
                >
                    {yearsList.map(year => 
                        <MenuItem value={year.value} key={year.text}>{year.text}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <Button className='searchButton' onClick={onButtonClick} variant='contained' color='primary'>
                Search
            </Button>

        </SearchCardStyle>
    </>
}

const SearchCardStyle = styled.div`
    display: flex;
    flex-direction: row;
    width: 94%;
    min-height: 40px;
    margin: 30px auto;
    padding: 10px 3% 18px 3%;
    border-radius: 25px;
    box-shadow: 0 2px 10px 0 #d7d3ff;
    @media only screen and (max-width: 1024px) {
        margin: 30px auto 0;
    }

    .searchInput {
        width: 50%;
        padding-right: 20px;
        .searchImg {
            position: absolute;
            right: 0px;
            font-size: 32px;
            color: #684eed;
        }
    }

    .selectInput {
        width: 30%;
        padding-right: 20px;
    }

    .searchButton {
        width: 25%;
        height: 40px;
        background-color: #684eed;
        border-radius: 20px;
        margin: 10px auto;
        @media only screen and (max-width: 1024px) {
            height: 30px;
            margin-top: 15px;
            font-size: 13px
        }
    }
`

export default SearchCard;