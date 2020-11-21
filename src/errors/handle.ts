import {ErrorRequestHandler} from 'express';
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.log('Error', error);
  console.error(error);
  return response.status(500).json({
    message: 'Internal server error'
  })
  
}

export default errorHandler;