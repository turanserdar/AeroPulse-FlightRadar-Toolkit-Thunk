export const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
  params: {
    bl_lat: '34.503215',
    bl_lng: '25.324261',
    tr_lat: '42.869652',
    tr_lng: '44.552871',
    limit: '300',
  },
  headers: {
		'x-rapidapi-key': '6cc6c58d02mshc29c093bf8c67e4p101091jsn7ee1fdd457d1',
		'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
	}
};

export const options2 = {
  headers: {
		'x-rapidapi-key': '6cc6c58d02mshc29c093bf8c67e4p101091jsn7ee1fdd457d1',
		'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
	}
};
