import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useSelector, useDispatch} from 'react-redux';
import { changeDate } from '../actions/index';
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiFillHeart} from 'react-icons/ai';
let moment = require('moment');

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const dispatch = useDispatch();
  const date = useSelector(state => state.dateReducer);
  let selectedDate = moment(new Date).format('YYYY-MM-DD');
  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    fetchPhoto();
    if(localStorage.getItem('fav') !== null){
      setFavourite(JSON.parse(localStorage.getItem('fav')));
    }
  }, []);

  const formatDate = () => {
    selectedDate = moment(date).format('YYYY-MM-DD');
    console.log(date);
    console.log(selectedDate);
  }

  const fetchPhoto = async () => {
    console.log('Called....');
    formatDate();
    const data = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`
    ).then(res => res.json());
    setPhotoData(data);
    console.log(data);
  }

  if (!photoData) return <div />;

  const handleDate = (date) => {  
    dispatch(changeDate(date));
    fetchPhoto();
  }

  const increaseDate = () => {
    const newDate = moment(date).add(1, 'days');
    dispatch(changeDate(newDate._d));
    fetchPhoto();
  }

  const decreaseDate = () => {
    const newDate = moment(date).subtract(1, 'days');
    dispatch(changeDate(newDate._d));
    fetchPhoto();
  }

  const addToFavourite = () => {
    alert('Adding to favourites');
    const temp = favourite;
    temp.push(photoData.url);
    setFavourite(temp);
    localStorage.setItem('fav', JSON.stringify(temp));
  }

  return (
    <>
    <NavBar/>
    <div className="nasa-photo">
      {photoData.media_type === "image" ? (
        <img
          src={photoData.url}
          alt={photoData.title}
          className="photo"
        />
      ) : (
        <iframe
          title="space-video"
          src={photoData.url}
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
          className="photo"
        />
      )}
      <div>
        <span>Change date: </span>
        <DatePicker 
          selected={date} onChange={date => handleDate(date)} />
        <div>
          <span style={{marginRight: '10px'}}>
            <AiOutlineArrowLeft onClick={decreaseDate} style={{cursor: 'pointer'}}/>
          </span>
          <span>
            <AiOutlineArrowRight onClick={increaseDate} style={{cursor: 'pointer'}}/>
          </span>
          <span style={{marginLeft: '10px', cursor: 'pointer'}}>
            <AiFillHeart onClick={addToFavourite}/>
          </span>
        </div>
        <h1>{photoData.title}</h1>
        <p className="date">{photoData.date}</p>
        <p className="explanation">{photoData.explanation}</p>
      </div>
    </div>
    {/* Favourites section */}
    <span style={{marginLeft: '10px', fontSize: '30px', marginTop: '20px'}}>Favourite Images</span>
    <div style={{
          width: '100vw',
          marginBottom: '20px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'}}>
        {favourite.map((fav, i) => {
          return <img
                  src={fav}
                  alt={fav}
                  width='300px'
                  height='300px'
                  style = {{
                    marginLeft: '10px'
                  }}
                />
        })}
    </div>
    
    </>
  );
}
