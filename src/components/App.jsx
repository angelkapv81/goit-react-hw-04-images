import React, { useState, useEffect, useRef } from 'react';
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
axios.defaults.baseURL = 'https://pixabay.com/api/';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error] = useState(null);

  const totalHitsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') return;

      setStatus('pending');

      try {
        const imageData = await fetchApi(searchQuery, page);
        totalHitsRef.current = imageData.totalHits;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning(
            'No results were found for your search, please try something else.',
            { transition: Zoom, position: 'top-center' }
          );
        }
        setImages(prevImages => [...prevImages, ...imagesHits]);
        setStatus('resolved');
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        setStatus('rejected');
      }
    };

    fetchData();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page > 1 && images.length > 0) {
      const CARD_HEIGHT = 300; // preview image height
      const scrollHeight = CARD_HEIGHT * 2;
      window.scrollBy({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  const handleFormSubmit = newSearchQuery => {
    if (searchQuery === newSearchQuery) {
      return;
    }
    resetState();
    setSearchQuery(newSearchQuery);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
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
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === 'pending' && <Spiner />}
      {error && (
        <h1 style={{ color: 'orangered', textAlign: 'center' }}>
          {error.message}
        </h1>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
      )}
      {images.length > 0 && images.length !== totalHitsRef.current && (
        <LoadMoreButton onClick={loadMore} />
      )}
      {selectedImage && (
        <Modal selectedImage={selectedImage} tags={alt} onClose={closeModal} />
      )}
    </AppContainer>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string,
};

export default App;
