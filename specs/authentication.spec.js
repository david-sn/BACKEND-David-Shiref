const userService = require('../routes-atechy/users/user.service');
const controller = require('../routes-atechy/authentication/authentication.controller');
let AdminUser = {};
let NormalUser = {};
describe('Attempt authentication APIs', () => {
	beforeAll(async () => {
		AdminUser = await userService.findOneUser({ id: 1 });
		NormalUser = await userService.findOneUser({ id: 2 });
	});

	it('should admin user login', async () => {
		let req = {
			body: { email: 'admin@admin.com', password: '123456' }
		};
		const res = mockResponse();
		await controller.loginUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(200);
			expect(mockResponse.data.id).toBe(1);
			expect(mockResponse.data.email).toBe('admin@admin.com');
			expect(mockResponse.data.user_roles).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						"user_id": 1, "role_id": 1,
						"role": { "name": "ADMIN" }
					})
				])
			);
		});
	}, 30000);

	it('should admin user login with invalid password', async () => {
		let req = {
			body: { email: 'admin@admin.com', password: '1234__ABC' }
		};
		const res = mockResponse();
		await controller.loginUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(400);
			expect(mockResponse.message).toBe("Invalid Password");
		});
	});

	it('should admin user not found to login', async () => {
		let req = {
			body: { email: 'admin_test@admin.com', password: '123456' }
		};
		const res = mockResponse();
		await controller.loginUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(400);
			expect(mockResponse.message).toBe("User doesn' exist.");
		});
	});

	it('should normal user login', async () => {
		let req = {
			body: { email: 'user@user.com', password: '123456' }
		};
		const res = mockResponse();
		await controller.loginUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(200);
			expect(mockResponse.data.id).toBe(1);
			expect(mockResponse.data.email).toBe('user@user.com');
			expect(mockResponse.data.user_roles).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						"user_id": 2, "role_id": 2,
						"role": { "name": "USER" }
					})
				])
			);
		});
	});

	it('should normal user not found to login', async () => {
		let req = {
			body: { email: 'u_ser@user.com', password: '123456' }
		};
		const res = mockResponse();
		await controller.loginUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(400);
			expect(mockResponse.message).toBe("User doesn' exist.");
		});
	});

	it('should normal user login with invalid password', async () => {
		let req = {
			body: { email: 'user@user.com', password: '1234__ABC' }
		};
		const res = mockResponse();
		await controller.loginUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(400);
			expect(mockResponse.message).toBe("Invalid Password");
		});
	});
});

const mockResponse = () => {
	const res = {};
	// eslint-disable-next-line no-undef
	res.status = jest.fn().mockReturnValue(res);
	// eslint-disable-next-line no-undef
	res.json = jest.fn().mockReturnValue(res);
	return res;
};
