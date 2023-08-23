/// <reference types="mongoose" />
import { Survey } from '../interfaces/survey.interface';
declare const _default: {
    createSurvey: (srv: Survey) => Promise<Survey & import("mongoose").Document<any, any, any>>;
    editSurvey: (srv: Survey) => Promise<Survey & import("mongoose").Document<any, any, any>>;
    getSurveys: () => Promise<(Survey & import("mongoose").Document<any, any, any>)[]>;
    getSurveysByAdmins: (organizationId: import("mongoose").Schema.Types.ObjectId) => Promise<(Survey & import("mongoose").Document<any, any, any>)[]>;
    getSurveyById: (_id: import("mongoose").Schema.Types.ObjectId) => Promise<Survey & import("mongoose").Document<any, any, any>>;
    getSurveyByOrganizationId: (_id: import("mongoose").Schema.Types.ObjectId) => Promise<(Survey & import("mongoose").Document<any, any, any>)[]>;
};
export default _default;
