 

export interface HttpResponse<T = never> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

 