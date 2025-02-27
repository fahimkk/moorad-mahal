type ValueOf<T> = T[keyof T];

export const APPLICATION_ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    COLLECTOR: "collector",
    USER: "user",
    GUEST: "guest",
} as const;
  
export type ApplicationRoleType = ValueOf<typeof APPLICATION_ROLES>;
  
export const ADMINISTRATION_ROLES = {
    PRESIDENT: "president",
    SECRETARY: "secretary",
    TREASURER: "treasurer",
    VICE_PRESIDENT: "vice_president",
    JOINT_SECRETARY: "joint_secretary",
    EXECUTIVE_MEMBER: "executive_member",
} as const;
  
export type AdministrationRoleType = ValueOf<typeof ADMINISTRATION_ROLES>;

export const RESIDENT_ROLES = {
    RESIDENT: "resident",
    FAMILY_HEAD: "family_head",
    EMPLOYEE: 'employee',
} as const;
  
export type ResidentRoleType = ValueOf<typeof RESIDENT_ROLES>;
  
export const USER_ROLES = {
    ...ADMINISTRATION_ROLES,
    ...APPLICATION_ROLES,
    ...RESIDENT_ROLES
}

export type UserRoleType = ValueOf<typeof USER_ROLES>;

export const FAMILY_CATEGORY = {
    LOW_INCOME: 'low_income',
    MID_INCOME: 'mid_income',
    HIGH_INCOME: 'high_income',
}

export type FamilyCategoryType = ValueOf<typeof FAMILY_CATEGORY>;

export const FAMILY_PREMIUM = {
    [FAMILY_CATEGORY.LOW_INCOME]: 50,
    [FAMILY_CATEGORY.MID_INCOME]: 100,
    [FAMILY_CATEGORY.HIGH_INCOME]: 150,
}

export const HOUSEHOLD_PAYMENT = {
    MONTHLY_PAYMENT: 'monthly_payment',
    EID_UL_ADHA: 'eid_ul_adha',
    EID_UL_FITR: 'eid_ul_fitr'
}

export type HouseholdPaymentType = ValueOf<typeof HOUSEHOLD_PAYMENT>;