import {EventBusFront, EventBusFrontType} from '@/events/event_bus';

export async function templateThinkCall<Request, Response>(param: {
  request: Request;
  callback: (request: Request) => Promise<Response>;
  rejectWithValue: (error: any) => any;
}) {
  try {
    return await param.callback(param.request);
  } catch (error: any) {
    if (error.response === undefined) {
      return param.rejectWithValue('internal error');
    }
    console.log(error.response.status);
    if (error.response.status === 401) {
      EventBusFront.dispatch(EventBusFrontType.LOGOUT, {});
    }

    console.log(error.response.status);
    return param.rejectWithValue(error.response.data.message);
  }
}
