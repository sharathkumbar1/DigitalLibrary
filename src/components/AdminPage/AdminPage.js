import React, {useState, useEffect, useRef} from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
// import { showNotificationError, showNotificationSuccess } from "../../store/notification/actionCreator";
import axios from 'axios'
import {useDispatch} from "react-redux";
import CreatableSelect from 'react-select/creatable'

import {SUCCESS_ON_SAVE} from "../../constants/errorConstants";

import {showNotificationError, showNotificationSuccess,} from "../../store/notification/actionCreator";
import {signUp, handleSignUpError, handleSignUpSuccess} from "../../store/signup/actionCreator";

import NotificationSuccess from "../Notifications/NotificationSuccess";
import NotificationError from "../Notifications/NotificationError";
import { Category, ReplyTwoTone } from "@material-ui/icons";
import { colors } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
     
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '35ch',
    position:'relative',
    top:'40px',
    left:'52px',
  },
  formControlEdit: {
    margin: theme.spacing(1),
    minWidth: '35ch',
    position:'relative',
    top:'40px',
    left:'12px',
  },
  notificationContainer: {
    position: "relative",
  },
  createselect:{
    width: '275px',
    position: 'relative',
    top: '25px',
    left: '75px',
    zIndex: '100 !important'
  },
  createselectEdit:{
    width: '275px',
    position: 'relative',
    top: '25px',
    left: '42px',
    zIndex: '100 !important'
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: "relative",
    top: "65px",
    paddingLeft: "130px"
  },
}));
const filter = createFilterOptions();
const AdminPage = props => {
  const classes = useStyles();
  const {recordsForEdit} = props

  const [pages, setPages] =  useState(false)
  const [time, setTime] = useState(false)
  // const [state, setState] = React.useState({ 
  //   category: '',  
  // });

  const [state, setState] = React.useState({ 
    category: '',  
  });
  const [value2, setValue2]= useState(null)
  const [value1, setValue1]= useState(null)
  const [authors, setAuthors] = useState([]);
  const [category, setCategory] = useState([])
  const [setError] = useState(null);
  const dispatch = useDispatch();
 const [authorValue, setAuthorValue] = useState('')
 const selectAuthorRef = useRef();

  const initialFValues =  {
    author_name: '',
    book_type: '',
    category_id: 0,
    country_of_origin: '',
    edition_version:'',
    file_name: '',
    isbn: 0 ,
    title: '',
    total_pages:0,
    year: '',
   
  } 

  const initialFValuesAudio ={
    author_name: '',
    book_type: '',
    category_id: 0,
    country_of_origin: '',
    edition_version:'',
    file_name: '',
    isbn: 0,
    title: '',
    total_audio_time:'',
    year: '',
    
  }
  const [bookDetails, setBookDetails] = useState(initialFValues)
  const [bookDetailsAudio, setBookDetailsAudio] = useState(initialFValuesAudio)




  useEffect(() => {
    fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/authors")
      .then(res => res.json())
      .then(
        (result) => {

          setAuthors(result);
          console.log(result)
        },
        (error) => {
          setError(error);
        }
      )

  }, [])

  const creatableAuthor = authors.map(({name})=>({
     value:name,
     label:name,
  }))

  useEffect(() => {
    fetch("http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/book_categories")
      .then(res => res.json())
      .then(
        (result) => {

          setCategory(result);
          console.log(result)
        },
        (error) => {
          setError(error);
        }
      )

  }, [])

  useEffect(() => {
    if(recordsForEdit != null){
    setBookDetails({...recordsForEdit})
    console.log(recordsForEdit)
    }
    }, [recordsForEdit])

  const pdfPages = () =>{
     setPages(true)
     setTime(false)
  }

  const audioTime = () =>{
    setTime(true)
    setPages(false)
  }

  const resetReduxStoreAndHideNotifications = () => {
    
    dispatch(handleSignUpSuccess({data: null}))
    dispatch(handleSignUpError(null))
    dispatch(showNotificationError(false, ""));
    dispatch(showNotificationSuccess(false, ""));
  }
  

  const handleInputChange = e => {
    const { name, value } = e.target
    // console.log("name ", name)
    // console.log("value ", value)
    
    setBookDetails({
        ...bookDetails,
        [name]: value
    })
    setBookDetailsAudio({
      ...bookDetailsAudio,
      [name]: value
  })
}

const handleChange = (newValue, actionMeta) => {
  console.group('Value Changed');
  console.log(newValue);
  console.log(`action: ${actionMeta.action}`);
  console.groupEnd();
  return(
    newValue ?
     (bookDetails.author_name = newValue.value, bookDetailsAudio.author_name=newValue.value) : ''
  )

};
const handleNewInputChange = (inputValue, actionMeta) => {
  console.group('Input Changed');
  console.log(inputValue);
  console.log(`action: ${actionMeta.action}`);
  console.groupEnd();
};


const addBook= () => {
  
  if (bookDetails.title === "") {
    dispatch(showNotificationError(true, "Please fill in Book Name"));
  }
  else if (bookDetails.author_name === "" ) {
    dispatch(showNotificationError(true, "Please fill in Author Name"));
  }
  else if (bookDetails.isbn === "" || bookDetails.isbn === 0) {
    dispatch(showNotificationError(true, "Please fill in ISBN"));
  }
  else if (bookDetails.file_name === "") {
    dispatch(showNotificationError(true, "Please fill in File name"));
  }
  else if (bookDetails.book_type !== "PDF" && bookDetails.book_type!=="AUDIO_BOOK") {
    dispatch(showNotificationError(true, "Please select Book type"));
  }
  else if (bookDetails.category_id === '' && bookDetails.category_id === 0) {
    dispatch(showNotificationError(true, "Please fill in category "));
  }
  else if (bookDetails.country_of_origin === '') {
    dispatch(showNotificationError(true, "Please fill in the Country name"));
  }
  else if (bookDetails.edition_version === '') {
    dispatch(showNotificationError(true, "Please fill in Edition version "));
  }
  else if (bookDetails.year === '') {
    dispatch(showNotificationError(true, "Please fill in Year"));
  }
 
  else if (pages && bookDetails.total_pages === '') {
    dispatch(showNotificationError(true, "Please fill in number of pages"));
  }
  else if (time && bookDetailsAudio.total_audio_time === '') {
    dispatch(showNotificationError(true, "Please fill in the audio time"));
  }
  else if(pages && bookDetails.total_pages !== ''){
    dispatch(showNotificationError(false, ""));
    // {authors.map(author => {
    //   return(
    //   author.author_id === bookDetails.author_id ? bookDetails.author_name = author.name : '')
    // })} 
    console.log("page is true")
      processRequest();
  }
  else if(time && bookDetailsAudio.total_audio_time !== ''){
    // {authors.map(author => {
    //   return(
    //   author.author_id === bookDetailsAudio.author_id ? bookDetailsAudio.author_name = author.name : '')
    // })} 
    dispatch(showNotificationError(false, ""));
    console.log("time is true")
      processRequestAudio();
  }
};

const processRequest = () =>{
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  
   
  const apiUrl="http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/books" 
  
    return axios
  .post(apiUrl, bookDetails, requestConfig)
  .then((response) => {
    console.log(response)
    dispatch(showNotificationError(true, "Book is uploaded successfully"));
    resetForm()
  })
  .catch((err) => {
    dispatch(showNotificationError(true, err.response.data.error_message));
    console.log("page is true......")
  });
}

const processRequestAudio = () =>{
  const requestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  
  const apiUrl="http://ec2-13-232-236-83.ap-south-1.compute.amazonaws.com:8080/books" 

    return axios
  .post(apiUrl, bookDetailsAudio, requestConfig)
  .then((response) => {
    console.log(response)
    dispatch(showNotificationError(true, "Audio Book is uploaded successfully"));
    resetForm()
  })
  .catch((err) => {
    dispatch(showNotificationError(true, err.response.data.error_message));
    console.log("time is true...")
  });
}

const resetForm = () =>{
  setBookDetails(initialFValues)
  setBookDetailsAudio(initialFValuesAudio)
  setPages(false)
  setTime(false)
  
  //window.location.reload();
}

  return (
    <div>
       <form className={classes.root} noValidate autoComplete="off">

         {recordsForEdit && bookDetails ?
         <div style={{width:"400px",
          height: '600px'}}>
         <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "32px",
          }}>
                 Book Name
               </Typography>
              <TextField
                style={{position: "relative",
                top: "20px",
                left: "0px"}}
                required
                id="author"
                name="author"
                value={bookDetails.title}
                variant="outlined"
                size="small"
              />
              </div>
      
              <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "35px",
          left: "0px"}}>
                 Author
               </Typography>
              
               <CreatableSelect
