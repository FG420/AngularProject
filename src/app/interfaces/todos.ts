import { User } from './user';

export interface Todos {
    id?: string;
    title: string;
    dueDate?: Date;
    completed?: boolean;
    expired?: boolean;
    createdBy: User;
    assignedTo?: User;
}