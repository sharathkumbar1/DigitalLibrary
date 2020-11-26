import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import tileData from "./tileData";
import PDFBookCover from "../../images/PDFBookCover.jpg";
import AudioBookCover from "../../images/Alice_in_Wonderland.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 1000,
    // height: 1000,
    padding: "1%",
    margin: "1% !important",
    overflowY: "initial",
  },
  gridTile: {
    width: "50% !important",
    maxWidth: "170px",
    height: "235px !important",
    padding: "2% !important",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  coverPageImage: {
    height: "inherit",
  },
}));

const HomePageContent = (props) => {

  const handleRoute = (route) => {
    props.history.push(`/${route}`);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} spacing={30} className={classes.gridList}>
        <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        <GridListTile
          key="PDFBook"
          onClick={() => handleRoute('')}
          className={classes.gridTile}
        >
          {/* <span>PDF Book</span> */}
          <img src={PDFBookCover}
            alt="Book Cover"
            className={classes.coverPageImage}
          />

          <GridListTileBar
            title="PDF Book"
            subtitle={<span>By: Author</span>}
          />
        </GridListTile>
        <GridListTile
          key="AudioBook"
          onClick={() => handleRoute('audiobook')}
          className={classes.gridTile}
        >
          {/* <span>Audio Book</span> */}
          <img src={AudioBookCover}
            alt="Book Cover"
            className={classes.coverPageImage}
          />

          <GridListTileBar
            title="Alice's Adventures in Wonderland"
            subtitle={<span>By: Lewis Carroll</span>}
          />
        </GridListTile>
        {/* {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <span>{tile.category}</span>
            <img src={tile.img} alt={tile.title} />

            <GridListTileBar
              title={tile.title}
              actionIcon={
                <>
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                </>
              }
            />
          </GridListTile>
        ))} */}
      </GridList>
    </div>

    // <div className="home-content">
    //     {cardsArr.map((item, index) => (
    //         <SimpleCard
    //             cardTitle={item.cardTitle}
    //             cardSubTitle={item.cardSubTitle}
    //             cardContent={item.cardContent}
    //             routePath={item.routePath}
    //             imgPath={item.imgPath}
    //             key={index}
    //         />
    //     ))}
    // </div>
  );
};

export default HomePageContent;