ref={selectAuthorRef}
className={classes.createselectEdit}
onChange={handleChange}
onInputChange={handleNewInputChange}
options={creatableAuthor}
isSearchable
defaultInputValue={bookDetails.author_name}
/>
           
         
        
              </div>
      
               <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "40px",
          left: "0px"}}>
                 ISBN
               </Typography>
              <TextField
                style={{position: "relative",
                top: "30px",
                left: "45px"}}
                required
                id="isbn"
                name="isbn"
                value={bookDetails.isbn}
                variant="outlined"
                size="small"
              />
              </div>  
      
                   <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "45px",
          left: "0px"}}>
                File Name
               </Typography>
              <TextField
                style={{position: "relative",
                top: "35px",
                left: "10px"}}
                required
                id="file_name"
                name="file_name"
                value={bookDetails.file_name}
                variant="outlined"
                size="small"
              />
              </div>   
      
              <div style={{display:"flex",
           }}>
              <Typography style={{position: "relative",
          top: "48px",
          left: "0px"}}>
                Book Type
               </Typography>
              <RadioGroup row aria-label="position" name="bookType" style={{position: "relative",
          top: "40px",
          left: "40px"}} >
              <FormControlLabel
                value="PDF"
                control={<Radio color="primary" />}
                label="PDF"
                labelPlacement="End"
                onClick={pdfPages}
                defaultValue={bookDetails.book_type}
              />
               <FormControlLabel
                value="Audio"
                control={<Radio color="primary" />}
                label="Audio"
                labelPlacement="End"
                onClick={audioTime}
              />
                </RadioGroup>
                </div>    
      
                {pages ?  <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "50px",
          left: "0px"}}>
                No. of pages
               </Typography>
              <TextField
                style={{position: "relative",
                top: "40px",
                left: "15px"}}
                required
                id="total_pages"
                name="total_pages"
                value={bookDetails.total_pages}
                variant="outlined"
                size="small"
              />
              </div> : ''
              } 
      
              {time ?   <div style={{display:"flex",
            }}>
         <Typography style={{position: "relative",
           top: "50px",
           left: "0px"}}>
                Audio Time
                </Typography>
               <TextField
                 style={{position: "relative",
                 top: "40px",
                 left: "2px"}}
                 required
                 id="total_audio_time"
                 name="total_audio_time"
                 value={bookDetails.total_audio_time}
                 variant="outlined"
                 size="small"
               />
               </div>  : '' }
      
               
              <div style={{display:"flex",
            }}>
              <Typography style={{position: "relative",
           top: "50px",
           left: "0px"}}>
               Category
                </Typography>
                <FormControl variant="outlined" className={classes.formControlEdit} size="small">
       
       <Select
         labelId="demo-simple-select-outlined-label"
         id="category_id"
         name="category_id"
         value={bookDetails.category_id, bookDetailsAudio.category_id}
         onChange={handleInputChange}
        defaultValue={bookDetails.category_name}
         style={{
           position:'relative',
           top:'0px',
           left:'5px',
         }}
       >
         
        
         {category.map(cat =>{
           return(
           <MenuItem value={cat.category_id} >{cat.category_name}</MenuItem>
           )
         })}
       </Select>
       
     </FormControl>
      
              </div>
      
              <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "55px",
          left: "0px"}}>
                 Country
               </Typography>
              <TextField
                style={{position: "relative",
                top: "45px",
                left: "25px"}}
                required
                id="country_of_origin"
                name="country_of_origin"
                value={bookDetails.country_of_origin}
                variant="outlined"
                size="small"
              />
              </div>
      
              <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "60px",
          left: "0px"}}>
                 Edition
               </Typography>
              <TextField
                style={{position: "relative",
                top: "50px",
                left: "30px"}}
                required
                id="edition_version"
                name="edition_version"
                value={bookDetails.edition_version}
                variant="outlined"
                size="small"
              />
              </div>
      
              <div style={{display:"flex",
           }}>
        <Typography style={{position: "relative",
          top: "65px",
          left: "0px"}}>
                 Year
               </Typography>
              <TextField
                style={{position: "relative",
                top: "55px",
                left: "45px"}}
                required
                id="year"
                name="year"
                value={bookDetails.year}
                variant="outlined"
                size="small"
              />
              </div>
      
            <div className={classes.root1}>
            
            <Button variant="contained" color="primary">
              SAVE
            </Button>
           
           
       
             
            </div>
            </div>
         
        

       :
