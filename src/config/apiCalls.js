import React from "react";
import axios from "axios";

const success = (response) => {
  return response.data;
};

const error = (e) => {
  return Promise.reject(e);
};

export const url= "http://digilib-env-1.eba-fphgpw6n.ap-south-1.elasticbeanstalk.com:5000/"

export function HomePageBooksPDF(currentUserId) {
  return fetch(
    url+"home_page_books?user_id=" +
      currentUserId +
      "&book_type=BOOK"
  );
}

export function readPDF(file_name) {
  return axios.get(
    url+"download_url?file_name=" +
      file_name +
      ".pdf"
  );
}

export function recentlyAddedPDFPage() {
  return fetch(
    url+"recently_added_books?book_type=BOOK"
  );
}

export function bookmarkedPDFPage(currentUserId) {
  return fetch(
    url+"users/" +
      currentUserId +
      "/bookmarked_books?book_type=BOOK"
  );
}

export function viewedPDFPage(currentUserId) {
  return fetch(
    url+"users/" +
      currentUserId +
      "/recently_viewed_books?book_type=BOOK"
  );
}

export function savePDFCall(requestBody, requestConfig) {
  return axios.post(
    url+"bookmarked_books",
    requestBody,
    requestConfig
  );
}

export function recentlyViewedPDFCall(requestBody, requestConfig) {
  return axios.post(
    url+"recently_viewed_books",
    requestBody,
    requestConfig
  );
}

export function HomePageBooksAudio(currentUserId) {
  return fetch(
    url+"home_page_books?user_id=" +
      currentUserId +
      "&per_page=3&book_type=AUDIBLE"
  );
}

export function listenAudibles(file_name) {
  return axios.get(
    url+"download_url?file_name=" +
      file_name +
      ".mp3"
  );
}

export function audioBookUrl(titleName) {
  return axios.get(
    url+"search?bookType=AUDIBLE&book_name=" +
      titleName
  );
}

export function saveAudioCall(requestBody, requestConfig) {
  return axios.post(
    url+"bookmarked_books",
    requestBody,
    requestConfig
  );
}

export function recentlyViewedAudioCall(requestBody, requestConfig) {
  return axios.post(
    url+"recently_viewed_books",
    requestBody,
    requestConfig
  );
}

export function recentlyAddedAudioPage() {
  return fetch(
    url+"recently_added_books?book_type=AUDIBLE"
  );
}

export function bookmarkedAudioPage(currentUserId) {
  return fetch(
    url+"users/" +
      currentUserId +
      "/bookmarked_books?book_type=AUDIBLE"
  );
}

export function viewedAudioPage(currentUserId) {
  return fetch(
    url+"users/" +
      currentUserId +
      "/recently_viewed_books?book_type=AUDIBLE"
  );
}

export function searchCall(searchBook) {
  return axios.get(
    url+"search",
    {
      headers: { "Content-type": "application/json" },
      params: {
        any_book: searchBook,
      },
    }
  );
}

export function getAuthorList() {
  return fetch(
    url+"authors"
  );
}

export function getCategoryList() {
  return fetch(
    url+"book_categories?"
  );
}

export function getBulkUploadList() {
  return fetch(
    url+"get_bulk_upload_files"
  );
}

export function postPdf(bookDetails, requestConfig) {
  return axios.post(
    url+"books",
    bookDetails,
    requestConfig
  );
}

export function postAudioBook(bookDetailsAudio, requestConfig) {
  return axios.post(
    url+"books",
    bookDetailsAudio,
    requestConfig
  );
}

export function editPdf(isbn, bookDetails, requestConfig) {
  return axios.put(
    url+"books/" +
      isbn,
    bookDetails,
    requestConfig
  );
}

export function editAudibles(isbn, bookDetailsAudio, requestConfig) {
  return axios.put(
    url+"books/" +
      isbn,
    bookDetailsAudio,
    requestConfig
  );
}

export function getSubCategories(category_id) {
  return axios.get(
    url+"book_sub_categories/" +
      category_id
  );
}

export function getAllSubCategories() {
  return axios.get(
    url+"book_sub_categories"
  );
}

export function getSubCategoryBooks(sub_category_id) {
  return axios.get(
    url+"books/" +
      sub_category_id
  );
}

export function postBulkUploadFile(bulkUploadFile, requestConfig) {
  return axios.post(
    url+"books/upload/" + bulkUploadFile,
    bulkUploadFile,
    requestConfig
  );
}
