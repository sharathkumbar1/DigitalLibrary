import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IconButton } from "@material-ui/core";
import carasoul1 from "../../images/carasoul1.png";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import { isEmpty } from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPdfURL, setPdfISBN } from "../../store/personalDevelopment/actionCreator";
import {
  saveSearchValue,
  clearSearchValue,
  clearSearchList,
} from "../../store/search/ActionCreator";
import Button from "@material-ui/core/Button";
import AdminPage from "../AdminPage/AdminPage";
import Popup from "../SearchPage/Popup";
import {
  showNotificationError,
  showNotificationSuccess,
} from "../../store/notification/actionCreator";
import {
  signUp,
  handleSignUpError,
  handleSignUpSuccess,
} from "../../store/signup/actionCreator";

import NotificationSuccess from "../Notifications/NotificationSuccess";
import NotificationError from "../Notifications/NotificationError";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { readPDF, editAudibles, editPdf, searchCall } from "../../config/apiCalls";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "left",
    maxWidth: 450,
    paddingLeft: 10,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  fonts: {
    fontSize: 20,
    fontStyle: "italic",
    align: "left",
    fontWeight: "bold",
    color: "darkgreen",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    height: 80,
    outlineColor: "black",
    color: "black",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "98%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  check: {
    paddingLeft: "30px",
  },
  // alignButton: {
  //   position: "relative",
  //   right: "10px",
  // }
}));

