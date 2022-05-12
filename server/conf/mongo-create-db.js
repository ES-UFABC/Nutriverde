// Mongoshell script to create an empty profiles db

db = connect("127.0.0.1:27017/NutriVerde");
db.dropDatabase();
db = connect("127.0.0.1:27017/NutriVerde");

/**
 * Sequences collection
 */
db.createCollection("sequences");
db.sequences.insertOne({
  name: "user_id",
  value: 1,
});
db.sequences.insertOne({
  name: "product_id",
  value: 1,
});
function nextProducerId() {
  return db.sequences.findOneAndUpdate(
    { name: "user_id" },
    { $inc: { value: 1 } }
  ).value;
}

function nextProductId() {
  return db.sequences.findOneAndUpdate(
    { name: "product_id" },
    { $inc: { value: 1 } }
  ).value;
}

/**
 * Users collection
 */
db.createCollection("users");

db.users.createIndex({ id: 1 }, { unique: true });



db.users.insertOne({id :nextProducerId(),name:"Brooks Locker",email:"blocker0@ehow.com",phones:"2533771086",password:"mtMOyPjH",cpf:"748-45-1739",address:"3 Sunnyside Crossing",userPaymentMethods:"diners-club-enroute",fantasyName:"Twitterlist",productionAddress:"Mitchell",commerceAddress:"Lillian",cnpj:"269-23-3567",producerPaymentMethods:"china-unionpay"})
db.users.insertOne({id :nextProducerId(),name:"Margaretha MacHostie",email:"mmachostie1@earthlink.net",phones:"2825820153",password:"PNsnbab9yL",cpf:"772-61-2023",address:"26013 Brown Lane",userPaymentMethods:"solo",fantasyName:"Jamia",productionAddress:"Buhler",commerceAddress:"Carey",cnpj:"879-37-0434",producerPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Bradley Sayle",email:"bsayle2@a8.net",phones:"9356854548",password:"o0gPw3hkfp",cpf:"684-06-7393",address:"61 Brentwood Plaza",userPaymentMethods:"maestro",fantasyName:"Podcat",productionAddress:"Linden",commerceAddress:"Harper",cnpj:"883-78-5983",producerPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Naoma Kelcher",email:"nkelcher3@github.io",phones:"6864839328",password:"jl9EmUhLl4ch",cpf:"439-62-5950",address:"30231 Golf Course Court",userPaymentMethods:"mastercard",fantasyName:"Babbleblab",productionAddress:"Bayside",commerceAddress:"Kings",cnpj:"857-55-9466",producerPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Dasha Broseman",email:"dbroseman4@hostgator.com",phones:"5138056196",password:"3IPg8b",cpf:"419-06-5048",address:"6257 Ilene Crossing",userPaymentMethods:"jcb",fantasyName:"Yambee",productionAddress:"Lukken",commerceAddress:"Meadow Ridge",cnpj:"366-88-8478",producerPaymentMethods:"diners-club-enroute"})
db.users.insertOne({id :nextProducerId(),name:"Gasparo Duester",email:"gduester5@bloglovin.com",phones:"1279368755",password:"RWeCIcPUQ",cpf:"113-48-1428",address:"14 Fuller Pass",userPaymentMethods:"solo",fantasyName:"Zoomlounge",productionAddress:"Melrose",commerceAddress:"Mifflin",cnpj:"380-12-9683",producerPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Binni Hovee",email:"bhovee6@nature.com",phones:"3236787324",password:"1zeVfbOxvN96",cpf:"405-69-6465",address:"3 Westridge Way",userPaymentMethods:"jcb",fantasyName:"Jaxnation",productionAddress:"Sloan",commerceAddress:"Maywood",cnpj:"698-15-8312",producerPaymentMethods:"diners-club-carte-blanche"})
db.users.insertOne({id :nextProducerId(),name:"Ronald Aleveque",email:"raleveque7@de.vu",phones:"5204522821",password:"9NSGjO",cpf:"366-87-0762",address:"186 Ronald Regan Point",userPaymentMethods:"laser",fantasyName:"Blogtags",productionAddress:"Gale",commerceAddress:"La Follette",cnpj:"275-43-3630",producerPaymentMethods:"maestro"})
db.users.insertOne({id :nextProducerId(),name:"Stepha Snowball",email:"ssnowball8@yahoo.co.jp",phones:"7546112654",password:"W11bPkyl",cpf:"395-01-4637",address:"853 Arizona Drive",userPaymentMethods:"jcb",fantasyName:"Linklinks",productionAddress:"Roxbury",commerceAddress:"Mccormick",cnpj:"879-43-1317",producerPaymentMethods:"americanexpress"})
db.users.insertOne({id :nextProducerId(),name:"Bryn Wimp",email:"bwimp9@salon.com",phones:"7019377358",password:"ayoKAO8FlT",cpf:"200-18-3231",address:"0997 Oak Way",userPaymentMethods:"jcb",fantasyName:"Kayveo",productionAddress:"Cambridge",commerceAddress:"Eggendart",cnpj:"404-05-6973",producerPaymentMethods:"switch"})
db.users.insertOne({id :nextProducerId(),name:"Giffie Tryhorn",email:"gtryhorna@eventbrite.com",phones:"4656550011",password:"lm58wl5H",cpf:"120-26-2810",address:"1511 Scoville Avenue",userPaymentMethods:"jcb",fantasyName:"Trudeo",productionAddress:"Corry",commerceAddress:"Toban",cnpj:"405-95-9415",producerPaymentMethods:"bankcard"})
db.users.insertOne({id :nextProducerId(),name:"Dniren Sabater",email:"dsabaterb@craigslist.org",phones:"1024415620",password:"7TCHOe",cpf:"832-55-9271",address:"94 Buhler Avenue",userPaymentMethods:"jcb",fantasyName:"Voonder",productionAddress:"Golf View",commerceAddress:"Merrick",cnpj:"672-09-6247",producerPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Guillaume Ehrat",email:"gehratc@wired.com",phones:"3532505587",password:"C75bVp4lkZyK",cpf:"346-86-2284",address:"77 Forster Crossing",userPaymentMethods:"maestro",fantasyName:"Zoombeat",productionAddress:"Blaine",commerceAddress:"Havey",cnpj:"392-85-9218",producerPaymentMethods:"instapayment"})
db.users.insertOne({id :nextProducerId(),name:"Glad Linsey",email:"glinseyd@hugedomains.com",phones:"1068303318",password:"oK5NFYj5Uz",cpf:"156-64-2281",address:"7 Fordem Hill",userPaymentMethods:"jcb",fantasyName:"Gabtype",productionAddress:"Harper",commerceAddress:"Derek",cnpj:"190-64-7841",producerPaymentMethods:"diners-club-carte-blanche"})
db.users.insertOne({id :nextProducerId(),name:"Beret Gwyneth",email:"bgwynethe@tuttocitta.it",phones:"3384166552",password:"9qYMaPyFro2",cpf:"142-84-2050",address:"763 Moulton Plaza",userPaymentMethods:"switch",fantasyName:"BlogXS",productionAddress:"Loomis",commerceAddress:"Derek",cnpj:"411-86-4732",producerPaymentMethods:"jcb"})




db.users.insertOne({id :nextProducerId(),name:"Rochester Karpf",email:"rkarpf0@amazon.com",phones:"7229414006",password:"hZ7n6YODby",cpf:"524-26-7308",address:"4 West Park",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Arlyne Verden",email:"averden1@kickstarter.com",phones:"1065563327",password:"B4JKIyqsi",cpf:"294-50-9856",address:"0 Commercial Plaza",userPaymentMethods:"diners-club-carte-blanche"})
db.users.insertOne({id :nextProducerId(),name:"Livia Whisson",email:"lwhisson2@weebly.com",phones:"5656379800",password:"9kJB5Z",cpf:"696-53-7834",address:"1 Messerschmidt Court",userPaymentMethods:"diners-club-carte-blanche"})
db.users.insertOne({id :nextProducerId(),name:"Roseanne Masser",email:"rmasser3@merriam-webster.com",phones:"7393122732",password:"TduaJs2",cpf:"684-29-1840",address:"9353 Coolidge Parkway",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Cloris Puzey",email:"cpuzey4@skype.com",phones:"2205532759",password:"S2j25w",cpf:"428-54-1479",address:"7 Parkside Plaza",userPaymentMethods:"instapayment"})
db.users.insertOne({id :nextProducerId(),name:"Hilary Pringley",email:"hpringley5@posterous.com",phones:"5157039720",password:"PTdDigrGtZ",cpf:"631-36-1252",address:"5 Almo Park",userPaymentMethods:"bankcard"})
db.users.insertOne({id :nextProducerId(),name:"Grange Plunket",email:"gplunket6@earthlink.net",phones:"5249777357",password:"zB7np4X5MZ",cpf:"181-01-6389",address:"4 Division Way",userPaymentMethods:"solo"})
db.users.insertOne({id :nextProducerId(),name:"Carlynn Hirth",email:"chirth7@chron.com",phones:"6235591432",password:"P5EWlgEf",cpf:"877-31-4481",address:"8369 Sutherland Lane",userPaymentMethods:"china-unionpay"})
db.users.insertOne({id :nextProducerId(),name:"Fletcher Howlings",email:"fhowlings8@joomla.org",phones:"5767846912",password:"R1QG9CniA3",cpf:"439-78-0426",address:"34082 Cherokee Terrace",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Madella Manterfield",email:"mmanterfield9@gizmodo.com",phones:"7859529758",password:"qpyaRsVplc",cpf:"183-28-0914",address:"848 Troy Way",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Marilee Guare",email:"mguarea@twitpic.com",phones:"6941313315",password:"cS1EdCXD",cpf:"482-33-0070",address:"60829 Fordem Park",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Lianne Troyes",email:"ltroyesb@pen.io",phones:"6517026889",password:"44fd5pudv6",cpf:"784-24-2044",address:"49 Hayes Place",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Stephannie Kenninghan",email:"skenninghanc@ehow.com",phones:"4748366702",password:"eDtN0m1N2YP",cpf:"399-31-2078",address:"3 Briar Crest Junction",userPaymentMethods:"jcb"})
db.users.insertOne({id :nextProducerId(),name:"Sanderson Goare",email:"sgoared@wikispaces.com",phones:"1543049232",password:"lFTyLnmG",cpf:"689-99-5139",address:"72 Linden Avenue",userPaymentMethods:"mastercard"})
db.users.insertOne({id :nextProducerId(),name:"Alvira Bang",email:"abange@blogspot.com",phones:"7717440780",password:"VmnP6Joq",cpf:"219-20-9926",address:"6 Rigney Trail",userPaymentMethods:"visa-electron"})




/**
 * Products Colections
 *
 *
 */

db.createCollection("products");

db.products.createIndex({ id: 1 }, { unique: true });

db.products.insertOne({
  id: nextProductId(),
  name: "Batata",
  unitOfMeas: "kg", // the unitOfMeas username
  typology: "Tuberculo",
  price: 12,
  specialDeliveryConditions: "Cuidado",
  quantity: 2302,
  cover: "",
});
db.products.insertOne({
  id: nextProductId(),
  name: "Batata",
  unitOfMeas: "kg", // the unitOfMeas username
  typology: "Tuberculo",
  price: 13,
  specialDeliveryConditions: "Cuidado",
  quantity: 2302,
  cover: "",
});
db.products.insertOne({
  id: nextProductId(),
  name: "Batata",
  unitOfMeas: "kg", // the unitOfMeas username
  typology: "Tuberculo raizes",
  price: 14,
  specialDeliveryConditions: "Cuidado",
  quantity: 2302,
  cover: "",
});
db.products.insertOne({
  id: nextProductId(),
  name: "Banana",
  unitOfMeas: "Penca", // the unitOfMeas username
  typology: "Fruta",
  price: 12,
  specialDeliveryConditions: "Cuidado não amassar",
  quantity: 2302,
  cover: "",
});

db.products.insertOne({
  id: nextProductId(),
  name: "Banana",
  unitOfMeas: "duzia", // the unitOfMeas username
  typology: "Fruta",
  price: 3,
  specialDeliveryConditions: "Cuidado não amassar",
  quantity: 2302,
  cover: "",
});

db.products.insertOne({
  id: nextProductId(),
  name: "Alface",
  unitOfMeas: "pé", // the unitOfMeas username
  typology: "hortaliça",
  price: 1,
  specialDeliveryConditions: "Cuidado não amassar",
  quantity: 1203123,
  cover: "",
});

/**
 * Reviews
 */

db.createCollection("reviews");
db.sequences.insertOne({
  name: "review_id",
  value: 1,
});

