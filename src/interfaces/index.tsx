import { TSatus } from "src/types";

export interface ICategory {
    id: string;
    title: string;
    icon: string;
    status?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IProject {
    user: string;
    category: ICategory | string;
    type: string;
    title: string;
    ref: string;
    location: ILocation | object;
    collectorStatus: ICollectorStatus | string;
    collectorName: string;
    collectGoal: number;
    interestRate: number;
    thumbnail: IFile | string;
    externalLinks: object;
    shortDescription: string;
    description: string;
    collectIntention: string;
    company: object;
    isFeatured: boolean;
    status: TSatus
}

export interface ICollectorStatus {

}

export interface IFile {

}

export interface ILocation {

}

export interface ISignUpBody {
    firstname: string,
    name: string,
    email: string,
    password: string
}
