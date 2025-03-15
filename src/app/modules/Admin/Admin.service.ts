import moment from 'moment';
import { USER_ROLE } from '../user/user.constants';
import { User } from '../user/user.models';

const dashboardData = async (query: Record<string, any>) => {
  const usersData = await User.aggregate([
    {
      $facet: {
        totalUsers: [
          { $match: { 'verification.status': true } },
          { $count: 'count' },
        ],
        userDetails: [
          { $match: { role: { $ne: USER_ROLE.admin } } },
          {
            $project: {
              _id: 1,
              name: 1,
              email: 1,
              coin: 1,
              role: 1,
              referenceId: 1,
              createdAt: 1,
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $limit: 15,
          },
        ],
      },
    },
  ]);

  const totalMember = await User.countDocuments({ role: USER_ROLE?.user });
  const totalAdministrator = await User.countDocuments({
    role: USER_ROLE?.user,
  });
  // JoinYear: '2022', role: ''
  const userYear = query?.JoinYear ? query?.JoinYear : moment().year();
  const startOfUserYear = moment().year(userYear).startOf('year');
  const endOfUserYear = moment().year(userYear).endOf('year');

  const roleFilter = query.role
    ? { role: query.role }
    : { role: { $in: [USER_ROLE.user, USER_ROLE.user] } };

  const monthlyUser = await User.aggregate([
    {
      $match: {
        'verification.status': true,
        ...roleFilter, // Include both 'member' and 'administrator'
        createdAt: {
          $gte: startOfUserYear.toDate(),
          $lte: endOfUserYear.toDate(),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: '$createdAt' } }, // Group by month
        total: { $sum: 1 }, // Count users
      },
    },
    {
      $sort: { '_id.month': 1 }, // Ensure sorting from Jan-Dec
    },
  ]);
  // return monthlyUser;
  // Format monthly income to have an entry for each month
  const formattedMonthlyUsers = Array.from({ length: 12 }, (_, index) => ({
    month: moment().month(index).format('MMM'),
    total: 0,
  }));

  monthlyUser.forEach(entry => {
    formattedMonthlyUsers[entry._id.month - 1].total = Math.round(entry.total);
  });

  return {
    totalUsers: usersData[0]?.totalUsers[0]?.count || 0,
    totalMember,
    totalAdministrator,
    // transitionData,
    // totalIncome: totalEarnings,

    // toDayIncome: todayEarnings,

    // monthlyIncome: formattedMonthlyIncome,
    monthlyUsers: formattedMonthlyUsers,
    userDetails: usersData[0]?.userDetails,
  };
};

export const AdminService = {
  dashboardData,
};
