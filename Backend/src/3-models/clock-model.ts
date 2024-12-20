import Joi, { number } from "joi";
import { ValidationError } from "./client-errors";

class ClockModel {
    public id: number;
    public userId: number;
    public clockIn: string;
    public clockOut: string;
    public totalHours: number;

    constructor(clock: ClockModel) {
        //copy constructor
        this.id = clock.id;
        this.userId = clock.userId;
        this.clockIn = clock.clockIn;
        this.clockOut = clock.clockOut;
        this.totalHours = this.calculateTotalHours(this.clockIn, this.clockOut);
    }

    /**
    * Calculate and validate total hours
    * @param clock
    * @returns total hours
    */
    private calculateTotalHours(clockIn: string, clockOut: string): number {
        if(!clockOut) return 0;

        const timeIn = new Date(clockIn).getTime();
        const timeOut = new Date(clockOut).getTime();

        const diff = timeOut - timeIn;
        const hours = diff / (1000 * 60 * 60);
        parseFloat(hours.toFixed(2));

        // validate total hours:
        if (hours < 0) throw new ValidationError("ClockOut is before ClockIn");
        if (hours > 24) throw new ValidationError("ClockOut is after 24 hours or more, get some rest...");

        return hours;
    }

    // create validation schema:
    public static validationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        userId: Joi.number().required().integer().positive(),
        clockIn: Joi.date().required(),
        clockOut: Joi.date().min(Joi.ref("clockIn")),
        totalHours: Joi.number().min(0).max(24),
    });

    // validate properties and throw if not valid:
    public validate(): void {
        const result = ClockModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default ClockModel;
