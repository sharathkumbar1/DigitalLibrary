import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import CardActionArea from "@material-ui/core/CardActionArea";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 350,
    padding: 0,
    margin: "10px auto",
  },
  cardHeader: {
    background:
      "linear-gradient(90deg, rgba(45,62,80,1) 0%, rgba(255,255,255,1) 100%)",
    backgroundColor: "#728ca8",
    height: 70,
    color: "#Fff",
  },
  cardContent: {
    minHeight: 120,
    overflow: "hidden",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  titleArea: {
    padding: "13px 10px",
  },
  title: {
    fontSize: 22,
  },
  subTitle: {
    fontSize: 12,
  },
  cardActions: {
    textAlign: "right",
  },
  cardButton: {
    border: "1px solid #2d3e50",
    backgroundColor: "white",
    color: "#2d3e50",
    padding: "3px 6px",
    margin: "10px 12px",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#728ca8",
      color: "white",
    },
  },
};

const SimpleCard = (props) => {
  const {
    classes,
    cardTitle,
    cardSubTitle,
    cardContent,
    routePath,
    imgPath,
  } = props;

  const goBtnClicked = (routePath) => {
    // props.history.push(`/${routePath}`)
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.cardHeader}>
            <div className={classes.titleArea}>
              <img
                src={imgPath}
                alt={cardTitle}
                width="54"
                style={{ float: "right", marginTop: -4 }}
              />
              <div className={classes.title}>{cardTitle}</div>
              <div className={classes.subTitle}>{cardSubTitle}</div>
            </div>
          </div>
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" component="p">
              {cardContent}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button
            className={classes.cardButton}
            size="small"
            onClick={goBtnClicked(routePath)}
          >
            Go
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default withStyles(styles)(withRouter(SimpleCard));
