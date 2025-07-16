class ApiError extends Error { //so we cant add custom error wherever required in code by using new ApiError
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}