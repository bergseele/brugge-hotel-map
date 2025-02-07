import { LatLngExpression } from 'leaflet';

export interface Hotel {
  name: string;
  coords: LatLngExpression;
  rooms: number;
  restaurants: number;
  address: string;
  website: string;
}

export const hotels: Hotel[] = [
  {
    name: "Hotel De Orangerie",
    coords: [51.207233213901600, 3.226263639808660],
    rooms: 22,
    restaurants: 1,
    address: "Kartuizerinnenstraat 10, 8000 Brugge",
    website: "http://www.hotelorangerie.be/"
  },
  {
    name: "Hotel Van Cleef",
    coords: [51.210409659844600, 3.231980683989570],
    rooms: 36,
    restaurants: 1,
    address: "Molenmeers 11, 8000 Brugge",
    website: "http://www.hotelvancleef.be/"
  },
  {
    name: "Hotel Portinari",
    coords: [51.205813931465800, 3.218188826317030],
    rooms: 37,
    restaurants: 1,
    address: "t Zand 15, 8000 Brugge",
    website: "http://www.portinari.be/"
  },
  {
    name: "The Pand Hotel",
    coords: [51.207231691796100, 3.228098470497820],
    rooms: 26,
    restaurants: 0,
    address: "Pandreitje 16, 8000 Brugge",
    website: "https://www.pandhotel.com/"
  },
  {
    name: "Hotel Acacia",
    coords: [51.208093781818500, 3.222202981111870],
    rooms: 41,
    restaurants: 0,
    address: "Korte Zilverstraat 5, 8000 Brugge",
    website: "https://www.hotel-acacia.com/en/"
  },
  {
    name: "Hotel De Tuilerieen",
    coords: [51.206557772774100, 3.226652397480900],
    rooms: 41,
    restaurants: 1,
    address: "Dijver 7, 8000 Brugge",
    website: "http://www.hoteltuilerieen.com/"
  },
  {
    name: "Hotel Jan Brito",
    coords: [51.208307845360800, 3.230001268644870],
    rooms: 37,
    restaurants: 0,
    address: "Freren Fonteinstraat 1, 8000 Brugge",
    website: "https://www.janbrito.com/en/"
  },
  {
    name: "Golden Tulip Hotel De Medici",
    coords: [51.215133785074700, 3.229660555153620],
    rooms: 101,
    restaurants: 3,
    address: "Potterierei 15, 8000 Brugge",
    website: "https://de-medici.goldentulip.com/"
  },
  {
    name: "Hotel Aragon",
    coords: [51.210795334836100, 3.222236027795580],
    rooms: 42,
    restaurants: 1,
    address: "Naaldenstraat 22, 8000 Brugge",
    website: "https://www.aragon.be/en/"
  },
  {
    name: "Hotel Le Bois De Bruges",
    coords: [51.204753178831300, 3.216850755153140],
    rooms: 87,
    restaurants: 1,
    address: "Vrijdagmarkt 5, 8000 Brugge",
    website: "http://www.leboisdebruges.be/"
  },
  {
    name: "Grand Hotel Casselbergh",
    coords: [51.209295969826000, 3.228475680723530],
    rooms: 118,
    restaurants: 1,
    address: "Hoogstraat 6, 8000 Brugge",
    website: "https://www.grandhotelcasselbergh.be/en/"
  },
  {
    name: "Radisson Blu Hotel",
    coords: [51.195670292409000, 3.220160297480400],
    rooms: 109,
    restaurants: 1,
    address: "Frank Van Ackerpromenade 17, 8000 Brugge",
    website: "https://www.radissonhotels.com"
  },
  {
    name: "Hotel Velotel Brugge",
    coords: [51.226429549385300, 3.213089083990300],
    rooms: 115,
    restaurants: 1,
    address: "Handboogstraat 1B, 8000 Brugge",
    website: "http://www.hotelvelotel.com/"
  },
  {
    name: "Novotel Brugge Centrum",
    coords: [51.202486998395200, 3.227725455153020],
    rooms: 125,
    restaurants: 1,
    address: "Katelijnestraat 65B, 8000 Brugge",
    website: "https://all.accor.com"
  },
  {
    name: "Hotel Rosenburg",
    coords: [51.207209322202400, 3.234481412825540],
    rooms: 27,
    restaurants: 0,
    address: "Coupure 30, 8000 Brugge",
    website: "http://www.rosenburg.be/"
  },
  {
    name: "Hotel Adornes",
    coords: [51.213441228878500, 3.229359197481230],
    rooms: 20,
    restaurants: 0,
    address: "Sint-Annarei 26, 8000 Brugge",
    website: "http://www.adornes.be/"
  },
  {
    name: "Hotel Biskajer",
    coords: [51.211452677424500, 3.225926782136550],
    rooms: 19,
    restaurants: 0,
    address: "Biskajersplein 4, 8000 Brugge",
    website: "http://www.hotelbiskajer.com/"
  },
  {
    name: "Hotel Heritage Relais & Chateaux",
    coords: [51.210189101190300, 3.224188710680510],
    rooms: 22,
    restaurants: 1,
    address: "Niklaas Desparsstraat 11, 8000 Brugge",
    website: "http://www.hotel-heritage.com/"
  },
  {
    name: "Grand Hotel Normandy",
    coords: [51.208042589368800, 3.215431941661700],
    rooms: 64,
    restaurants: 1,
    address: "Hoefijzerlaan 37, 8000 Brugge",
    website: "https://www.grandhotelnormandy.com/"
  },
  {
    name: "Hotel NH Brugge",
    coords: [51.204075469742700, 3.216809353300060],
    rooms: 149,
    restaurants: 1,
    address: "Boeveriestraat 2, 8000 Brugge",
    website: "www.nh-hotels.com"
  },
  {
    name: "Hotel Navarra Brugge",
    coords: [51.210378621408000, 3.221077313491550],
    rooms: 94,
    restaurants: 0,
    address: "Sint-Jakobsstraat 41, 8000 Brugge",
    website: "http://www.hotelnavarra.com/"
  },
  {
    name: "Grand Hotel du Sablon",
    coords: [51.207570903503900, 3.221255497353330],
    rooms: 36,
    restaurants: 2,
    address: "Kopstraat 10, 8000 Brugge",
    website: "http://www.hotelsablon.be/"
  },
  {
    name: "Hotel Duke's Palace",
    coords: [51.208568104404300, 3.220048601857960],
    rooms: 136,
    restaurants: 2,
    address: "Prinsenhof 8, 8000 Brugge",
    website: "https://www.hoteldukespalace.com/en/"
  },
  {
    name: "Hotel Ter Brughe",
    coords: [51.213622828295300, 3.225499255153560],
    rooms: 46,
    restaurants: 0,
    address: "Oost-Gistelhof 2, 8000 Brugge",
    website: "http://www.hotelterbrughe.com/"
  },
  {
    name: "Martin's Relais",
    coords: [51.212185266915600, 3.226452495107820],
    rooms: 46,
    restaurants: 0,
    address: "Genthof 4a, 8000 Brugge",
    website: "https://www.martinshotels.com/en/"
  },
  {
    name: "Hotel Duke's Arches",
    coords: [51.209766540677300, 3.229412768644920],
    rooms: 50,
    restaurants: 1,
    address: "Hoogstraat 20, 8000 Brugge",
    website: "http://www.dukesarches.com/"
  },
  {
    name: "Flanders Hotel",
    coords: [51.209757208058600, 3.233543748002450],
    rooms: 50,
    restaurants: 0,
    address: "Langestraat 38, 8000 Brugge",
    website: "http://www.hotelflanders.com/"
  },
  {
    name: "Hotel Montanus",
    coords: [51.203717175036100, 3.227575251446940],
    rooms: 11,
    restaurants: 1,
    address: "Nieuwe Gentweg 76, 8000 Brugge",
    website: "http://www.montanus.be/"
  },
  {
    name: "Hotel Augustyn",
    coords: [51.213411407579500, 3.224821222799030],
    rooms: 28,
    restaurants: 0,
    address: "Augustijnenrei 18, 8000 Brugge",
    website: "https://www.hotelaugustyn.com/"
  },
  {
    name: "Crowne Plaza Brugge",
    coords: [51.209202798474500, 3.227398646418580],
    rooms: 96,
    restaurants: 1,
    address: "Burg 10, 8000 Brugge",
    website: "www.crowneplaza.com"
  },
  {
    name: "Hotel Malleberg",
    coords: [51.209297196538700, 3.228008902772330],
    rooms: 9,
    restaurants: 0,
    address: "Hoogstraat 7, 8000 Brugge",
    website: "www.hotelmalleberg.be"
  },
  {
    name: "Die Swaene",
    coords: [51.208494806825200, 3.228799975823470],
    rooms: 17,
    restaurants: 1,
    address: "Steenhouwersdijk 1, 8000 Brugge",
    website: "http://www.dieswaene.com/"
  }
];