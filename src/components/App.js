import React, {useState, useEffect} from "react";
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout/Layout";
import praxisTheme from "../config/themeConfig";
import Footer from "../components/HomePageContent/Footer"
import { useSelector } from "react-redux";

function App() {
//   const userdata = useSelector(state => state.signInReducer);

// console.log("ramesh...", userdata)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     console.log("mayilllllll", userdata)
//     console.log(userdata.signInPostResponse);
//     if (userdata.signInPostResponse != null) {
//       setIsLoggedIn(true);
//     }
    
//   }, [userdata])

  return (
    <MuiThemeProvider theme={praxisTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </BrowserRouter>
      
    


        {/* { isLoggedIn && <Footer/> } */}
     
      
    </MuiThemeProvider>
  );
}

export default App
