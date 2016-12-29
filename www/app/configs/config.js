angular.module('config', [])

  .constant('forcengOptions', {
  	'appId' : '3MVG9e2mBbZnmM6nKkSJ4fQSM5y34qWfafpugZqHAdWhyaHnWVirAisw8LD.KZkl7_Pq6SuBUHiOtWjDCKvxs',
  	'apiVersion': 'v33.0',
  	'loginURL' : 'https://appconnect-data.local2.weebpal.com',
	  'serviceURL': 'https://appconnect-data.local2.weebpal.com'
  })
	.constant('appOptions', {
		// 'serviceURL': 'http://appconnect-data.local2.weebpal.com'//appconnect-stg.invocare.com.au/
    'serviceURL': 'http://appconnect-stg.invocare.com.au/'
	})
  .constant('environment', 'release')
  // baseURL should be left to empty string. This value is only used when you want to use the same app in a Visualforce
  // page where you have to account for the path to the static resource. In that case the config module is created from
  // within index.vf where the path to the static resource can be obtained.
  .constant('baseURL', '');