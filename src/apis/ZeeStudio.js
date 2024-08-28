import axios from "axios";
import FormData from "form-data";

export const getGymCategories = async (token, branchId, signal) => {
    
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_categories?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal
  };

  const response = await axios(config);

  return response.data.data;
};

export const getTrainingClasses = async (token, limit, page, search_text, start_date, category_id, branchId, signal) => {
    
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("limit", limit);
  formData.append("page", page);
  if(search_text){
    formData.append("search_text", search_text);
  }
  if(start_date){
    formData.append("start_date", start_date);
  }
  if(category_id){
    formData.append("category_id", category_id);
  }
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_training?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal
  };

  const response = await axios(config);

  return response.data.data;
};

export const getClassById = async (token, id, signal)  => {
  
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("id" ,id);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_training?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data.data;
};

export const getTrainersList = async (token, branchId, signal) => {
    
  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_trainer?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal
  };

  const response = await axios(config);

  return response.data.data;
};

export const getWorkingScheduleList = async (token, date, branchId, signal) => {

  const formData = new FormData();
  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("date", date);
  formData.append("web", true);
  formData.append('branch_id', branchId);

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_working_schedule?access_token=${token}&skip=true`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal
  };

  const response = await axios(config);

  return response.data.data;
};

export const BookGymClass = async (token, class_id, classDate, paymentType, promo_code_id, promo_discount, signal) => {

  const formData = new FormData();

  formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
  formData.append("training_id", class_id);
  formData.append("date", classDate);
  formData.append("payment_type", paymentType);

  if(promo_code_id){
    formData.append('promo_code_id', promo_code_id);
    formData.append('promo_discount', promo_discount);
  }
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/zee_invoice_confirm?access_token=${token}`,
    data: formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    signal: signal,
  };

  const response = await axios(config);

  return response.data;
};

export const gymHistory = async(token, branchId, signal) => {
const formData = new FormData();

formData.append("server_key", process.env.REACT_APP_SERVER_KEY);
formData.append('branch_id', branchId);


const config = {
  method: "post",
  url: `${process.env.REACT_APP_API_URL}/api/zee_invoice?access_token=${token}`,
  data:formData,
  maxContentLength:Infinity,
  maxBodyLength:Infinity,
  signal:signal,
};

const response = await axios(config);

return response.data.data
}

export const likeGym = async (token, userId, course_id) => {

  const formData = new FormData();
  formData.append('server_key', process.env.REACT_APP_SERVER_KEY);
  formData.append('user_id', userId);
  formData.append('course_id', course_id);

  const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/like-zeestudio?access_token=${token}`,
      data: formData,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
  };

  const response = await axios(config);
      
  return response.data.data;
};