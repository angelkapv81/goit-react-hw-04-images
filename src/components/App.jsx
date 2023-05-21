import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import { AppContainer } from './App.styled';
import fetchApi from '../components/ApiService/ApiService';
import Spiner from './Loader/Loader';
import Modal from './Modal/Modal';
import React, { useState, useEffect } from 'react';

axios.defaults.baseURL = 'https://pixabay.com/api/';

function App() {
  // static propTypes = { searchQuery: PropTypes.string };
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [alt, setAlt] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  // totalHits = null;
  
 const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery !== '' && (searchQuery !== prevState.searchQuery || page !== prevState.page)) {
        setStatus('pending');

        try {
          const imageData = await fetchApi(searchQuery, page);
          setTotalHits(imageData.total);
          const imagesHits = imageData.hits;
          if (!imagesHits.length) {
            toast.warning(
              'No results were found for your search, please try something else.',
              { transition: Zoom, position: 'top-center' }
            );
          }
          setImages(prevImages => [...prevImages, ...imagesHits]);
          setStatus('resolved');

          if (page > 1) {
            const CARD_HEIGHT = 300; // preview image height
            window.scrollBy({
              top: CARD_HEIGHT * 2,
              behavior: 'smooth',
            });
          }
        } catch (error) {
          toast.error(`Sorry something went wrong. ${error.message}`);
          setStatus('rejected');
        }
      }
    };

    fetchData();
  }, [searchQuery, page]);

 const handleFormSubmit = (searchQuery) => {
    if (searchQuery === searchQuery) {
      return;
    }
    resetState();
    setSearchQuery(searchQuery);
  };
// }

  const handleSelectedImage = (largeImageUrl, tags) => {
      setSelectedImage(largeImageUrl),
      setAlt(tags),
  };




 const resetState = () => {
   setSearchQuery('');
   setPage(1);
   setImages([]);
   setSelectedImage(null);
   setAlt(null);
   setStatus('idle');
    };

 const loadMore = () => {
      setPage(prevState => prevState + 1),
    };

const closeModal = () => {
    setSelectedImage(null);
  };

return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};
