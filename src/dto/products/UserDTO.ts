export interface UserDTO {
    id: string,
    Username: string,
    Email: string,
    Password: string,
    PointsBalance: number,
    ReferralCode: string,
    ReferralUserId: string,
    Role: string
}

export interface UserPointsDTO {
    UserId: string,
    TransactionType: string,
    Points: number,
    UserDescription: string,
    Date: Date,
    ReferralUserId: string,
    RedeemedAt: Date,
    Reason: string
}

export interface AddressDTO {
    id: string,
    UserId: string,
    Street: string,
    City: string,
    Country: string,
    PostalCode: string
}