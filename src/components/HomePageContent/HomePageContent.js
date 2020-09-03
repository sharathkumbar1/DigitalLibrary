import React from "react";
import SimpleCard from "./SimpleCard";
import createIcon from "../../images/files-37-256.png";
import parseIcon from "../../images/files-07-256.png";
import uploadIcon from "../../images/files-49-256.png";
import viewIcon from "../../images/files-44-256.png";

const HomePageContent = () => {
  const cardsArr = [
    {
      cardTitle: "Personal Development",
      cardSubTitle: "new template",
      cardContent:
        "Create new template by marking your own highlight areas on a pdf document and save it. So that next time you can do a bulk upload against that template.",
      routePath: "personal-development",
      imgPath: createIcon,
    },
    {
      cardTitle: "Natural Sciences and Mathematics ",
      cardSubTitle: "a document",
      cardContent:
        "It's always good to check the highlights in the template before you do a bulk uploading.",
      routePath: "science-maths",
      imgPath: parseIcon,
    },
    {
      cardTitle: "Fiction",
      cardSubTitle: "bulk documents",
      cardContent: "Upload multiple documents against a template you choose.",
      routePath: "fiction",
      imgPath: uploadIcon,
    },
    {
      cardTitle: "E-Books",
      cardSubTitle: "all your documents",
      cardContent:
        "Once you uploaded the documents, you can view their status, preview, history at anytime",
      routePath: "e-books",
      imgPath: viewIcon,
    },
  ];

  return (
    <div className="home-content">
      {cardsArr.map((item, index) => (
        <SimpleCard
          cardTitle={item.cardTitle}
          cardSubTitle={item.cardSubTitle}
          cardContent={item.cardContent}
          routePath={item.routePath}
          imgPath={item.imgPath}
          key={index}
        />
      ))}
    </div>
  );
};

export default HomePageContent;
