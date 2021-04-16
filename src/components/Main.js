import React, { useRef, useState } from "react";
import styled from "styled-components";
import Note from "./Note";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { CirclePicker } from "react-color";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
}));

//preset colors for color picker
const colors = ["#FF6900", "#FCB900", "#7BDCB5", "#8ED1FC", "#EB144C"];

const NoteInput = styled.form`
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  width: 600px;
  border-radius: 8px;
  margin: 40px auto;
  padding: 15px;
  background-color: white;
`;
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
const TextArea = styled.textarea`
  border: none;
  color: #000;
  display: block;
  width: 100%;
  font-family: "Noto Sans", sans-serif;
  font-size: 13px;
  outline: none;
  /* height:100%; */
  resize: none;
  overflow: hidden;
  min-height: 10px;
  &::placeholder {
    color: #3c4043;
    opacity: 1;
  }
`;

const Main = (props) => {
  const classes = useStyles();
  const [color, setColor] = useState("#2196f3");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [filterColor, setFilterColor] = useState("#2196f3");
  const textAreaRef = useRef(null);

  const autoGrow = (elem) => {
    elem.current.style.height = "5px";
    elem.current.style.height = 10 + elem.current.scrollHeight + "px";
  };

  const handleColorChangeEvent = (color) => {
    setColor(color.hex);
    props.onColorChange(color.hex);
  };

  const handleColorFilterEvent = (filterColor) => {
    setFilterColor(filterColor.hex);
    props.onColorFilterChange(filterColor.hex);
  };

  const handleResetClick = () => {
    props.onGetData();
    setFilterColor("#000000");
    setColor("#000000");
    props.onColorFilterChange("#000000");
    toast.info("Filters Reset!");
  };

  const handleTextInput = (value) => {
    setText(value);
    props.onTextChange(value);
    props.onEditNoteValuesChange(value);
  };

  const handleTitleInput = (value) => {
    setTitle(value);
    props.onTitleChange(value);
    props.onEditNoteValuesChange(value);
  };

  return (
    <main>
      <NoteInput action="">
        {!props.showInput ? (
          <>
            <TextArea
              name=""
              id=""
              cols="30"
              rows="1"
              placeholder="Take a note..."
              value={props.textValue}
              onFocus={() => {
                props.onShowInput(true);
                props.onTextFocus(true);
                textAreaRef.current.focus();
              }}
              onInput={() => autoGrow(textAreaRef)}
              ref={textAreaRef}
              onBlur={() => props.onTextFocus(false)}
              onChange={(e) => props.onTextChange(e.target.value)}
            />
          </>
        ) : (
          <>
            <Title
              type="text"
              name=""
              id=""
              placeholder="Enter Title..."
              value={title}
              onFocus={() => props.onTitleFocus(true)}
              onBlur={() => props.onTitleFocus(false)}
              onChange={(e) => handleTitleInput(e.target.value)}
            />
            <ReactQuill
              placeholder="Take a note..."
              value={text}
              onChange={(e) => handleTextInput(e)}
              onFocus={() => {
                props.onShowInput(true);
                props.onTextFocus(true);
                textAreaRef.current.focus();
              }}
              // onInput={() => autoGrow(textAreaRef)}
              onBlur={() => props.onTextFocus(false)}
              ref={textAreaRef}
              style={{ marginBottom: "20px" }}
            />
            <div style={{ position: "absolute" }}>
              <CirclePicker colors={colors} color={color} onChangeComplete={(e) => handleColorChangeEvent(e)} />
            </div>
            <div style={{ position: "absolute", marginLeft: "400px", marginTop: "-5px" }}>
              <Button className="btn-outline" style={{ backgroundColor: "#a05050", float: "right", borderColor: "#a05050" }} onClick={() => props.onShowInput(false)}>
                Close
              </Button>
              <Button
                className="btn-outline bt-m"
                style={{ backgroundColor: "#505c75", float: "right", borderColor: "#505c75", marginRight: "10px" }}
                onClick={() => {
                  props.onCreateNote();
                  setText("");
                }}
              >
                Add Note
              </Button>
            </div>
          </>
        )}
      </NoteInput>
      <div style={{ position: "absolute", marginLeft: "50px" }}>
        <CirclePicker colors={colors} color={filterColor} onChangeComplete={(e) => handleColorFilterEvent(e)} width="50px" />
        <Button
          className="btn-outline btn-sm"
          style={{ backgroundColor: "#242424", borderColor: "#242424", borderRadius: "20px", height: "30px", width: "30px", marginTop: "10px", marginRight: "10px" }}
          onClick={() => handleResetClick()}
        >
          X
        </Button>
      </div>
      <div className={classes.root}>
        <Grid container justify="center">
          {props.notes.map((note, index) => (
            <Grid item lg key={index}>
              <Paper
                className={classes.paper}
                style={{
                  padding: "20px",
                  border: `3px solid ${note.color}`,
                  borderRadius: "8px",
                  textAlign: "left",
                  margin: "10px",
                  backgroundColor: "#3b4253",
                  wordWrap: "break-word",
                  minWidth: "300px",
                  maxWidth: "300px",
                }}
              >
                <Note
                  note={note}
                  onDeleteNote={(state) => props.onDeleteNote(state)}
                  onEditNote={() => props.onEditNote()}
                  key={note.id}
                  handleTextInput={(e) => handleTextInput(e)}
                  handleTitleInput={(e) => handleTitleInput(e)}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
};

export default Main;
