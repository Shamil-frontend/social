const socialGroups = state => state.getSocialGroups.socialGroups;
const socialGroupsLoading = state => state.getSocialGroups.loading;
const socialGroupsError = state => state.getSocialGroups.error;
exports.socialGroupsSelectors = {
  socialGroups: socialGroups,
  loading: socialGroupsLoading,
  error: socialGroupsError
};