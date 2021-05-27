
import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ImportContactsOutlinedIcon from "@material-ui/icons/ImportContactsOutlined";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { IconButton} from "@material-ui/core";
import carasoul1 from '../../images/carasoul1.png'
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import {isNotEmpty, isEmpty} from 'lodash'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import {  useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setPdfURL } from "../../store/personalDevelopment/actionCreator";
import { connect } from 'react-redux';
import {withStyles} from "@material-ui/core/styles";
import { saveSearchValue, saveSearchList, clearSearchValue, clearSearchList} from '../../store/search/ActionCreator';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AdminPage from '../AdminPage/AdminPage';
import Popup from '../SearchPage/Popup'

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'left',
    maxWidth: 450,
    paddingLeft : 10,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  fonts:{
      fontSize:20,
      fontStyle: 'italic',
      align: 'left',
      fontWeight : 'bold',
     color:'darkgreen'
     
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    height: 80,
    outlineColor:'black',
    color: 'black',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '98%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  check:{
    paddingLeft: '30px',
  }
}));

export default function SearchPage(props) {
const [searchBook, setSearchBook] = useState([])
const classes = styles();
const [isOnSelect, setIsOnSelect] = useState(false)
const [searchList, setSearchList] = useState([]);
const [error, setError] = useState(null);
let history = useHistory();
const [checkBox, setCheckBox] = React.useState({  
  pdf : true,
  audio : true,
});
const [originalSearchList, setOriginalSearchList] = useState([])
const [pdfBooks, setPdfBooks] = useState([])
var listOfPdfBooks=[]
var listOfAudioBooks=[]
const [hideCheckbox, setHideCheckbox ] = useState(false)
const dispatch = useDispatch();
const [openPopup, setOpenPopup]= useState(false)
const [recordsForEdit, setRecordsForEdit] = useState(null)


    const searchValue = useSelector(
        (state) => state.searchReducer.searchValue
    );
    const searchRetainList = useSelector(
      (state) => state.searchReducer.searchList
    )

    useEffect(() =>{
      !isEmpty(searchValue) ? setIsOnSelect(true) : setIsOnSelect(false)
      !isEmpty(searchValue) ? setHideCheckbox(true) : setHideCheckbox(false)
    }, [])
    useEffect(() => {
      !isEmpty(searchValue) ? 
        setSearchBook(searchValue): setSearchBook('')
        !isEmpty(searchRetainList) ? setSearchList(searchRetainList): setSearchList([])
           }     
     , [])
  //    useEffect(() =>{
  // dispatch(saveSearchList(searchList))
  //   }, [searchList])

     
     

   const handleSearch = (event) =>{
    console.log("printtttt")
         const copySearchBook = event.target.value.toLowerCase()
        setSearchBook(copySearchBook) 
          dispatch(saveSearchValue(copySearchBook))

          if(!isEmpty(searchBook)){
            getSearchBooks(searchBook)
            .then(
                     (result) => {
                      
                     
                             setSearchList(result.data)
                             dispatch(saveSearchList(result.data))
                             setOriginalSearchList(result.data)
        
                             })
            console.log('submittttted')
            console.log(searchList)
            console.log(searchBook)
            setIsOnSelect(true)   
            setHideCheckbox(true)  
          }
  }

 function getSearchBooks(searchBook) {
    return axios.get(
      'http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/search',{
        headers: { 'Content-type': 'application/json' },
        params: {
          any_book: searchBook,
        },
      }
    )
  }

  // const onSearchSubmit = (event) => {

  //  if(!isEmpty(searchBook)){
  //   getSearchBooks(searchBook)
  //   .then(
  //            (result) => {
              
             
  //                    setSearchList(result.data)
  //                    dispatch(saveSearchList(result.data))
  //                    setOriginalSearchList(result.data)

  //                    })
  //   console.log('submittttted')
  //   console.log(searchList)
  //   console.log(searchBook)
  //   setIsOnSelect(true)   
  //   setHideCheckbox(true)  
  //                   } 
  // }

  const onClearSubmit = (event) => {
    setSearchBook('')
    setPdfBooks('')
    setIsOnSelect(false)
    setHideCheckbox(false)
    dispatch(clearSearchValue())
    dispatch(clearSearchList())
  }

  const readClicked = (pdfLink) => {
    dispatch(setPdfURL(pdfLink));
    console.log("book opened")
    dispatch(setPdfURL("../../data/pdf/sample1.pdf"));
    history.push("/pdfviewer");

  }


  

  const handleChange = (event) => {
    
    setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });
    console.log(event.target.checked)
    if(event.target.name === 'pdf'){
      if(event.target.checked){
        // listOfPdfBooks = searchList.filter(
        //   (obj) => (obj.book_type === 'PDF')    
        // )
        //   setSearchList(listOfPdfBooks)
        console.log(originalSearchList)
         setSearchList(originalSearchList)
      }
      else{
        // console.log(originalSearchList)
        // setSearchList(originalSearchList)
        listOfPdfBooks = searchList.filter(
          (obj) => (obj.book_type === 'Audio Book')    
        )
        console.log(listOfPdfBooks)
          setSearchList(listOfPdfBooks)
      }
    
    }
   if(event.target.name === 'audio'){
      if(event.target.checked){
        // listOfPdfBooks = searchList.filter(
        //   (obj) => (obj.book_type === 'AUDIO_BOOK')    
        // )
        //   setSearchList(listOfPdfBooks)
        console.log(originalSearchList)
         setSearchList(originalSearchList)
      }
      else{
        // console.log(originalSearchList)
        // setSearchList(originalSearchList)
        listOfPdfBooks = searchList.filter(
            (obj) => (obj.book_type === 'PDF')    
          )
          console.log(listOfPdfBooks)
            setSearchList(listOfPdfBooks)
      }
    }
     if(event.target.name === 'pdf' && event.target.name==='Audio Book'){
      
      setSearchList(originalSearchList)
      
    }
    
  };

  const handleRoute = (route) => {
  
    listOfPdfBooks = searchList.filter(
      (obj) =>
      (obj.book_type === 'Audio Book')  ? 
      history.push(`${route}`) : ''

      
     
    )
   
  
  };

  const openInPopup = item =>{
    setRecordsForEdit(item)
    setOpenPopup(true)
  }

  const openInPopup1 = () => {
   
    setOpenPopup(true)
  }

  return (
    <div style={{ width: 450 }}>
     
      
 <div >
 <form>
<InputBase
              placeholder="Search…"
              className={classes.search}
              // classes={{
              //   root: classes.inputRoot,
              //   input: classes.inputInput,
              // }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchBook}
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="end">
                   <IconButton aria-label="delete">
                      <SearchIcon
                      //  onClick={onSearchSubmit}                    
                       />
                     <ClearIcon onClick={onClearSubmit}/>
                      </IconButton>
                    </InputAdornment>}
                        />
                        </form>
