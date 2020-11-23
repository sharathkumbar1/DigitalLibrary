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
import AudioBookCover from "../../images/AudioBookCover.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
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
        >
          <span>PDF Book</span>
          <img src={PDFBookCover} alt="Book Cover" />

          <GridListTileBar
            title="PDF Book"
            actionIcon={
              <>
                <IconButton
                  aria-label={`info about PDF Book`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              </>
            }
          />
        </GridListTile>
        <GridListTile
          key="AudioBook"
          onClick={() => handleRoute('audiobook')}
        >
          <span>Audio Book</span>
          <img src={AudioBookCover} alt="Book Cover" />

          <GridListTileBar
            title="Audio Book"
            actionIcon={
              <>
                <IconButton
                  aria-label={`info about Audio Book`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              </>
            }
          />
        </GridListTile>
        {tileData.map((tile) => (
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
        ))}
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
