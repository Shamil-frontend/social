const socialGroups = state => state.socialGroups.socialGroups;
const socialGroupsLoading = state => state.socialGroups.loading;
const socialGroupsError = state => state.socialGroups.error;
const socialGroupsSelectors = {
  socialGroups,
  loading: socialGroupsLoading,
  error: socialGroupsError
};


const livingWages = state => state.livingWages.allLivingWages;
const livingWagesLoading = state => state.livingWages.loading;
const livingWagesError = state => state.livingWages.error;
const livingWagesSelectors = {
  livingWages,
  loading: livingWagesLoading,
  error: livingWagesError
};

const addresses = state => state.addresses.addressesData;
const addressesLoading = state => state.addresses.loading;
const addressesError = state => state.addresses.error;
const addressesSelectors = {
  addresses,
  loading: addressesLoading,
  error: addressesError
};

export { socialGroupsSelectors, livingWagesSelectors, addressesSelectors };