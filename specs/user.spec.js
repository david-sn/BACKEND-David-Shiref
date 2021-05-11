const userService = require('../routes-atechy/users/user.service');
const controller = require('../routes-atechy/users/user.controller');
let AdminUser = {};
let NormalUser = {};
describe('Attempt authentication APIs', () => {
	beforeAll(async () => {
		AdminUser = await userService.findOneUser({ email: 'admin@admin.com' });
		NormalUser = await userService.findOneUser({ email: 'user@user.com' });
	});

	it('create new admin user', async () => {
		let seq = new Date().getTime();
		let req = {
			body: {
				"email": `new_ADMIN_${seq}@admin.com`,
				"password": "123456",
				"first_name": "admin" + seq,
				"last_name": "admin" + seq,
				"role": "ADMIN"
			}
		};
		const res = mockResponse();
		await controller.createUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(200);
			expect(mockResponse.data.email).toBe(`new_ADMIN_${seq}@admin.com`);
			expect(mockResponse.data.first_name).toBe("admin" + seq);
			expect(mockResponse.data.last_name).toBe("admin" + seq);

		});
	});

	it('create dublicate admin user', async () => {
		let seq = new Date().getTime();
		let req = {
			body: {
				"email": `admin@admin.com`,
				"password": "123456",
				"first_name": "admin" + seq,
				"last_name": "admin" + seq,
				"role": "ADMIN"
			}
		};
		const res = mockResponse();
		await controller.createUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(400);
			expect(mockResponse.message).toBe(`Email Already Exists...`);
		});
	});

	it('update user name', async () => {

		let seq = new Date().getTime();
		let req = {
			headers: {
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImFsZyI6IlJTMjU2IiwiaXNzIjoiYWRtaW5AanVzdGNsZWFuLmNvbSIsInN1YiI6ImFkbWluQGp1c3RjbGVhbi5jb20iLCJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYyMDcxNTM3OCwiZXhwIjoxNjUyMjUxMzc4LCJyb2xlcyI6WyJBRE1JTiJdfQ.wQg93pJPpQKg9smZ8tjT-O8_5bO4xbi7BV9BuBSyW9U'
			},
			body: {
				"first_name": "user" + seq,
				"last_name": "user" + seq
			},
			user: { id: 2 }
		};
		const res = mockResponse();
		await controller.updateUser(req, res, (mockResponse) => {
			expect(mockResponse.status).toBe(200);
			expect(mockResponse.data.email).toBe(`user@user.com`);
			expect(mockResponse.data.first_name).toBe("user" + seq);
			expect(mockResponse.data.last_name).toBe("user" + seq);
		});
	}, 30000);

});

const mockResponse = () => {
	const res = {};
	// eslint-disable-next-line no-undef
	res.status = jest.fn().mockReturnValue(res);
	// eslint-disable-next-line no-undef
	res.json = jest.fn().mockReturnValue(res);
	return res;
};
