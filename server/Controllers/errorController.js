const errorHandler = (error, req, res, next) => {
    res.status(500).json({ message: error.message });
}

export default errorHandler;