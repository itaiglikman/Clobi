import Joi from "joi";
import { ValidationError } from "./client-errors";
import ClockStatus from "./clock-status";

class ClockModel {
  public id: number;
  public userId: number;
  public status: ClockStatus;
  public date: string;

  constructor(clock: ClockModel) {//copy constructor
    this.id = clock.id;
    this.userId = clock.userId;
    this.status = clock.status;
    this.date = clock.date;
  }

  // create validation schema:
  private static validationSchema = Joi.object({
    id: Joi.number().required().integer().positive(),
    userId: Joi.number().required().integer().positive(),
    status: Joi.string().required().valid(ClockStatus.In, ClockStatus.Out),
    date: Joi.date().iso().required(),
  });

  // validate properties and throw if not valid:
  public validate(): void {
    const result = ClockModel.validationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}

export default ClockModel;
