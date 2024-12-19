
class ClockModel {
    public id: number;
    public userId: number;
    public clockIn: string;
    public clockOut: string;
    public totalHours: number;

    // // Custom validation for vacation properties:
    // public static destinationValidation = {
    //     required: { value: true, message: "Please insert the destination." },
    //     minLength: { value: 2, message: "Destination must contain 2-50 characters." },
    //     maxLength: { value: 50, message: "Destination must contain 2-50 characters." },
    //     validate: (value: string) => { // Validate the destination doesn't contain only spaces, tabs...
    //         let trimmedValue = value.trim();
    //         return trimmedValue ? true : "Destination can't be empty or contain only spaces.";
    //     }
    // }

    // public static descriptionValidation = {
    //     required: { value: true, message: "Please insert the description." },
    //     minLength: { value: 10, message: "Description must contain 10-2000 characters." },
    //     maxLength: { value: 2000, message: "Description must contain 10-2000 characters." },
    //     validate: (value: string) => { // Validate the description doesn't contain only spaces, tabs...
    //         let trimmedValue = value.trim();
    //         return trimmedValue ? true : "Description can't be empty or contain only spaces.";
    //     }
    // }

    // public static startDateValidation = {
    //     required: { value: true, message: "Please choose a start date." },
    //     // validate past date:
    //     min: { value: new Date().toDateString(), message: "Past dates are not acceptable." },
    // }

    // // on update - past dates are acceptable:
    // public static updateStartDateValidation = {
    //     required: { value: true, message: "Please choose a start date." },
    // }

    // public static finishDateValidation = {
    //     required: { value: true, message: "Please select an end date." },
    //     // validate end date isn't earlier then start date:
    //     validate: (value: string, allValues: any) => {
    //         let startDate = allValues.startDate;
    //         if (startDate && value < startDate) 
    //             return "End date must be after the start date.";
            
    //         return true;
    //     }
    // }

    // public static priceValidation = {
    //     required: { value: true, message: "Please insert the vacation's price." },
    //     min: { value: 0, message: "Price must be between 0 to 10000." },
    //     max: { value: 10000, message: "Price must be between 0 to 10000." }
    // }

    // public static imageValidation = {
    //     required: { value: true, message: "Please upload the vacation's image." },
    // }

}

export default ClockModel;