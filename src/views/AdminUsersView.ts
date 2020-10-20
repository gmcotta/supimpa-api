import AdminUser from '../models/AdminUser';

export type AdminUserResponse = {
  id: number;
  name: string;
  email: string;
};

export default {
  render(adminUser: AdminUser): AdminUserResponse {
    return {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
    };
  },
};
