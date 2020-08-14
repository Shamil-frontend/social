const socialGroups = state => state.getSocialGroups.socialGroups;
const socialGroupsLoading = state => state.getSocialGroups.loading;
const socialGroupsError = state => state.getSocialGroups.error;
const socialGroupsSelectors = {
  socialGroups,
  loading: socialGroupsLoading,
  error: socialGroupsError
};


const livingWages = state => state.getLivingWages.livingWages;
const livingWagesLoading = state => state.getLivingWages.loading;
const livingWagesError = state => state.getLivingWages.error;
const livingWagesSelectors = {
  livingWages,
  loading: livingWagesLoading,
  error: livingWagesError
};

export { socialGroupsSelectors, livingWagesSelectors };