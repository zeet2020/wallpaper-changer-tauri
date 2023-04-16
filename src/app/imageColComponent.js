import React from "react";
import { Col, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { invoke } from '@tauri-apps/api/tauri';

async function setWallpaper(imagepath) {
    let res = await invoke("set_wallpaper",{url:imagepath});
    if(res) {
      toast.info("Updating the wallpaper", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
}

export class ImageCol extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = () => {  
      setWallpaper(this.props.data.largeImageURL);
    };
  }

  render() {
    let data = this.props.data;
    return (
      <Col
        onClick={this.onClick}
        className="imageholder"
        xs={6}
        md={4}
        display={data && data.largeImageURL ? "show" : "hide"}
      >
        {data && data.largeImageURL ? (
          <Image
            alt="click to change wallpaper"
            src={data.largeImageURL}
            fluid
          />
        ) : (
          <p>placeholder</p>
        )}
        <div className="middle">
          <div className="text">Apply</div>
        </div>
      </Col>
    );
  }
}
