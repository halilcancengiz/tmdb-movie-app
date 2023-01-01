import React, { useEffect, useState, useCallback } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom';
import { getUpcomingMovies, searchByGenreId } from './../services/tmdb/tmdb';
import { Helmet } from 'react-helmet';
import { posterURL } from './../services/apiURLs';
import MovieCard from './../components/MovieCard';
import Pagination from '../components/Pagination';
import SearchBar from './../components/SearchBar';
import useRedux from '../hooks/useRedux';
import { genres } from '../utils/genres';
import { mainSettings } from '../utils/sliderSettings';
import { Segmented, Tooltip } from 'antd';
import Slider from 'react-slick';
import "../css/main.css"


function Main() {

    const [movies, setMovies] = useState([]);
    const [genreId, setGenreId] = useState(null)
    const [genreName, setGenreName] = useState(null)
    const [searchList, setSearchList] = useState([])
    const { language } = useRedux()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1;
    const genresName = genres.map(name => name.name)


    const checkGenresValue = useCallback((e) => {
        const findGenre = genres.find(x => x.name === e)
        if (findGenre && findGenre.id) {
            const result = findGenre.id
            setGenreId(result)
            setSearchParams(1)
        }
    }, [setSearchParams])

    useEffect(() => {
        getUpcomingMovies(language).then((result) => setMovies(result));
        checkGenresValue()
        console.count("render main");
        searchByGenreId(genreId, page, language,).then((result) => setSearchList(result.sort((a, b) => b.vote_average - a.vote_average)))
    }, [language, genreId, page, checkGenresValue]);



    return (
        <div className='d-flex flex-column'>

            <Helmet>
                <title>{genreName ? `${genreName} Filmleri - ${`Sayfa-${page}`}` : "Ana Sayfa"}</title>
                <meta name="description" content="Bu sayfada güncel filmler ve kategoriye göre sıralanmış filmler yer almaktadır." />
            </Helmet>

            <div className='d-flex flex-column container mx-auto'>
                <h4 className='webkitHeader-h4 text-center text-uppercase my-5'>Güncel Filmler</h4>
            </div>
            <div className='container' >
                <Slider {...mainSettings}>
                    {
                        movies ? movies.map((item, index) => (
                            <div key={item.id}>
                                <NavLink to={`/movie/${item.id}/${item.title.replace(/\s/g, '')}`} className='h-100 d-flex align-items-center justify-content-center p-0 m-0'>
                                    <Tooltip title={item.original_title}>
                                        <img style={{ minWidth: "100px", width: "150px", aspectRatio: "4/6", boxShadow: "0 0 10px black" }} className='img-fluid rounded-4 my-4' src={posterURL(item.poster_path)} alt="" />
                                    </Tooltip>
                                </NavLink>
                            </div>

                        )) : ""
                    }
                </Slider>
            </div>
            <h4 className='webkitHeader-h4 text-center text-uppercase mt-5'>Kategoriler</h4>
            <div className="container mx-auto p-0 text-center d-flex align-items-center justify-content-center flex-column mt-4">
                <Segmented
                    style={{ boxShadow: "0 0 10px gray", background: "#0a253e" }}
                    className="py-1 w-100 text-center text-white"
                    onChange={(e) => {
                        checkGenresValue(e)
                        setGenreName(e)
                    }}
                    options={genresName} />
            </div>
            <h4 className='webkitHeader-h4 text-uppercase'>{ }</h4>
            <div  className='searchList d-flex flex-wrap mx-auto container align-items-center justify-content-center'>
                {
                    searchList ? <MovieCard movieList={searchList} /> : ""
                }
            </div>

            <Pagination page={page} setSearchParams={setSearchParams} />
            <SearchBar />
        </div>
    )
}
export default Main