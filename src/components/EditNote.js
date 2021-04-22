import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import { CirclePicker } from "react-color";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

const Title = styled.input`
  border: none;
  color: #000;npm
  display: block;
  width: 100%;
  font-size: 18px;
  margin: 10px 0;
  outline: none;
  margin-left: 10px;
  &::placeholder {
    color: #3c4043;
    opacity: 1;
  }
`;

const EditNote = (props) => {
  const { title, text, id, color } = props.noteDetails;
  const { onEditNoteText, onEditNote, onEditNoteTitle, onEditNoteColor } = props;
  const [updatedColor, setColor] = useState("");
  const [updatedText, setText] = useState(text);
  const [updatedTitle, setTitle] = useState(title);
  const [open, setOpen] = useState(false);
  const colorValue = updatedColor.length === 0 ? color : updatedColor;

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
    onEditNote(id);
  };

  const handleTextOnChange = (e) => {
    setText(e);
    onEditNoteText(e);
    onEditNoteTitle(title);
    onEditNoteColor(colorValue);
  };

  const handleTitleOnChange = (e) => {
    setTitle(e);
    onEditNoteTitle(e);
    onEditNoteText(text);
    onEditNoteColor(colorValue);
  };

  const handleColorOnChange = (e) => {
    setColor(e.hex);
    onEditNoteTitle(title);
    onEditNoteText(text);
    onEditNoteColor(e.hex);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpenModal}
        className="btn-outline-info btn-sm"
        style={{ backgroundColor: "#3b4253", position: "absolute", borderRadius: "20px", borderWidth: "2px", height: "35px", marginLeft: "180px" }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseModal}
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            color: "white",
            overflow: "hidden",
          },
        }}
      >
        <Title type="text" name="" id="edit-title-input" value={updatedTitle} onChange={(e) => handleTitleOnChange(e.target.value)} />
        <ReactQuill
          id="edit-text-input"
          placeholder="Take a note..."
          value={updatedText}
          onChange={(e) => handleTextOnChange(e)}
          style={{ marginBottom: "20px", color: "black" }}
        />
        <div style={{ marginLeft: "20px", marginBottom: "-33px" }}>
          <CirclePicker colors={props.colors} color={colorValue} onChangeComplete={(e) => handleColorOnChange(e)} />
        </div>
        <div style={{ marginRight: "20px", marginBottom: "20px" }}>
          <Button className="btn-outline" style={{ backgroundColor: "#a05050", float: "right", borderColor: "#a05050" }} onClick={handleCloseModal}>
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
