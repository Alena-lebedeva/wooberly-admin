import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql';

const EarningsType = new ObjectType({
    name: 'Earnings',
    fields: {
        riderServiceFee: { type: StringType },
        driverServiceFee: { type: StringType }
    }
})

const AdminDashboardType = new ObjectType({
    name: 'AdminDashboard',
    fields: {
        totalDriversCount: { type: IntType },
        todayDriversCount: { type: IntType },
        weekDriversCount: { type: IntType },
        monthDriversCount: { type: IntType },
        totalRidersCount: { type: IntType },
        todayRidersCount: { type: IntType },
        weekRidersCount: { type: IntType },
        monthRidersCount: { type: IntType },
        totalBookingsCount: { type: IntType },
        todayBookingsCount: { type: IntType },
        weekBookingsCount: { type: IntType },
        monthBookingsCount: { type: IntType },
        todayEarnings: { type: new List(EarningsType) },
        weeklyEarnings: { type: new List(EarningsType) },
        monthlyEarnings: { type: new List(EarningsType) },
        totalEarnings: { type: new List(EarningsType) },
        currency: { type: StringType }
    }
})

export default AdminDashboardType;