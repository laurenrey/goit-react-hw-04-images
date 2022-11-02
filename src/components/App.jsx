import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages, needValues } from 'services/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const renderGallery = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);

        if (totalHits === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        const newImages = needValues(hits);

        setImages(images => [...images, ...newImages]);
        setTotalHits(totalHits);
      } catch {
        setError(error);
        toast.error('Oops... Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    renderGallery();
  }, [error, page, searchQuery]);

  const onFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = (largeImageURL, tags) => {
    toggleModal();
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const allImages = images.length === totalHits;

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
      <ToastContainer autoClose={4000} />
      <ImageGallery images={images} onOpenModal={openModal} />
      {isLoading && <Loader />}

      {images.length !== 0 && !isLoading && !allImages && (
        <Button onClick={onLoadMore} />
      )}
      {showModal && (
        <Modal
          onModalClick={toggleModal}
          largeImage={largeImageURL}
          alt={tags}
        />
      )}
    </>
  );
}

//////////////////////////////////////////////////////////
// export class App extends Component {
//   state = {
//     images: [],
//     searchQuery: '',
//     page: 1,
//     error: null,
//     isLoading: false,
//     showModal: false,
//     largeImageURL: '',
//     tags: '',
//   };

// componentDidUpdate(prevProps, prevState) {
//   const prevSearchQuery = prevState.searchQuery;
//   const nextSearchQuery = this.state.searchQuery;
//   const prevPage = prevState.page;
//   const page = this.state.page;

//   if (prevSearchQuery !== nextSearchQuery || prevPage !== page) {
//     this.renderGallery();
//   }
// }

// renderGallery = async () => {
//   const { searchQuery, page } = this.state;
//   this.setState({ isLoading: true });

//   try {
//     const { hits, totalHits } = await fetchImages(searchQuery, page);

//     if (totalHits === 0) {
//       toast.warn(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//     const newImages = needValues(hits);

//     this.setState(({ images }) => ({
//       images: [...images, ...newImages],
//       totalHits,
//     }));
//   } catch (error) {
//     this.setState({ error });
//     toast.error('Oops... Something went wrong');
//   } finally {
//     this.setState({ isLoading: false });
//   }
// };

// onFormSubmit = searchQuery => {
//   this.setState({ searchQuery, images: [], page: 1 });
// };

// onLoadMore = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

// openModal = (largeImageURL, tags) => {
//   this.toggleModal();
//   this.setState({
//     largeImageURL,
//     tags,
//   });
// };

// toggleModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };

// render() {
//   const { images, isLoading, largeImageURL, tags, showModal, totalHits } =
//     this.state;

//   const allImages = images.length === totalHits;

// return (
//   <>
//     <Searchbar onSubmit={this.onFormSubmit} />
//     <ToastContainer autoClose={4000} />
//     <ImageGallery images={images} onOpenModal={this.openModal} />
//     {isLoading && <Loader />}

//     {images.length !== 0 && !isLoading && !allImages && (
//       <Button onClick={this.onLoadMore} />
//     )}
//     {showModal && (
//       <Modal
//         onModalClick={this.toggleModal}
//         largeImage={largeImageURL}
//         alt={tags}
//       />
//     )}
//   </>
// );
// }
// }