<div>
  { hideCheckbox ?
<FormGroup row className={classes.check}>
      <FormControlLabel
        control={<Checkbox  onChange={handleChange}  checked={checkBox.pdf}  name="pdf"  value={pdfBooks}/>}
        label="pdf"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkBox.audio}
           
            onChange={handleChange}
            name="audio"
            color="primary"
            value={pdfBooks}
          />
        }
        label="audio"
      />
      </FormGroup> : ''
}
      </div>
            </div>
{isOnSelect ? 
 
 
searchList.map(item => 
   (
  (item.title).toLowerCase().includes(searchBook) ||
  (item.author).toLowerCase().includes(searchBook)   ?
  
  <Paper className={classes.paper}>
    <Grid container spacing={2}>
    <Grid item xs={12} sm container>
      <Grid item>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="complex" src={item.thumbnail_url} 
          onError={(e)=>{e.target.onerror = null; e.target.src= carasoul1}} 
          onClick={() =>{
            if(item.book_type === 'Audio Book'){
             handleRoute(`/audiobook/${item.file_name}/${item.title}`)
            }
            else{
              readClicked(item.pdflink)
            }

          }
        }
          />
        </ButtonBase>
      </Grid>
    
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {item.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Author: {item.author}
              <br/> {item.book_type}
            </Typography>
            <Button variant="text" style={{position: "relative",
    left: "230px",
    bottom: "30px",}}
    onClick={()=> openInPopup(item)}>
              edit
            </Button>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  </Paper>
  : ''
))

  : ''  
} 

<Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
  <AdminPage recordsForEdit={recordsForEdit}/>
</Popup>

    </div>
  );
  
}






