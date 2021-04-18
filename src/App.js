import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import firebase from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showInput, setShowInput] = useState(false);
  const [textFocused, setTextFocused] = useState(false);
  const [titleFocused, setTitleFocused] = useState(false);

  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const [editedTitleValue, setEditedTitleValue] = useState("");
  const [editedTextValue, setEditedTextValue] = useState("");
  const [editedColorValue, setEditedColorValue] = useState("");

  const [colorValue, setColorValue] = useState("#000000");
  const [colorFilterValue, setColorFilterValue] = useState("#000000");
  const [noteToDelete, setDeletedNote] = useState("");
  const [notes, setNotes] = useState([]);

  const ref = firebase.firestore().collection("notes");

  const getData = async () => {
    let notesArr = [];
    try {
      let allDocs = await ref.get();
      allDocs.forEach((note) => {
        notesArr.push({ ...note.data(), id: note.id });
      });

      if (notesArr.length !== 0) {
        if (colorFilterValue === "#000000") {
          setNotes(notesArr);
        } else {
          const filteredNotes = notesArr.filter((item) => item.color === colorFilterValue);
          setNotes(filteredNotes);
        }
      } else {
        setNotes([]);
        toast.info("No notes :(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = () => {
    if (textValue.length !== 0 && titleValue.length !== 0) {
      setShowInput(false);
      let noteObj = {
        title: titleValue,
        text: textValue,
        color: colorValue,
      };
      try {
        ref.add(noteObj);
      } catch (error) {
        console.log(error);
      } finally {
        setTextValue("");
        setTitleValue("");
        setColorValue("#000000");
        setColorFilterValue("#000000");
        getData();
      }
    } else {
      toast.info("Please add title & body!");
    }
  };

  const deleteNote = async () => {
    if (noteToDelete !== "") {
      try {
        await firebase.firestore().collection("notes").doc(noteToDelete).delete();
      } catch (err) {
        console.log(err);
      } finally {
        getData();
        toast.info("Note deleted :)");
      }
    }
  };

  const editNote = async (id) => {
    if (editedTextValue.length !== 0 || editedTitleValue.length !== 0) {
      try {
        await firebase.firestore().collection("notes").doc(id).update({ text: editedTextValue, title: editedTitleValue, color: editedColorValue });
      } catch (err) {
        console.log(err);
      } finally {
        getData();
        toast.info("Note Edited :)");
      }
    }
  };

  useEffect(() => {
    deleteNote();
    // eslint-disable-next-line
  }, [noteToDelete]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [colorFilterValue]);

  return (
    <div className="App">
      <Header />
      <ToastContainer autoClose={3000} position="bottom-center" />
      <Main
        textValue={textValue}
        titleValue={titleValue}
        showInput={showInput}
        textFocused={textFocused}
        titleFocused={titleFocused}
        onTextFocus={(state) => setTextFocused(state)}
        onTitleFocus={(state) => setTitleFocused(state)}
        onShowInput={(state) => setShowInput(state)}
        onTextChange={(state) => setTextValue(state)}
        onTitleChange={(state) => setTitleValue(state)}
        onColorChange={(state) => setColorValue(state)}
        onColorFilterChange={(state) => setColorFilterValue(state)}
        onDeleteNote={(state) => setDeletedNote(state)}
        onEditNoteTitle={(state) => setEditedTitleValue(state)}
        onEditNoteText={(state) => setEditedTextValue(state)}
        onEditNoteColor={(state) => setEditedColorValue(state)}
        onEditNote={(id) => editNote(id)}
        onCreateNote={() => addNote()}
        onGetData={() => getData()}
        notes={notes}
      />
    </div>
  );
}

export default App;