<div>
  <FormControl>
   <div style={{display:"flex",
     }}>
     
  <Typography style={{position: "relative",
    top: "32px",
    left: "4px"}}>
           Book Name
         </Typography>
        
        <TextField
          style={{position: "relative",
          top: "20px",
          left: "35px"}}
          required
          id="title"
          label="Required"
          name="title"
          variant="outlined"
          size="small"                 
          value={bookDetails.title, bookDetailsAudio.title}
          onChange={handleInputChange}                                                       
        />
        </div>

        <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "35px",
    left: "20px"}}>
           Author
         </Typography>


<CreatableSelect
className={classes.createselect}
onChange={handleChange}
onInputChange={handleNewInputChange}
options={creatableAuthor}
isSearchable
isClearable
/>


        </div>

         <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "40px",
    left: "20px"}}>
           ISBN
         </Typography>
        <TextField
          style={{position: "relative",
          top: "30px",
          left: "82px"}}
          required
          id="isbn"
          name="isbn"
          label="123"
          variant="outlined"
          size="small"
          value={bookDetails.isbn, bookDetailsAudio.isbn}
          onChange={handleInputChange} 
        />
        </div>  

             <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "45px",
    left: "4px"}}>
          File Name
         </Typography>
        <TextField
          style={{position: "relative",
          top: "35px",
          left: "45px"}}
          required
          id="file_name"
          label="filename"
          variant="outlined"
          size="small"
          name="file_name"
          value={bookDetails.file_name, bookDetailsAudio.file_name}
          onChange={handleInputChange} 
         
        />
        </div>   

        <div style={{display:"flex",
     }}>
        <Typography style={{position: "relative",
    top: "48px",
    left: "4px"}}>
          Book Type
         </Typography>
        <RadioGroup row aria-label="position" 
        id="book_type"
          name="book_type"

          //value={valueRadio} 
          // onChange={radioChangeHandler}
          onChange={handleInputChange}
          value={bookDetails.book_type} 
          style={{position: "relative",
    top: "40px",
    left: "90px"}} >
        <FormControlLabel
          value="PDF"
          control={<Radio color="primary" />}
          label="PDF"
          labelPlacement="End"
          onClick={pdfPages}
          checked={pages ? true : false}
        />
         <FormControlLabel
          value="AUDIO_BOOK"
          control={<Radio color="primary" />}
          label="Audio"
          labelPlacement="End"
          onClick={audioTime}
          checked={time ? true : false}
        
        />
          </RadioGroup>
          </div>    

          {pages ?  <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "50px",
    left: "0px"}}>
          No. of pages
         </Typography>
        <TextField
          style={{position: "relative",
          top: "40px",
          left: "30px"}}
          required
          id="total_pages"
          label="Required"
          variant="outlined"
          size="small"
          name="total_pages"
          value={bookDetails.total_pages}
          onChange={handleInputChange} 
        />
        </div> : ''
        } 

        {time ?   <div style={{display:"flex",
      }}>
   <Typography style={{position: "relative",
     top: "50px",
     left: "4px"}}>
          Audio Time
          </Typography>
         <TextField
           style={{position: "relative",
           top: "40px",
           left: "38px"}}
          required
           id="total_audio_time"
           label="hh:mm:ss"
           variant="outlined"
           size="small"
           name="total_audio_time"
          value={bookDetailsAudio.total_audio_time}
          onChange={handleInputChange} 
          
         />
         </div>  : '' }

         
        <div style={{display:"flex",
      }}>
        <Typography style={{position: "relative",
     top: "50px",
     left: "15px"}}>
         Category
          </Typography>

