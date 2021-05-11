function formatResponse(data, code, status, message) {
	const response = {};
	response.code = code || 200;
	response.status = !!data;
	response.message = message || 'success';

	response.data = data;

	if (!!data && !!data.rows) {
		let itemCount = data.rows.length;
		let currentPage = parseInt(data.current_page);
		let pageCount = Math.ceil(data.count/data.item_count);
		response.data = data.rows;
		response.page_info = {
			page_count: pageCount,
			current_page: currentPage || null,
			next_page: (currentPage < pageCount) ? currentPage + 1 : null,
			item_count: itemCount
		};
	}

	return response;
}

module.exports = {
	formatResponse
};
