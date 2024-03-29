import { IUser } from "../utils/types";

export const getTokenFromStorage = () => {
    const tokenString = localStorage.getItem("token");
    let userToken;
    if (tokenString && tokenString !== "undefined") {
        userToken = JSON.parse(tokenString);
    }
    return userToken ? userToken : null;
};

export const getUserFromStorage = () => {
    const userString = localStorage.getItem("user");
    let userObj;
    if (userString && userString !== "undefined") {
        userObj = JSON.parse(userString);
    }
    return userObj ? userObj : undefined;
};

export function validateEmail(email: string) {
    const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
}

export function validateHours(beginDayHour: number, endDayHour: number) {
    // Valid hours: 24/7 or the begin hour is before the end hour
    return beginDayHour === endDayHour || beginDayHour < endDayHour;
}

export function validateUserInputs(user: IUser) {
    if (user.email && !validateEmail(user.email)) {
        return "Email address is not valid...";
    }

    if (user.confirmPassword && user.password !== user.confirmPassword) {
        return "Please confirm your password correctly";
    }
}

export function isValidDate(date: Date) {
    return date instanceof Date && !isNaN(date.getTime());
}

export function validateTaskInputs(
    task: ITask,
    beginDayHour: number,
    endDayHour: number
) {
    if (isNaN(task.estTime) || task.estTime % 1 !== 0 || parseInt(task.estTime.toString()) === 0) {
        return "Estimated time is not valid";
    }

    if (!isValidDate(task.dueDate)) {
        return "Due date is not valid";
    }

    if (task.dueDate < new Date()) {
        return "Your task's due date set to the past, are you a time traveler?";
    }

    if (
        endDayHour !== beginDayHour &&
        task.estTime > calcNumOfDayHours(beginDayHour, endDayHour)
    ) {
        return "Estimated time can't exceed the day's hours";
    }

    if (task.assignment) {
        if (!isValidDate(task.assignment)) {
            return "Assignment is not valid";
        }

        // if (task.assignment < new Date()) {
        //     return "Your task's asignment set to the past, are you a time traveler?";
        // }
    }

}

export function validateEventInputs(event: IEvent) {
    if (!isValidDate(event.startTime)) {
        return "Start date is not valid";
    }

    if (!isValidDate(event.endTime)) {
        return "End date is not valid";
    }

    // if (event.startTime < new Date()) {
    //     return "Your event's start time set to the past, are you a time traveler?";
    // }

    if (event.endTime <= event.startTime) {
        return "End time must be after start time";
    }
}

// Next hour and round minutes
export function roundToNearestHour(date: Date) {
    date.setHours(date.getHours() + 1);
    date.setMinutes(0, 0, 0);
    return date;
}

// Next hour plus 1 hour and round minutes
export function roundToNextNearestHour(date: Date) {
    const nearestHour = roundToNearestHour(date);
    return nearestHour.setHours(date.getHours() + 1);
}

export function calcNumOfDayHours(begin: number, end: number) {
    let difference = end - begin;
    if (difference < 0) {
        difference += 24; // Add 24 hours to handle wrapping to the next day
    }

    return difference;
}