<FormControl variant="outlined" className={classes.formControl} size="small">
       
        <Select
          labelId="demo-simple-select-outlined-label"
          id="category_id"
          name="category_id"
          value={bookDetails.category_id, bookDetailsAudio.category_id}
          onChange={handleInputChange}
         
          style={{
            position:'relative',
            top:'0px',
            left:'2px',}}
        >
          
         
          {category.map(cat =>{
            return(
            <MenuItem value={cat.category_id} >{cat.category_name}</MenuItem>
            )
          })}
        </Select>
        
      </FormControl>

        </div>

        <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "55px",
    left: "20px"}}>
           Country
         </Typography>
        <TextField
          style={{position: "relative",
          top: "45px",
          left: "61px"}}
          required
          id="country_of_origin"
          label="Required"
          variant="outlined"
          size="small"
          name="country_of_origin"
          value={bookDetails.country_of_origin, bookDetailsAudio.country_of_origin}
          onChange={handleInputChange} 
        />
        </div>

        <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "60px",
    left: "25px"}}>
           Edition
         </Typography>
        <TextField
          style={{position: "relative",
          top: "50px",
          left: "68px"}}
          required
          id="edition_version"
          label="Required"
          variant="outlined"
          size="small"
          name="edition_version"
          value={bookDetails.edition_version, bookDetailsAudio.edition_version}
          onChange={handleInputChange} 
        />
        </div>

        <div style={{display:"flex",
     }}>
  <Typography style={{position: "relative",
    top: "65px",
    left: "30px"}}>
           Year
         </Typography>
        <TextField
          style={{position: "relative",
          top: "55px",
          left: "84px"}}
          required
          id="year"
          label="yyyy"
          variant="outlined"
          size="small"
          name="year"
          value={bookDetails.year, bookDetailsAudio.year}
          onChange={handleInputChange} 
        />
        </div>

        

      <div className={classes.root1}>
      
      <Button variant="contained" color="primary" onClick={addBook}>
        ADD
      </Button>
      <Button variant="contained" color="primary" onClick={resetForm}>
        RESET
      </Button>
     
 
       
      </div>
      </FormControl>
      </div>
      }
     
  
         </form>

         <div className={classes.notificationContainer}>
        <NotificationError resetReduxStoreAndHideNotifications={resetReduxStoreAndHideNotifications} />
        <NotificationSuccess resetReduxStoreAndHideNotifications={resetReduxStoreAndHideNotifications} />
      </div>
    </div>
  );
};


export default AdminPage;