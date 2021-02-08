import React from 'react'
import './BrowseScreen.css'
import Nav from './Nav'
import Banner from './Banner'
import requests from './requests'
import Row from './Row'

const BrowseScreen = () => {
    return (
        <div className='browseScreen'>
            <Nav />
            <Banner />
            <Row title='Trending' fetchURL={requests.fetchTrending} />
            <Row title='Top Rated' fetchURL={requests.fetchTopRated} />
            <Row title='Netflix Originals' fetchURL={requests.fetchNetflixOriginals} isLargeRow />
            <Row title='Action Movies' fetchURL={requests.fetchActionMovies} />
            <Row title='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
            <Row title='Horror Movies' fetchURL={requests.fetchHorrorMovies} />
            <Row title='Romance Movies' fetchURL={requests.fetchRomanceMovies} />
            <Row title='Documentaries' fetchURL={requests.fetchDocumentaries} />
        </div>
    )
}

export default BrowseScreen