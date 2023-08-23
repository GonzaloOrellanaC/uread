/// <reference types="mongoose" />
import { SurveyResponse } from '../interfaces/survey.interface';
declare const _default: {
    createSurveyResponse: (srvResponse: SurveyResponse) => Promise<SurveyResponse & import("mongoose").Document<any, any, any>>;
    getSurveyResponseBySurveyId: (_id: import("mongoose").Schema.Types.ObjectId, userId: import("mongoose").Schema.Types.ObjectId) => Promise<SurveyResponse & import("mongoose").Document<any, any, any>>;
    getSurveyDataBySurveyId: (_id: import("mongoose").Schema.Types.ObjectId) => Promise<(SurveyResponse & import("mongoose").Document<any, any, any>)[]>;
};
export default _default;