export default function SearchPage(props) {
  const searchTextFocus = useRef();
  const [searchBook, setSearchBook] = useState([]);
  const classes = styles();
  const [isOnSelect, setIsOnSelect] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [error, setError] = useState(null);
  let history = useHistory();
  const [checkBox, setCheckBox] = React.useState({
    pdf: true,
    audio: true,
  });
  const [originalSearchList, setOriginalSearchList] = useState([]);
  const [pdfBooks, setPdfBooks] = useState([]);
  var listOfPdfBooks = [];
  var listOfAudioBooks = [];
  const [hideCheckbox, setHideCheckbox] = useState(false);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordsForEdit, setRecordsForEdit] = useState(null);
  const [admin, setAdmin] = useState("");
  const [isfetched, setIsFetched] = useState(false);



  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const searchRetainList = useSelector(
    (state) => state.searchReducer.searchList
  );

  const signInPostResponse = useSelector(
    (state) => state.signInReducer.signInPostResponse
  );

  useEffect(() => {

    console.log("search.... ", searchBook);
    if (!isEmpty(searchBook)) {

      getSearchBooks(searchBook).then((result) => {

        setIsFetched(true);
        setSearchList(result.data);
        setOriginalSearchList(result.data);
      });
      console.log("submittttted");
      console.log(searchList);
      console.log("search.... ", searchBook);
      setIsOnSelect(true);
      setHideCheckbox(true);
    }
  }, [searchBook])

  useEffect(() => {
    if (signInPostResponse) {
      console.log(signInPostResponse);
      document.getElementById("searchText").focus();
      const { isAdmin } = signInPostResponse;
      setAdmin(isAdmin);
    }
  }, [signInPostResponse]);

  useEffect(() => {
    //searchTextFocus.current.focus();
    !isEmpty(searchValue) ? setIsOnSelect(true) : setIsOnSelect(false);
    !isEmpty(searchValue) ? setHideCheckbox(true) : setHideCheckbox(false);
    !isEmpty(searchValue) ? setSearchBook(searchValue) : setSearchBook("");
  }, []);

  const resetReduxStoreAndHideNotifications = () => {
    dispatch(handleSignUpSuccess({ data: null }));
    dispatch(handleSignUpError(null));
    dispatch(showNotificationError(false, ""));
    dispatch(showNotificationSuccess(false, ""));
  };

  const handleSearch = (event) => {
    const copySearchBook = event.target.value.toLowerCase();
    console.log("copySearchBook ", copySearchBook)
    setSearchBook(copySearchBook);
    dispatch(saveSearchValue(copySearchBook));
  };

  function getSearchBooks(searchBook) {
    return searchCall(searchBook);
  }

  const onSearchSubmit = (event) => {
    if (!isEmpty(searchBook)) {
      getSearchBooks(searchBook).then((result) => {
        setIsFetched(true);
        setSearchList(result.data);
        setOriginalSearchList(result.data);
      });
      console.log("submittttted");
      console.log(searchList);
      console.log(searchBook);
      setIsOnSelect(true);
      setHideCheckbox(true);
    }
  };
  const onClear = (e) => {
    console.log("kkkk", e.keyCode)
    if (e.keyCode == 13 || e.which == 13 || e.key == 'Enter') {
      onSearchSubmit();
    }
  };

  const onClearSubmit = (event) => {
    console.log("clear search results")
    setSearchBook("");
    setPdfBooks("");
    setIsOnSelect(false);
    setHideCheckbox(false);
    if (!isfetched) {
      dispatch(clearSearchValue());
      dispatch(clearSearchList());
    }
  };

  const readClicked = (file_name, isbn) => {
    // dispatch(setPdfURL(pdfLink));
    console.log("book opened ", file_name);
    //dispatch(setPdfURL("../../data/pdf/sample1.pdf"));
    //history.push("/pdfviewer");

    let pdfLink = "";
    readPDF(file_name)
      .then((response) => {
        pdfLink = response.data;
        console.log("response data qqqq" + response.data);
        dispatch(setPdfURL(pdfLink));
        dispatch(setPdfISBN(isbn));
        history.push("/pdfviewer");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });
    console.log(event.target.checked);
    console.log(event.target.name);
    if (event.target.name === "pdf") {
      if (event.target.checked) {
        listOfPdfBooks = searchList.filter((obj) => obj.book_type === "PDF");
        setSearchList(listOfPdfBooks);
      } else {
        console.log(originalSearchList);
        setSearchList(originalSearchList);
      }
    }
    if (event.target.name === "audio") {
      if (event.target.checked) {
        listOfPdfBooks = searchList.filter(
          (obj) => obj.book_type === "Audio Book"
        );
        setSearchList(listOfPdfBooks);
      } else {
        console.log(originalSearchList);
        setSearchList(originalSearchList);
      }
    }
    if (event.target.name === "pdf" && event.target.name === "Audio Book") {
      setSearchList(originalSearchList);
    }
  };

  const handleChangePdf = (event) => {
    setSearchList(originalSearchList);
    console.log(event.target.checked);
    console.log(event.target.name);

    listOfPdfBooks = originalSearchList.filter(
      (obj) => obj.book_type === "PDF"
    );
    setSearchList(listOfPdfBooks);
    console.log(listOfPdfBooks);
  };

  const handleChangeAudio = (event) => {
    setSearchList(originalSearchList);
    console.log(event.target.checked);
    console.log(event.target.name);
    listOfPdfBooks = originalSearchList.filter(
      (obj) => obj.book_type === "Audio Book"
    );
    setSearchList(listOfPdfBooks);
    console.log(listOfPdfBooks);
  };

  const handleRoute = (route) => {
    listOfPdfBooks = searchList.filter((obj) =>
      obj.book_type === "Audio Book" ? history.push(`${route}`) : ""
    );
  };

  const openInPopup = (item) => {
    setRecordsForEdit(item);
    setOpenPopup(true);
  };

  const processRequestEdit = async (isbn, bookDetails) => {
    try {
      const requestConfig = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      return editPdf(isbn, bookDetails, requestConfig).then((response) => {
        console.log(response);
        setOpenPopup(false);
        if (!isfetched) {
          dispatch(showNotificationError(true, "Book is updated successfully"));
        }
      });
    } catch (err) {
      dispatch(showNotificationError(true, "Error"));
      console.log("page is updated......");
    }
  };

  const processRequestEditAudio = async (isbnA, bookDetailsAudio) => {
    try {
      const requestConfig = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      return editAudibles(isbnA, bookDetailsAudio, requestConfig).then(
        (response) => {
          console.log(response);
          setOpenPopup(false);
          if (!isfetched) {
            dispatch(
              showNotificationError(true, "Audio Book updated successfully")
            );
          }
        }
      );
    } catch (err) {
      dispatch(showNotificationError(true, "Error"));
      setOpenPopup(false);
      console.log("time is updated......");
    }
  };

  const updateEditValue = (editedValue = []) => {
    const editedRowIndex = searchList.findIndex(
      (obj) => obj.isbn === editedValue.isbn
    );
    searchList[editedRowIndex] = editedValue;
    setSearchList(searchList);
  };

  const openInPopup1 = () => {
    setOpenPopup(true);
  };

  const deleteFunc = (isbn) => {
    if (window.confirm("Are you sure?")) {
      return axios.delete(
        "http://ec2-52-66-201-52.ap-south-1.compute.amazonaws.com:5000/books/" +
        isbn,
        {
          headers: { "Content-type": "application/json" },
        }
      );
    }
  };

  const softDlt = (isbndlt) => {
    console.log(searchList);
    console.log("softtttt dlt");
    let indexCopy = searchList.filter((obj) => obj.isbn !== isbndlt);

    setSearchList(indexCopy);
  };

  return (
    <div >
      {/* style={{ width: 450 }} */}
      <div>

        <InputBase
          placeholder="Search…"
          ref={searchTextFocus}
          className={classes.search}
          id="searchText"
          inputProps={{ "aria-label": "search" }}
          value={searchBook}
          onChange={handleSearch}
          onKeyPress={(e) => onClear(e)}

          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="clear text" onClick={onClearSubmit}>
                {/* <SearchIcon onKeyPress={(e) => onClear(e)} onClick={onSearchSubmit} /> */}
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          }
        />

        <div>
          {hideCheckbox ? (
            <FormGroup row className={classes.check}>
              <RadioGroup row aria-label="position">
                <FormControlLabel
                  value="pdf"
                  name="pdf"
                  control={<Radio color="primary" />}
                  label="pdf"
                  labelPlacement="End"
                  onClick={handleChangePdf}
                />
                <FormControlLabel
                  value="audio"
                  name="audio"
                  control={<Radio color="primary" />}
                  label="audio"
                  labelPlacement="End"
                  onClick={handleChangeAudio}
                />
              </RadioGroup>
            </FormGroup>
          ) : (
            ""
          )}
        </div>
      </div>
      {isOnSelect
        ? searchList.map((item) =>
          item.title.toLowerCase().includes(searchBook) ||
            item.author_name.toLowerCase().includes(searchBook) ? (
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt={item.title}
                        src={item.thumbnail_url}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = carasoul1;
                        }}
                        onClick={() => {
                          if (item.book_type === "Audio Book") {
                            handleRoute(
                              `/audiobook/${item.file_name}/${item.title}`
                            );
                          } else {
                            readClicked(item.file_name, item.isbn);
                          }
                        }}
                      />
                    </ButtonBase>
                  </Grid>

                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        onClick={() => {
                          if (item.book_type === "Audio Book") {
                            handleRoute(
                              `/audiobook/${item.file_name}/${item.title}`
                            );
                          } else {
                            readClicked(item.file_name, item.isbn);
                          }
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Author: {item.author_name}
                        <br /> {item.book_type}
                      </Typography>
                      {admin ? (
                        <div >
                          <Button
                            variant="text"
                            size="small"
                            style={{
                              position: "relative",
                              left: "200px",
                              bottom: "35px",
                            }}
                            onClick={() => openInPopup(item)}
                          >
                            edit
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            style={{
                              position: "relative",
                              backgroundColor: "#f03131",
                              left: "136px",
                              bottom: "2px",
                            }}
                            onClick={() => {
                              deleteFunc(item.isbn);
                              softDlt(item.isbn);
                            }}
                          >
                            DELETE
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            ""
          )
        )
        : ""}

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AdminPage
          recordsForEdit={recordsForEdit}
          updateEditValue={updateEditValue}
          processRequestEdit={processRequestEdit}
          processRequestEditAudio={processRequestEditAudio}
        />
      </Popup>

      <div className={classes.notificationContainer}>
        <NotificationError
          resetReduxStoreAndHideNotifications={
            resetReduxStoreAndHideNotifications
          }
        />
        <NotificationSuccess
          resetReduxStoreAndHideNotifications={
            resetReduxStoreAndHideNotifications
          }
        />
      </div>
    </div>
  );
}
