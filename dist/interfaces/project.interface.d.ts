import { ObjectId } from "mongoose";
import { User } from "./users.interface";
export interface Project {
    _id: ObjectId;
    name: string;
    typeProduct: string;
    segments: Segment[];
    criticalityAlerts: ProjectAlert[];
    state: boolean;
}
export interface Segment {
    _id: ObjectId;
    unit: number;
    inspectFrequency: string;
    areaDensity: number;
    typeAreaDensity: string;
    landUse: string;
    trajectoryState: boolean;
    trajectory: LatLng[];
    state: boolean;
    personInCharge: User[];
    supervisor: User[];
    operator: User[];
}
export interface LatLng {
    lat: number;
    lng: number;
    alt?: number;
}
export interface ProjectAlert {
    _id: ObjectId;
    category: string;
    distanceToAsset: number;
    riskLevel: string;
    state: boolean;
}
