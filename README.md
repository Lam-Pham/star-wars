# Pushpay

### Details

Time taken: ~6 hours
Role: Junior Developer

### Notes/thoughts!

First - I tackled the requirement to list people. Since the /people endpoint returned paginated data, I modified the fetchJson to fetch the next page if available. This returned an array of each page of characters (objects). I added a helper function (getAll) to unpack the array in the People component. 

For adding search functionality – I created a form with submissions being used as a search parameter when calling SWAPI. The people state would then be set to whatever the search returned. 

To view the details for a given person – I initially fetched all characters' species and films on the first render. Due to a lot of data loading asynchronously, I decided to only grab the species and films if the user clicked on the name. To do this: I created states for species and films in the Person component. On click, the state would be updated by fetching the desired property with fetchSingleJson. 

To test the application – I would look to test events (search submission, getting character species+films). And since these all rely on the fetch requests to SWAPI, I'd need to learn how to mock these in our tests. These would allow me to check if the request was done correctly and if the data fetched matched my expectations. 














