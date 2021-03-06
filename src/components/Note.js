import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import parse from "html-react-parser";
import EditNote from "./EditNote";

const NoteDiv = styled.div``;

const H = styled.h3`
  font-size: 14px;
  color: white;
`;

const P = styled.h3`
  font-size: 12px;
  color: white;
`;

const Note = (props) => {
  const { title, text, id } = props.note;
  const { onEditNoteText, onEditNote, onEditNoteTitle, onEditNoteColor, onDeleteNote, colors, note } = props;

  return (
    <NoteDiv>
      <H>{title}</H>
      <P>{parse(text)}</P>
      <EditNote
        noteDetails={note}
        onEditNoteText={(state) => onEditNoteText(state)}
        onEditNoteTitle={(state) => onEditNoteTitle(state)}
        onEditNoteColor={(state) => onEditNoteColor(state)}
        onEditNote={(id, originalColor) => onEditNote(id, originalColor)}
        colors={colors}
      />
      <Button
        className="btn-outline-danger btn-sm"
        style={{ backgroundColor: "#3b4253", position: "absolute", borderRadius: "20px", borderWidth: "2px", height: "35px", width: "35px", marginLeft: "230px" }}
        onClick={() => onDeleteNote(id)}
      >
        X
      </Button>
    </NoteDiv>
  );
};

export default Note;
