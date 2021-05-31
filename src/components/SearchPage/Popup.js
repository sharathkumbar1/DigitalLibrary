import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close';

 export default function Popup(props){

const { children, openPopup, setOpenPopup} = props;

const closePopup = () =>{
    setOpenPopup(false)
    window.location.reload()
}
    return(
        <Dialog open={openPopup}  maxWidth="md">
            {/* <DialogTitle >
                <div style={{ display: 'flex' }}>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                       DialogTitle
                    </Typography>
                <Button onClick={() => setOpenPopup(false)}>
                <CloseIcon />
                </Button>
               
               
                </div>
               
            </DialogTitle> */}
            <DialogContent>
            <Button onClick={closePopup} 
            style={{position: 'absolute',
                    right:'2px',
                    top:'4px'}}>
                <CloseIcon />
                </Button>
               {children}  
               
            </DialogContent>
        </Dialog>
    )
}
