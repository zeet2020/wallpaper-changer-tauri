import React from "react";
import { toast } from "react-toastify";

import api_key from "../../apiKey";
const ImageContext = React.createContext();

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

class ImageProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      original: [],
      searchTerm: null,
    };
    this.updateContext = (state) => {
      this.setState(state);
    };

    this.updateImageData = (imgObj) => {
      let list = this.state.images;
      for (let i = 0; i < list.lenght; i++) {
        if (imgObj.id === list[i].id) {
          list[i] = imgObj;
          break;
        }
      }
      this.updateContext({ images: list });
    };
    this.search = debounce((terms) => {
      terms && terms.length && this.updateData(terms);
    }, 500);

    this.handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (
          parseInt(this.state.original.total / 20) +
            (this.state.original.total % 20 !== 0 ? 1 : 0) >
          this.pageCount
        ) {
          this.pageNext();
        }
      }
    };
  }

  componentDidMount() {
    this.updateData();
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  pageNext() {
    this.pageCount = this.pageCount + 1;
    let toastid = toast.info("Fetching Results", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    });
    let term = this.state.searchTerm || "nature";
    return this.getData(term).then((r) => {
      r.json().then(
        (data) => {
          toast.dismiss(toastid);
          let images = this.state.images;
          for (let i = 0; i < data.hits.length; i++) {
            images.push(data.hits[i]);
          }
          this.updateContext({ images: images });
        },
        () => {
          toast.dismiss(toastid);
        }
      );
    });
  }

  updateData(term) {
    if (api_key.length == 0) {
      toast.info("No API-KEY, CHECK README", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    } else {
    this.pageCount = 1;
    let toastid = toast.info("Fetching Results", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    });
    this.setState({ searchTerm: term });
    return this.getData(term).then((r) => {
      r.json().then((data) => {
        toast.dismiss(toastid);
        this.updateContext({ images: data.hits, original: data });
      });
    });
    }
     
  }
  getData(searchTerm = "wild animals") {
    let url = `https://pixabay.com/api/?key=${api_key}&image_type=photo&pretty=tru&q=${searchTerm}`;

    if (this.pageCount) {
      url = url + `&page=${this.pageCount}`;
    }

    return fetch(url);
  }

  render() {
    return (
      <ImageContext.Provider
        value={{
          images: this.state.images,
          updateData: this.updateImageData,
          search: this.search,
        }}
      >
        {this.props.children}
      </ImageContext.Provider>
    );
  }
}

export { ImageProvider, ImageContext };
