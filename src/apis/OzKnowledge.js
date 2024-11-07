import axios from "axios";
import FormData from "form-data";

export const KnowledgeHome = async (token, branchId, signal) => {
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_homepage?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };


  const response = await axios(config);
  
  return response.data.data;
}

export const getCategoriesList = async (token, branchId, signal) => {

  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_categories?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const getCategoryById = async (token, id, signal) => {
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("id", id);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_categories?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const getInstructorsList = async (token, branchId, limit, page, signal) => {
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("limit", limit);
  formData.append("page", page);
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_trainer?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const getInstructorById = async (token, id, signal) => {
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("id", id);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_trainer?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const getCoursesList = async (token,
  branchId,
  start_date,
  end_date,
  price_from,
  price_to,
  seller_type,
  trainer_id,
  category_id,
  limit,
  page,
  signal) => {
   
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("category_id", category_id);
  formData.append("limit", limit);
  formData.append("page", page);

  formData.append('branch_id', branchId);

  
  if (start_date) {
    formData.append("start_date", start_date);
  }
  if (end_date) {
    formData.append("end_date", end_date);
  }
  if (price_from) {
    formData.append("price_from", price_from);
  }
  if (price_to) {
    formData.append("price_to", price_to);
  }
  if (seller_type) {
    formData.append("seller_type", seller_type);
  }
  if (trainer_id) {
    formData.append("trainer_id", trainer_id);
  }

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_courses?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal
  };

  const response = await axios(config);
  console.log(response.data);
  
  // console.log(response.data.data  , page , 
  //   limit,
  //   branchId,
  //   start_date,
  //   end_date,
  //   price_from,
  //   price_to,
  //   category_id,
  //   seller_type,
  //   trainer_id,
  // );
  

  return response.data.data;
};


// export const getCoursesList = async (token,

//   signal) => {

//   const formData = new FormData();
//   formData.append("server_key", process.env.REACT_APP_SERVER_KEY);


//   const config = {
//     method: "post",
//     url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_courses?access_token=${token}&skip=true`,
//     data: formData,
//     maxContentLength: Infinity,
//     maxBodyLength: Infinity,
//     signal: signal
//   };

//   const response = await axios(config);
//   console.log(response.data);
  

//   return response.data.data;
// }

export const getCoursesById = async (token, id, signal) => {

  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("id", id);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_courses?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const BookKnowledgeCourse = async (
  token,
  class_id,
  classDate,
  paymentType,
  promo_code_id, 
  promo_discount,
  signal
) => {
  const formData = new FormData();

  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("course_id", class_id);
  formData.append("date", classDate);
  formData.append("payment_type", paymentType);

  if (promo_code_id) {
    formData.append('promo_code_id', promo_code_id);
    formData.append('promo_discount', promo_discount);
  }

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowledge_invoice_confirm?access_token=${token}`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data;
};

export const KnowledgeHistory = async (token, signal) => {
  const formData = new FormData();

  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowladge_invoice?access_token=${token}`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const getKnwoldgeByid = async (token, id, signal) => {

  const formData = new FormData();

  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("id", id);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_knowladge_invoice?access_token=${token}`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
}

export const rateCourse = async (token, userId, courseId, rating, message, signal) => {

  const formData = new FormData();

  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("user_id", userId);
  formData.append("course_id", courseId);
  formData.append("rating", rating);
  formData.append("message", message);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/course_rates?access_token=${token}`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
}
export const likeClass = async (token, userId, course_id, signal) => {

  const formData = new FormData();
  formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
  formData.append('user_id', userId);
  formData.append('course_id', course_id);

  const config = {
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/api/like-zeeknowladge?access_token=${token}`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};