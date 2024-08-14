import { format } from 'date-fns';

export const formatDate = (date) => {
    const formattedDate = format(new Date(date), 'd MMMM, yy, h:mm a');
    return formattedDate;
};