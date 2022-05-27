import React, { useRef, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoryBooks, readPDF } from "../../config/apiCalls";
import Link from "@material-ui/core/Link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { isEmpty } from "lodash";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import carasoul1 from "../../images/carasoul1.png";
import {
  setPdfURL,
  setPdfISBN,
} from "../../store/personalDevelopment/actionCreator";
import FormGroup from "@material-ui/core/FormGroup";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
  fonts: {
    fontSize: 25,
    fontStyle: "italic",

    fontWeight: "bold",
    color: "darkgreen",
  },
  backArrow: {
    paddingLeft: 30,
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
  check: {
    paddingLeft: "30px",
  },
}));

const SubCategory = () => {
  //   const category_id = useSelector((state) => state.subCategory.categoryId);
  const sub_category_id = useSelector(
    (state) => state.subCategoryReducer.subCategoryId
  );
  const sub_category_name = useSelector(
    (state) => state.subCategoryReducer.subCategoryName
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [subCategoryListBooks, setSubCategoryListBooks] = useState([]);
  console.log("idddd = " + sub_category_id);
  console.log("nameeee = " + sub_category_name);

  useEffect(() => {
    getSubCategoryBooks(sub_category_id).then((result) => {
      const { data = [] } = result;
      setSubCategoryListBooks(result);
    });
  }, []);

  const { data = [] } = subCategoryListBooks;

  const handleRoute = (route) => {
    history.push(`${route}`);
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

  return (
    <div>
      {!isEmpty(data) ? (
        <div>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              fontStyle: "italic",
              paddingTop: "15px",
            }}
          >
            <IconButton className={classes.backArrow} aria-label="back">
              <ArrowBackIcon onClick={() => handleRoute("/search")} />
            </IconButton>
            {sub_category_name}
          </Typography>

          <FormGroup row className={classes.check}>
              <RadioGroup row aria-label="position">
                <FormControlLabel
                  value="pdf"
                  name="pdf"
                  control={<Radio color="primary" />}
                  label="Book"
                  labelPlacement="End"
                  // onClick={handleChangePdf}
                />
                <FormControlLabel
                  value="audio"
                  name="audio"
                  control={<Radio color="primary" />}
                  label="Audible"
                  labelPlacement="End"
                  // onClick={handleChangeAudio}
                />
              </RadioGroup>
            </FormGroup>

          {data.map((obj) => (
            <div>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          alt={obj.title}
                          src={obj.thumbnail_url}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = carasoul1;
                          }}
                          onClick={() => {
                            if (obj.book_type === "Audio Book") {
                              handleRoute(
                                `/audiobook/${obj.file_name}/${obj.title}`
                              );
                            } else {
                              readClicked(obj.file_name, obj.isbn);
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
                            if (obj.book_type === "Audio Book") {
                              handleRoute(
                                `/audiobook/${obj.file_name}/${obj.title}`
                              );
                            } else {
                              readClicked(obj.file_name, obj.isbn);
                            }
                          }}
                        >
                          {obj.title}
                        </Typography>
                        {obj.book_type === 'BOOK' ? (
                        <Typography variant="body2" gutterBottom>
                          Author: {obj.author_name}
                          <br /> {obj.book_type}
                        <br/>Number of Pages:  {obj.total_pages}
                        </Typography>) : (
                        <Typography variant="body2" gutterBottom>
                          Author: {obj.author_name}
                          <br /> {obj.book_type}
                          <br/> Audio Time: {obj.total_audio_time}
                        </Typography>)
}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ))}
        </div>
      ) : (
        <Typography
          variant="h5"
          style={{
            paddingTop: "15px",
            paddingLeft: "20px",
            fontWeight: "50px",
          }}
        >
          <IconButton className={classes.backArrow} aria-label="back">
            <ArrowBackIcon onClick={() => handleRoute("/search")} />
          </IconButton>
          No Books in this Category!!
        </Typography>
      )}
    </div>
  );
};

export default withStyles(useStyles)(SubCategory);
