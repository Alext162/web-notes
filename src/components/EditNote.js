import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { CirclePicker } from "react-color";
import styled from "styled-components";

const Title = styled.input`
  border: none;
  color: #000;npm
  display: block;
  width: 100%;
  font-size: 18px;
  margin: 10px 0;
  // display:none;
  outline: none;
  &::placeholder {
    color: #3c4043;
    opacity: 1;
  }
`;

//preset colors for color picker
const colors = ["#FF6900", "#FCB900", "#7BDCB5", "#8ED1FC", "#EB144C"];

const EditNote = (props) => {
  const [open, setOpen] = useState(false);
  const { title, text, id } = props.noteDetails;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
    props.onEditNote();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className="btn-outline-info btn-sm"
        style={{ backgroundColor: "#3b4253", position: "absolute", borderRadius: "20px", borderWidth: "2px", height: "35px", marginLeft: "180px" }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            color: "white",
            overflow: "hidden",
          },
        }}
      >
        <Title type="text" name="" id="" value={title} onChange={() => props.handleTitleInput()} style={{ marginLeft: "10px" }} />
        <ReactQuill placeholder="Take a note..." value={text} onChange={() => props.handleTextInput()} style={{ marginBottom: "20px", color: "black" }} />
        <div style={{ marginLeft: "20px", marginBottom: "-33px" }}>
          <CirclePicker colors={colors} />
        </div>
        <div style={{ marginRight: "20px", marginBottom: "20px" }}>
          <Button className="btn-outline" style={{ backgroundColor: "#a05050", float: "right", borderColor: "#a05050" }} onClick={handleClose}>
            Close
          </Button>
          <Button className="btn-outline bt-m" style={{ backgroundColor: "#505c75", float: "right", borderColor: "#505c75", marginRight: "10px" }} onClick={handleEdit}>
            Edit
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default EditNote;
