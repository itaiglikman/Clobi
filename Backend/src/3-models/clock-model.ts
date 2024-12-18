import Joi from "joi";
import { ValidationError } from "./client-errors";
class ClockModel {
  public id: number;
  public userId: number;
  public clockIn: string;
  public clockOut: string;
  public totalHours: number;
  // public date: string;
  // public time:string;

  constructor(clock: ClockModel) {
    //copy constructor
    this.id = clock.id;
    this.userId = clock.userId;
    this.clockIn = clock.clockIn;
    this.clockOut = clock.clockOut;
    this.totalHours = clock.totalHours;
    // this.status = clock.status;
    // this.date = clock.date;
    // this.time = clock.time;
  }

  // create validation schema:
  public static validationSchema = Joi.object({
    id: Joi.number().required().integer().positive(),
    userId: Joi.number().required().integer().positive(),
    // status: Joi.string().required().valid(ClockStatus.In, ClockStatus.Out),
    clockIn: Joi.date().required(),
    clockOut: Joi.date().min(Joi.ref("clockIn")).required(),
    totalHours: Joi.number().positive().min(0).max(24),
    // date: Joi.date().iso().required(), // YYYY-MM-DD format
    // time: Joi.string().required().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/) // HH:mm:ss format
  });

  // validate properties and throw if not valid:
  public validate(): void {
    const result = ClockModel.validationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}

export default ClockModel;
