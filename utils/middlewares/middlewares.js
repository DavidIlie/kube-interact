function notFound(req, res, next) {
	res.status(404);
	const error = new Error(`Not Found - ${req.originalUrl}`);
	next(error);
}

function errorHandler(err, req, res, next) {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	if (statusCode === 500) {
		res.status(400).json({
			message: err.message
		})
	} else {
		res.status(statusCode).json({
			message: err.message,
		});
	}
}

module.exports = {
	notFound,
	errorHandler,
};