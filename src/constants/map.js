export default tableMap = {
  staff2: {
    name: ['userInfo.profileImg.url', 'userInfo.firstName', 'userInfo.lastName'],
    email: ['email'],
    phone: ['userInfo.phoneNumber'],
    specialty: ['userInfo.specialty'],
    createdAt: ['createdAt'],
  },
  staff: {
    name: [
      { profileImg: ['userInfo', 'profileImg', 'url'] },
      { firstName: ['userInfo', 'firstName'] },
      { lastName: ['userInfo', 'lastName'] },
    ],
    email: [{ email: 'email' }],
    phone: [{ phoneNumber: ['userInfo', 'phoneNumber'] }],
    specialty: [{ specialty: ['userInfo', 'specialty'] }],
    createdAt: [{ createdAt: 'createdAt' }],
  },
  services: { name: ['test', 'test2'] },
  images: { name: ['test', 'test2'] },
};
