import React from "react";
import { Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageProvider, ImageContext } from "./Context/imageContext";
import { ImageCol } from "./imageColComponent";
import { SearchComponent } from "./searchComponent";

export class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageProvider>
        <ToastContainer />
        <ImageContext.Consumer>
          {({ search }) => {
            return <SearchComponent search={search} />;
          }}
        </ImageContext.Consumer>
        <ImageContext.Consumer>
          {({ images }) => {
            let rowlist = [];
            var temp = [];
            for (let i = 1; i < images.length + 1; i++) {
              temp.push(<ImageCol key={i} data={images[i]} />);
              if (i % 3 == 0) {
                rowlist.push(<Row key={i}>{temp}</Row>);
                temp = [];
              }
            }
            return rowlist;
          }}
        </ImageContext.Consumer>
      </ImageProvider>
    );
  }
}
