
class ClockModel {
    public id?: number;
    public userId: number;
    public clockIn: string;
    public clockOut?: string;
    public totalHours?: number;

    // Custom validation for vacation properties:
    public static userIdValidation = {
        required: { value: true, message: "Please choose employee." },
    }

    // on update - past dates are acceptable:
    public static clockInValidation = {
        required: { value: true, message: "Please choose clock in." },
    }

    // pass getValues to validate clockOut is after clockIn:
    public static clockOutValidation = (getValues: () => any) => ({
        required: { value: true, message: "Please choose clock out." },
        // validate clockOut is after clockIn:
        validate: (value: string) => {
            const clockIn = getValues().clockIn;
            if (clockIn && value < clockIn)
                return "ClockOut must be after the ClockIn.";
            return true;
        }
    });
}

export type INewClockIN = {
    userId: number;
    clockIn: string;
}

export type INewClockOut = {
    id: number;
    userId: number;
    clockOut: string;
}


export default ClockModel;