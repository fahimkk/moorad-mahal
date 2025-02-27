import { Users } from "@prisma/client";

export const mapUser = (user: Users) => {
    if (!user) return null;
  
    return {
      id: Number(user.id),
      email: user.email,
      mobile: user.mobile,
      name: user.name,
      gender: user.gender,
      roles: user.roles,
      householdId: user.householdId ? Number(user.householdId) : undefined,
      isActive: user.isActive,
      isDeleted: user.isDeleted,
      updatedBy: user.updatedBy,
      updatedOn: user.updatedOn,
      createdBy: user.createdBy,
      createdOn: user.createdOn,
    };
};